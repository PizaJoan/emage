import { useEffect, useState, useMemo } from 'react';
import { View, Dimensions, Image } from 'react-native';
import { Layout, useTheme } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Gesture, GestureDetector, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import Animated, { SlideInLeft, SlideOutLeft, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import EditorContext from './../lib/editorContext'
import EditorHeader from './../components/headers/editorHeader';

import styles from './../styles/editor.style';

import { getItem } from './../lib/storage';
import { TOOLS } from './../lib/constants/editorTools';

const imageWidth = 300;
const imageHeight = 450;

const { width: screenWidth, height: screenHeight} = Dimensions.get('screen');
const screenMidWidth = screenWidth / 2;
const screenMidHeight = screenHeight / 2;


export default function EditorScreen({ navigation }) {

    const theme = useTheme();

    const [ imageURL, setImageURL ] = useState(false);
    const [ state, setState ] = useState({
        activeTool: false,
        history: [],
        updateState: updateState,
    });
    function updateState(newState) {
        setState(newState);
    }

    const scale = useSharedValue(1);
    const prevScale = useSharedValue(1);
    const originX = useSharedValue(0);
    const originY = useSharedValue(0);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    useEffect(() => {
        
        getItem('actualImage').then(setImageURL).catch(console.log);
    }, []);

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

    const gestures = Gesture.Simultaneous(pinchGesture, panGesture, doubleTapGesture);

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

    console.log(state.history);
    if (!imageURL) return;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <EditorContext.Provider value={state}>
                <EditorHeader style={styles.bringFront} goBack={() => navigation.goBack()} />
                <Layout style={{ ...styles.layout, backgroundColor: theme['color-primary-800'] }}>
                    <GestureHandlerRootView>
                        <GestureDetector gesture={gestures}>
                            <Animated.View
                                style={[
                                    { 
                                        width: imageWidth,
                                        height: imageHeight,
                                        marginTop: '18.5%',
                                    },
                                    animation
                                ]}
                            >
                                <Image
                                    source={{ uri: imageURL }}
                                    style={{ 
                                        width: imageWidth,
                                        height: imageHeight
                                    }}
                                />
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
                                        state.history.filter(({ active }) => active).map(({ key }) => {

                                            const Submenu = TOOLS.find(({ key }) => key === key).Submenu;

                                            return <Submenu key={key} style={styles.editorTool} id={key} />
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
                            }}
                            >
                                {TOOLS.map(({ Tool, key }) => (
                                    <Tool key={key} style={styles.editorTool} id={key} />
                                ))}
                        </ScrollView>
                    </View>
                </Layout>
            </EditorContext.Provider>
        </SafeAreaView>
    );
}