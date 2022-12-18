import { TopNavigation, TopNavigationAction, Icon, useTheme } from '@ui-kitten/components';

function SaveIcon(props) {
    
    return <Icon {...props} name='save-outline' />;
}

function ExitIcon(props) {

    return <Icon {...props} name='close-outline' />;
}

function ArrowLeft(props) {

    return <Icon {...props} name='corner-up-left-outline' />;
}

function ArrowRight(props) {

    return <Icon {...props} name='corner-up-right-outline' />;
}

export default function EditorHeader({ saveImage, exit, undo, redo, disabledUndo, disabledRedo, style }) {

    const theme = useTheme();
    
    function WrappedLeftAction() {

        return (
            <>
                <TopNavigationAction icon={ExitIcon} onPress={exit} />
                <TopNavigationAction icon={ArrowLeft} onPress={undo} disabled={disabledUndo} />
                <TopNavigationAction icon={ArrowRight} onPress={redo} disabled={disabledRedo} />
            </>
        );
    }

    function WrappedSaveButton() {

        return (
            <TopNavigationAction
                onPress={saveImage}
                icon={SaveIcon}
            />
        );
    }

    return (
        <>
            <TopNavigation
                style={{ backgroundColor: theme['color-primary-default'], ...style }}
                accessoryLeft={WrappedLeftAction}
                accessoryRight={WrappedSaveButton}
            />
        </>
    );
}