import { TopNavigation, useTheme } from '@ui-kitten/components';

import TopSettingsButton from './../topButtons/topSettingsButton';


export default function HomeHeader({ goSettings, style }) {

    const theme = useTheme();
    
    function SettingsAction() {

        return <TopSettingsButton goSettings={goSettings} />;
    }
    
    return (
        <TopNavigation
            style={{ backgroundColor: theme['color-primary-default'], ...style }}
            accessoryRight={SettingsAction}
        />
    );
}
