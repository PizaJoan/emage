import { TopNavigation, useTheme } from '@ui-kitten/components';

import TopBackButton from './../topButtons/topBackButton';


export default function SettingsHeader({ goBack }) {

    const theme = useTheme();

    function WrappedBackButton() {

        return <TopBackButton goBack={goBack} />;
    }

    return (
        <TopNavigation
            accessoryLeft={WrappedBackButton}
            style={{ backgroundColor: theme['color-primary-default'] }}
        />
    );
}