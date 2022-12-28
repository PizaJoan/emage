import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { BounceInRight, BounceOutLeft } from 'react-native-reanimated';
import { Text, Modal, Card, Button, Input, Radio, RadioGroup, useTheme } from '@ui-kitten/components';

import styles from './../../styles/modals.style';

import { imageFormats } from './../../lib/constants/variables';

export default function SaveModal({ visible, hideModal, saveImage }) {
    
    const theme = useTheme();
    const [ disabled, setDisabled ] = useState(false);
    const [ filename, setFilename ] = useState('');
    const [ selectedIndex, setSelectedIndex ] = useState(0);
    const [ valid, setvalid ] = useState(true);

    function clickSave() {

        setvalid(true);

        if (!filename || filename.length < 1) {

            setvalid(false);
            return;
        } 

        setDisabled(true);
        saveImage(filename, imageFormats[selectedIndex]).finally(clearDataAndHideModal);
    }
    function clearDataAndHideModal() {

        setDisabled(false);
        setFilename('');
        hideModal();
    }

    function changeText(value) {

        if (!value) setvalid(false);
        else setvalid(true);
        
        setFilename(value);
    }

    function AnimatedCaption() {

        return (
            !valid ?
                (
                    <Animated.View entering={BounceInRight.duration(150)} exiting={BounceOutLeft.duration(150)}>
                        <Text style={{ color: 'red' }}>El nom és necessari</Text>
                    </Animated.View>
                ) :
                null
        );
    }

    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={clearDataAndHideModal}
            style={styles.modal}
        >
            <Card 
                disabled
                style={[{ backgroundColor: theme['color-primary-600'] }, styles.card ]}
            >
                <Text style={styles.text}>Desar Imatge</Text>
                <Input
                    textStyle={{ color: 'black' }}
                    style={[saveModalStyle.formItems, { marginBottom: 20 }]}
                    placeholder="ex: imatge"
                    value={filename}
                    onChangeText={changeText}
                    label={props => <Text {...props} style={[saveModalStyle.baseLabel, { width: 50 }]}>Nom</Text>}
                    disabled={disabled}
                    caption={AnimatedCaption}
                />
                <Text style={[
                    saveModalStyle.baseLabel,
                    { width: 155 }
                ]}>
                    Format de la imagte
                </Text>
                <RadioGroup
                    style={[saveModalStyle.radioGroup, saveModalStyle.formItems]}
                    selectedIndex={selectedIndex}
                    onChange={index => setSelectedIndex(index)}
                >
                    {imageFormats.map(format => 
                        <Radio key={format}>
                            {props => <Text {...props} style={{ color: 'black' }}>.{format}</Text>}
                        </Radio>
                    )}
                </RadioGroup>
                <View style={styles.footer}>
                    <Button
                        onPress={clearDataAndHideModal}
                        disabled={disabled}
                    >
                        Cancel·lar
                    </Button>
                    <Button
                        style={{ marginLeft: 15 }}
                        onPress={clickSave}
                        disabled={disabled}
                    >
                        Desar
                    </Button>
                </View>
            </Card>
        </Modal>
    );
}

const saveModalStyle = StyleSheet.create({
    formItems: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderTopLeftRadius: 0,
    },
    baseLabel: {
        backgroundColor: 'white',
        color: 'black',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        textAlign: 'center',
        paddingTop: 1.5,
        fontSize: 15,
        marginLeft: 1,
    },
    radioGroup: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderRadius: 3.5,
        paddingVertical: 1,
        borderWidth: 1,
    }
});