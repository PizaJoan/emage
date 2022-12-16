import { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Modal, Card, Button, Input, Radio, RadioGroup, useTheme } from '@ui-kitten/components';

import { imageFormats } from './../lib/constants/variables';

export default function SaveModal({ visible, hideModal, saveImage }) {
    
    const theme = useTheme();
    const [ disabled, setDisabled ] = useState(false);
    const [ filename, setFilename ] = useState('');
    const [ selectedIndex, setSelectedIndex ] = useState(0);

    function clickSave() {

        setDisabled(true);
        saveImage(filename, imageFormats[selectedIndex]).finally(clearDataAndHideModal);
    }
    function clearDataAndHideModal() {

        setDisabled(false);
        setFilename('');
        hideModal();
    }

    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={clearDataAndHideModal}
            style={{ width: '75%' }}
        >
            <Card 
                disabled={true}
                style={{
                    flex: 1,
                    margin: 2,
                    backgroundColor: theme['color-primary-700'],
                    borderColor: 'transparent',
                    borderRadius: 10
                }}
            >
                <Text style={{ fontFamily: 'Roboto-Bold', marginBottom: 25 }}>Desar Imatge</Text>
                <Input
                    textStyle={{ color: 'black' }}
                    style={[styles.formItems, { marginBottom: 20 }]}
                    placeholder="ex: imatge"
                    value={filename}
                    onChangeText={val => setFilename(val)}
                    label={props => <Text {...props} style={[styles.baseLabel, { width: 50 }]}>Nom</Text>}
                    disabled={disabled}
                />
                <Text style={[
                    styles.baseLabel,
                    { width: 155 }
                ]}>
                    Format de la imagte
                </Text>
                <RadioGroup
                    style={[styles.radioGroup, styles.formItems]}
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

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 25
    },
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