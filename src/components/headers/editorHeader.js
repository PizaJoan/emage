import { TopNavigation, TopNavigationAction, Icon, useTheme } from '@ui-kitten/components';
import { View } from 'react-native';

import TopBackButton from './../topButtons/topBackButton';

function SaveIcon(props) {
    
    return <Icon {...props} name='save-outline' />
}

export default function EditorHeader({ goBack, saveImage, style }) {

    const theme = useTheme();

    function WrappedBackButton() {

        return (<View style={{ flex: 1, flexDirection: 'row' }}>
            <TopBackButton goBack={goBack} />
            <TopNavigationAction
                onPress={saveImage}
                icon={SaveIcon}
            />
        </View>);
    }

    return (
        <TopNavigation
            accessoryLeft={WrappedBackButton}
            style={{ ...style, backgroundColor: theme['color-primary-default'] }}
        />
    );
}