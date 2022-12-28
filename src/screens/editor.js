import React, { useEffect, useState, useMemo } from 'react';
import { View } from 'react-native';
import { Layout, useTheme } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Gesture, GestureDetector, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import Animated, { SlideInLeft, SlideOutLeft, useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Canvas, Image, useImage, useCanvasRef } from '@shopify/react-native-skia';
import { imageWidth, imageHeight, screenWidth, screenMidWidth, screenMidHeight, screenHeight } from '../lib/constants/variables';
import { useIsFocused } from '@react-navigation/native';

import EditorContext from './../lib/editorContext'
import EditorHeader from './../components/headers/editorHeader';
import SaveModal from './../components/modals/saveModal';
import ConfirmExitModal from './../components/modals/confirmExitModal';

import styles from './../styles/editor.style';

import { TOOLS } from './../lib/constants/editorTools';
import { getItem, removeItem, setItem } from './../lib/storage';
import { handleRedo, handleSaveImage, handleUndo } from './../lib/editorFunctions';

export default function EditorScreen({ navigation }) {

    const isFocused = useIsFocused();
    const [ imageURL, setImageURL ] = useState('');
    const [ imageConfig, setImageConfig ] = useState(false);
    const [ showSaveModal, setShowSaveModal ] = useState(false);
    const [ showExitModal, setShowExitModal ] = useState(false);
    const theme = useTheme();
    const image = useImage(imageURL);
    const [ state, setState ] = useState({
        activeTool: false,
        history: [],
        undoHistory: [],
        disabledUndo: true,
        disabledRedo: true,
        updateState: updateState,
        imageWidth: imageWidth,
        imageHeight: imageHeight,
    });

    useEffect(() => {

        if (isFocused) {

            getItem('actualImage').then(setImageURL).catch(console.log);
            getItem('imageConfig').then((value) => {
                
                setImageConfig({
                    scaleX: screenWidth / value.width,
                    scaleY: screenHeight / value.height,
                    width: value.width * screenWidth / value.width,
                    height: value.height * screenHeight / value.height,
                });
                
                getItem('lastWork').then(data => {
                    
                    if (!!data) {
                        
                        setState({
                            ...state,
                            ...data,
                        });
                    }
                });
        
            }).catch(console.log);   
        }
    }, [ isFocused ]);

    function updateState(newState) {
        setState(newState);
    }

    const canvasRef = useCanvasRef();
    const scale = useSharedValue(1);
    const prevScale = useSharedValue(1);
    const originX = useSharedValue(0);
    const originY = useSharedValue(0);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const originalScale = useSharedValue(0);
    const editedScale = useSharedValue(1);

    const pinchGesture = useMemo(
        () => Gesture.Pinch()
            .onStart(e => {

                if (prevScale.value !== 1) scale.value = prevScale.value - e.scale;

            })
            .onUpdate(e => {
                scale.value = prevScale.value * e.scale;

            })
            .onEnd(e => {
                if (scale.value < 1) scale.value = withTiming(1, { duration: 250 });
                prevScale.value = scale.value;

            }),
        [ scale, prevScale ]
    );

    const panGesture = useMemo(
        () => Gesture.Pan()
            .minPointers(2)
            .onTouchesDown(e => {
                
                if (e.numberOfTouches < 2) return;

                if (originX.value === 0 && originY.value === 0) {

                    originX.value = (e.allTouches[0].absoluteX + e.allTouches[1].absoluteX) / 2;
                    originY.value = (e.allTouches[0].absoluteY + e.allTouches[1].absoluteY) / 2;

                } else {

                    originX.value = screenMidWidth + translateX.value;
                    originY.value = screenMidHeight + translateY.value;
                }
            })
            .onTouchesMove(e => {

                if (e.numberOfTouches < 2) return;

                translateX.value = screenMidWidth - (e.allTouches[0].absoluteX + e.allTouches[1].absoluteX) / 2;
                translateY.value = screenMidHeight - (e.allTouches[0].absoluteY + e.allTouches[1].absoluteY) / 2;
            }),
        [ originX, originY, translateX, translateY ]
    );

    const doubleTapGesture = useMemo(
        () => Gesture.Tap()
            .numberOfTaps(2)
            .onEnd(() => {
                
                scale.value = withTiming(1, { duration: 250 });
                prevScale.value = 1;

                originX.value = 0;
                originY.value = 0;
                translateX.value = 0;
                translateY.value = 0;

            }),
        [ scale, prevScale, translateX, translateY, originX, originY ]
    );

    const longPressGesture = useMemo(
        () => Gesture.LongPress()
            .minDuration(300)
            .onStart(() => {
                originalScale.value = 1;
                editedScale.value = 0;
            })
            .onEnd(() => {
                originalScale.value = 0;
                editedScale.value = 1;
            }),
        [ originalScale, editedScale ]
    );

    const gestures = Gesture.Simultaneous(pinchGesture, panGesture, doubleTapGesture, longPressGesture);

    const animation = useAnimatedStyle(() => ({
        transform: [
            { translateX: originX.value },
            { translateY: originY.value },
            { translateX: -screenMidWidth },
            { translateY: -screenMidHeight },
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value },
            { translateX: -originX.value },
            { translateY: -originY.value },
            { translateX: screenMidWidth },
            { translateY: screenMidHeight },
            { translateX: -translateX.value },
            { translateY: -translateY.value },
        ]
    }));

    const originalStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: originalScale.value }
        ]
    }));

    const editedStyle = useAnimatedProps(() => ({
        transform: [
            { scale: editedScale.value }
        ]
    }));

    function goHome() {
        navigation.goBack();
    }

    function saveWork() {

        
        if (state.history.length > 0) {
            
            state.history = state.history.map(_ => {
                _.active = false
                return _;
            });

            setItem('lastWork', {
                history: state.history,
                disableRedo: state.disabledRedo,
                disabledUndo: state.disabledUndo,
                undoHistory: state.undoHistory,
            }).then(goHome);

        } else {
            
            removeItem('lastWork').then(goHome);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <EditorContext.Provider value={state}>
                <EditorHeader
                    style={styles.bringFront}
                    goBack={goHome}
                    saveImage={() => setShowSaveModal(true)}
                    exit={() => setShowExitModal(true)}
                    undo={() => handleUndo(state)}
                    redo={() => handleRedo(state)}
                    disabledUndo={state.disabledUndo}
                    disabledRedo={state.disabledRedo}
                />
                <Layout style={{ ...styles.layout, backgroundColor: theme['color-primary-800'] }}>
                    <GestureHandlerRootView>
                        <GestureDetector gesture={gestures}>
                            <Animated.View
                                style={[
                                    { 
                                        width: imageWidth,
                                        height: imageHeight,
                                        marginHorizontal: 10,
                                        top: '10%',
                                    },
                                    animation
                                ]}
                            >
                                <Animated.View style={[ styles.imageContainer, originalStyle ]}>
                                    <Canvas style={{ flex: 1 }}>
                                        {
                                            image && (
                                                <Image
                                                    image={image}
                                                    fit='contain'
                                                    x={0}
                                                    y={0}
                                                    width={imageWidth}
                                                    height={imageHeight}
                                                />
                                            )
                                        }
                                    </Canvas>
                                </Animated.View>
                                <Animated.View style={[ styles.imageContainer, editedStyle ]}>
                                    <Canvas style={{ flex: 1 }} ref={canvasRef}>
                                        {
                                            image && (
                                                <Image
                                                    image={image}
                                                    fit='contain'
                                                    x={0}
                                                    y={0}
                                                    width={imageWidth}
                                                    height={imageHeight}
                                                />
                                            )
                                        }
                                        {
                                            state.history.map(action => {
                                                const Tool = TOOLS.find(({ key }) => key === action.key).Tool;
                                                
                                                return <Tool key={action.key} id={action.key} {...action.data} />
                                            })
                                        }
                                    </Canvas>
                                </Animated.View>
                            </Animated.View>
                        </GestureDetector>
                    </GestureHandlerRootView>
                    <View style={styles.editorMenu}>
                        {
                            state.activeTool ? (
                                <Animated.View
                                    entering={SlideInLeft.duration(100)}
                                    exiting={SlideOutLeft.duration(100)}
                                    style={{
                                        ...styles.toolSettings,
                                        zIndex: 2,
                                        width: screenWidth,
                                        backgroundColor: theme['color-primary-default']
                                    }}
                                >
                                    {
                                        state.history.filter(({ active }) => active).map(action => {

                                            const Submenu = TOOLS.find(({ key }) => key === action.key).Submenu;

                                            return <Submenu key={action.key} style={styles.editorTool} id={action.key} />
                                        })
                                    }
                                </Animated.View>) :
                                null
                        }
                        <ScrollView 
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            bounces={false}
                            overScrollMode={'never'}
                            centerContent={true}
                            style={{
                                ...styles.bringFront,
                                backgroundColor: theme['color-primary-default'],
                                width: screenWidth,
                                bottom: 0,
                            }}
                        >
                                {TOOLS.map(({ Menu, key }) => (
                                    <Menu 
                                        id={key}
                                        key={key}
                                        containerStyle={styles.editorToolContainer}
                                        buttonStyle={styles.editorTool}
                                        textStyle={styles.editorToolText}
                                    />
                                ))}
                        </ScrollView>
                    </View>
                </Layout>
                <SaveModal
                    visible={showSaveModal}
                    hideModal={() => setShowSaveModal(false)}
                    saveImage={handleSaveImage(canvasRef, goHome)}
                />
                <ConfirmExitModal
                    visible={showExitModal}
                    hideModal={() => setShowExitModal(false)}
                    confirm={saveWork}
                />
            </EditorContext.Provider>
        </SafeAreaView>
    );
}