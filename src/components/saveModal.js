import { StyleSheet, View } from 'react-native';
import { Text, Modal, Card, Button, Icon, Input, Select, SelectItem, IndexPath, useTheme } from '@ui-kitten/components';
import { useState } from 'react';
import { imageFormats } from '../lib/constants/variables';


export default function SaveModal({ visible, hideModal, saveImage }) {
    
    const theme = useTheme();
    const [ disabled, setDisabled ] = useState(false);
    const [ filename, setFilename ] = useState('');
    const [ selectedIndex, setSelectedIndex ] = useState(new IndexPath(0));
    const selectedFomat = imageFormats[selectedIndex.row];

    function clickSave() {
        setDisabled(true);
        saveImage(filename, selectedFomat).finally(clearDataAndHideModal);
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
                    style={{ ...styles.formItems, marginBottom: 20 }}
                    placeholder="ex: imatge"
                    value={filename}
                    onChangeText={val => setFilename(val)}
                    label={props => <Text {...props} style={styles.baseLabel}>Nom</Text>}
                    disabled={disabled}
                />
                <Select
                    style={styles.formItems}
                    placeHolder='JPG'
                    value={selectedFomat}
                    selectedIndex={selectedIndex}
                    onSelect={index => setSelectedIndex(index)}
                    label='Format'
                    disabled={disabled}
                >
                    {imageFormats.map(format => 
                        <SelectItem style={{ backgroundColor: 'white' }} title={format} />
                    )}
                </Select>
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
        color: 'black',
        borderColor: 'black',
        borderTopLeftRadius: 0,
    },
    baseLabel: {
        backgroundColor: 'white',
        color: 'black',
        width: 50,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        textAlign: 'center',
        paddingTop: 1.5
    }
});