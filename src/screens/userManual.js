import Pdf from 'react-native-pdf';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SettingsHeader from './../components/headers/settingsHeader';

import { userManualPDF } from './../lib/constants/userManualBase64';
import { screenHeight, screenWidth } from './../lib/constants/variables';

export default function UserManual({ navigation }) {

    return (
        <SafeAreaView style={styles.container}>
            <SettingsHeader goBack={() => navigation.goBack()} />
            <Pdf source={{ uri: userManualPDF }} style={styles.pdf} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pdf: {
        flex: 1,
        width: screenWidth,
        height: screenHeight,
    }
});