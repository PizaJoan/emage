import { useEffect } from 'react';
import { Button, Text } from '@ui-kitten/components';
import { launchImageLibraryAsync, useMediaLibraryPermissions } from 'expo-image-picker';

import HomeHeader from './../components/headers/homeHeader';
import MainLayout from './../layouts/mainLayout';

import styles from './../styles/home.style';

import { setItem } from './../lib/storage';
import { SafeAreaView } from 'react-native';

export default function HomeScreen({ navigation }) {

    const [ status, requestPermission ] = useMediaLibraryPermissions();
    
    useEffect(() => {
        requestPermission();
        if (status?.status !== 'granted' || !status?.granted) {
           
            // Mostrar info que calen permissos
            
        } else {
            
            // launchImageLibraryAsync().then(result => {
            //     console.log(result);
            // });
            console.log(status);
        }
    }, []);

    function selectImage() {
        launchImageLibraryAsync({ base64: true }).then(result => {

            if (!result.cancelled) {

                setItem('actualImage', result.uri).then(() => {

                    navigation.navigate('Editor');
                });
            }
        });
    }

    function WrappedHomeHeader(props) {

        return <HomeHeader {...props} goSettings={() => navigation.navigate('Settings')} />;
    }

    return (
        <SafeAreaView>
            
        </SafeAreaView>
        <MainLayout header={WrappedHomeHeader} style={styles.layout}>
            {/* TODO: guardar estat treball */}
            <Button onPress={selectImage}>
                Selecciona la imatge
            </Button>
        </MainLayout>
    );
}
