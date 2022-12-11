import { Icon, TopNavigationAction } from '@ui-kitten/components';

function SettingsIcon(props) {

    return <Icon {...props} name='settings-2-outline' />;
}


export default function SettingsButton({ goSettings }) {

    return (
        <TopNavigationAction
            icon={SettingsIcon}
            onPress={goSettings}
        />
    );
}