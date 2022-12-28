import { View } from 'react-native';
import { Text, Modal, Card, Button, useTheme } from '@ui-kitten/components';

import EditorContext from './../../lib/editorContext';

import styles from './../../styles/modals.style';

export default function ConfirmExitModal({ visible, hideModal, confirm }){

    const theme = useTheme();

    return (
        <EditorContext.Consumer>
            {(data) => (
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
                        <Text style={[ styles.text, { marginBottom: 0 }]}>
                            {
                                data?.history?.length ? 'Vols sortir i desar el treball?' : 'Segur que vols sortir?'
                            }
                        </Text>
                        <View style={[ styles.footer, { justifyContent: 'center' }]}>
                            <Button onPress={hideModal}>
                                {
                                    data?.history?.length ?
                                        'Sortir sense desar' :
                                        'Cancel·lar'
                                }
                            </Button>
                            <Button
                                onPress={confirm}
                                style={{ marginLeft: 15 }}
                                >
                                {  
                                    data?.history?.length ? 
                                        'Desar' :
                                        'Confirmar'
                                }
                            </Button>
                        </View>
                    </Card>
                </Modal>
           )}
        </EditorContext.Consumer>
    );
}