import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Icon, List, ListItem, useTheme } from '@ui-kitten/components';

import SettingsHeader from './../components/headers/settingsHeader';

export default function SettingsScreen({ navigation }) {

    const theme = useTheme();

    const optionsData = [
        {
            title: `Manual d'usuari`,
            description: `Consulta la guia per explorar totes les funcions de l'app`,
            icon: (props) => <Icon {...props} name='file-text-outline' />,
            onPress: () => navigation.navigate('UserManual'),
        }
    ]
    
    function renderItem({ item }) {
    
        return (
            <ListItem
                style={{
                    backgroundColor: 'transparent'
                }}
                title={item.title}
                description={item.description}
                accessoryLeft={item.icon}
                onPress={item.onPress}
            />
        );
    }    

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SettingsHeader goBack={() => navigation.goBack()} />
            <Layout style={{ flex: 1, backgroundColor: theme['color-primary-800'] }}>
                <List
                    style={{
                        backgroundColor: theme['color-primary-800']
                    }}
                    data={optionsData}
                    renderItem={renderItem}
                />
            </Layout>
        </SafeAreaView>
    );
}

