import { TopNavigation, useTheme } from '@ui-kitten/components';

import TopBackButton from './../topButtons/topBackButton';


export default function EditorHeader({ goBack, style }) {

    const theme = useTheme();

    function WrappedBackButton() {

        return <TopBackButton goBack={goBack} />;
    }

    return (
        <TopNavigation
            accessoryLeft={WrappedBackButton}
            style={{ ...style, backgroundColor: theme['color-primary-default'] }}
        />
    );
}