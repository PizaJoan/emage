import { View } from 'react-native';
import { Text, Modal, Card, Button, useTheme } from '@ui-kitten/components';

import styles from './../../styles/modals.style';

export default function ConfirmExitModal({ visible, hideModal, confirm }){

    const theme = useTheme();

    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={hideModal}
            style={styles.modal}
        >
            <Card
                disabled={true}
                style={[{ backgroundColor: theme['color-primary-600'] }, styles.card]}
            >
                <Text style={styles.text}>Segur que vols sortir?</Text>
                <View style={styles.footer}>
                    <Button onPress={hideModal} >Cancel·lar</Button>
                    <Button
                        onPress={confirm}
                        style={{ marginLeft: 15 }}
                    >
                        Confirmar
                    </Button>
                </View>
            </Card>
        </Modal>
    );
}