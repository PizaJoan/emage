import { useEffect, useState } from 'react';
import { Text, PermissionsAndroid, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Layout, useTheme } from '@ui-kitten/components';
import { launchImageLibrary } from 'react-native-image-picker';
import { useIsFocused } from '@react-navigation/native';

import { getItem, removeItem, setItem } from './../lib/storage';

import HomeHeader from './../components/headers/homeHeader';
import styles from './../styles/home.style';


export default function HomeScreen({ navigation }) {

    const isFocused = useIsFocused();
    const theme = useTheme();
    const [ permissionsGranted, setPermissionsGranted ] = useState(false);
    const [ lastWork, setLastWork ] = useState(false);
    
    useEffect(() => {

        async function askForPermissions() {

            const grantedReadStorage = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Permet Emage llegir arxius del sistema',
                    message: 'Emage necessita accés als arxius del sistema per poder llegir les imatges',
                    buttonPositive: 'Concedeix',
                    buttonNegative: 'Cancel·lar',
                }
            );

            const grantedWriteStorage = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Permet Emage escriure arxius del sistema',
                    message: 'Emage necessita accés als arxius del sistema per poder escriure les imatges',
                    buttonPositive: 'Concedeix',
                    buttonNegative: 'Cancel·lar',
                }
            );

            setPermissionsGranted(
                grantedReadStorage === PermissionsAndroid.RESULTS.GRANTED &&
                grantedWriteStorage === PermissionsAndroid.RESULTS.GRANTED
            );
        }

        askForPermissions();

    }, [ isFocused ]);

    useEffect(() => {

        if (isFocused) {

            getItem('lastWork').then(data => {
                console.log(data);
                if (!!data) setLastWork(true);
            });
        }

    }, [ isFocused ]);

    function selectImage() {

        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
            includeExtra: true,
            presentationStyle: 'overFullScreen',
        }).then(res => {
            if (res.assets.length) {

                Promise.all([
                    // Configuració de la imatge
                    setItem('imageConfig', {
                        format: res.assets[0].type,
                        width: res.assets[0].width,
                        height: res.assets[0].height,
                        size: res.assets[0].fileSize,
                    }),
                    // URI de la imagte
                    setItem('actualImage', res.assets[0].uri),
                    removeItem('lastWork'),
                ]).then(() => {
                    navigation.navigate('Editor');
                });
            }
        });
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HomeHeader goSettings={() => navigation.navigate('Settings')} />
            <Layout style={{ flex: 1, backgroundColor: theme['color-primary-800'], ...styles.layout }}>
                {
                    permissionsGranted ?
                        <>
                            {
                                lastWork && (
                                    <Button
                                        style={{ marginBottom: 25 }}
                                        onPress={() => navigation.navigate('Editor')}
                                    >
                                        Continuar el treball anterior
                                    </Button>
                                )
                            }
                            <Button onPress={selectImage}>
                                Selecciona la imatge
                            </Button> 
                        </> :
                        <Text>Calen permisos per poder emprar l'aplicació</Text>
                }
            </Layout>
        </SafeAreaView>
    );
}
