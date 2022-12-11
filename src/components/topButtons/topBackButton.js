import { Icon, TopNavigationAction } from '@ui-kitten/components';

function BackIcon(props) {

    return <Icon {...props} name='arrow-back-outline' />;
}

export default function TopBackButton({ goBack }) {

    return (
        <TopNavigationAction
            icon={BackIcon}
            onPress={goBack}
        />
    );
}