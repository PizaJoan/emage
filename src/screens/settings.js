import { Layout, Text, useTheme } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';

import SettingsHeader from './../components/headers/settingsHeader';

export default function SettingsScreen({ navigation }) {

    const theme = useTheme();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SettingsHeader goBack={() => navigation.goBack()} />
        <Layout style={{ flex: 1, backgroundColor: theme['color-primary-800'] }}>
            <Text onPress={() => navigation.goBack()}>Settings</Text>
        </Layout>
        </SafeAreaView>
    );
}

