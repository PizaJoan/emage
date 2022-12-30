import React from 'react';
import { StatusBar } from 'react-native';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { default as theme } from './../theme.json';

import HomeScreen from './screens/home';
import SettingsScreen from './screens/settings';
import EditorScreen from './screens/editor';
import UserManual from './screens/userManual';

const { Navigator, Screen } = createNativeStackNavigator();

const screens = [
    { name: 'Home', component: HomeScreen },
    { name: 'Settings', component: SettingsScreen },
    { name: 'Editor', component: EditorScreen },
    { name: 'UserManual', component: UserManual },
]

export default function Emage() {

    return (<>
        <StatusBar
            backgroundColor={theme['color-primary-700']}
        />
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
            <NavigationContainer>
                <Navigator screenOptions={{ headerShown: false }} style={{ fontFamily: 'Roboto-Regular' }}>
                    {screens.map(screen => (
                        <Screen
                            key={screen.name}
                            name={screen.name}
                            component={screen.component}
                        />
                    ))}
                </Navigator>
            </NavigationContainer>
        </ApplicationProvider>
    </>)
}