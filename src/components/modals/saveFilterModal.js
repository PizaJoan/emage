import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Modal, Card, Button, Input, useTheme } from '@ui-kitten/components';
import Animated, { BounceInRight, BounceOutLeft } from 'react-native-reanimated';

import styles from './../../styles/modals.style';

export default function SaveFilterModal({ visible, hideModal, confirm }){

    const theme = useTheme();
    const [ filterName, setFilterName ] = useState('');
    const [ valid, setValid ] = useState(true);

    function changeText(value) {

        if (!value) setValid(false);
        else setValid(true);

        setFilterName(value);
    }

    function clickSave() {

        if (!filterName) {

            setValid(false);
            return;
        }

        confirm(filterName);
    }

    function AnimatedCaption() {

        return (
            !valid ?
                (
                    <Animated.View entering={BounceInRight.duration(150)} exiting={BounceOutLeft.duration(150)}>
                        <Text style={{ color: 'red' }}>El nom del filtre és necessari</Text>
                    </Animated.View>
                ) :
                null
        );
    }

    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={hideModal}
            style={styles.modal}
            >
            <Card
                disabled
                style={[{ backgroundColor: theme['color-primary-600'] }, styles.card]}
            >
                <Text style={styles.text}>Desa un filtre personalitzat</Text>
                <Input
                    textStyle={{ color: 'black' }}
                    style={[saveFilterStyles.input]}
                    placeholder="ex: wow"
                    value={filterName}
                    onChangeText={changeText}
                    label={props => <Text {...props} style={[saveFilterStyles.label]}>Nom del filtre</Text>}
                    caption={AnimatedCaption}
                />
                <View style={styles.footer}>
                    <Button onPress={hideModal}>
                        Cancel·lar
                    </Button>
                    <Button
                        onPress={clickSave}
                        style={{ marginLeft: 15 }}
                        >
                        Desar
                    </Button>
                </View>
            </Card>
        </Modal>
    );
}

const saveFilterStyles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderTopLeftRadius: 0,
    },
    label: {
        backgroundColor: 'white',
        color: 'black',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        textAlign: 'center',
        paddingTop: 1.5,
        fontSize: 15,
        marginLeft: 1,
        width: 110,
    },
});
