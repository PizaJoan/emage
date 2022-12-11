import { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Layout, useTheme } from '@ui-kitten/components';
import { launchImageLibrary } from 'react-native-image-picker';

import { setItem } from './../lib/storage';

import HomeHeader from './../components/headers/homeHeader';
import styles from './../styles/home.style';


export default function HomeScreen({ navigation }) {

    const theme = useTheme();
    
    useEffect(() => {
        
    }, []);

    function selectImage() {

        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
            includeExtra: true,
            presentationStyle: 'popover',
        }).then(res => {
            if (res.assets.length) {

                setItem('actualImage', res.assets[0].uri).then(() => {

                    navigation.navigate('Editor');
                });
            }
        });
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HomeHeader goSettings={() => navigation.navigate('Settings')} />
            <Layout style={{ flex: 1, backgroundColor: theme['color-primary-800'], ...styles.layout }}>
                {/* TODO: guardar estat treball */}
                <Button onPress={selectImage}>
                    Selecciona la imatge
                </Button>
            </Layout>
        </SafeAreaView>
    );
}
