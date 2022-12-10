import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { launchImageLibrary } from 'react-native-image-picker';
import ExpoPixi, { PIXI } from 'expo-pixi';

import { default as theme } from './theme.json';

export default function App() {
    console.log(ExpoPixi.FilterImage, PIXI.filters)
    useEffect(() => {
        
        // launchImageLibrary({
        //     mediaType: 'photo',
        // }).then(console.log).catch(console.log)

    }, [])
    
    return (<>
        <StatusBar
            backgroundColor={theme['color-primary-700']}
        />
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
            <Text style={{ fontFamily: 'Roboto-Regular'}}>
                Hola
            </Text>
            <ExpoPixi.FilterImage
                style={{
                    width: 400,
                    height: 400,
                    flex: 1,
                }}
                source={'https://static-cdn.jtvnw.net/jtv_user_pictures/198c0fe9-cf41-4ef1-ad55-405c1e599f25-profile_image-70x70.png'}
                resizeMode={'cover'}
                filters={new PIXI.filters.BlurFilter()}
            />
        </ApplicationProvider>
    </>);
};

