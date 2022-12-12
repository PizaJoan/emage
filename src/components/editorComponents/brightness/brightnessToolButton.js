import { Button, Icon } from '@ui-kitten/components';
import EditorContext from './../../../lib/editorContext';

import { pressTool } from './../../../lib/editorFunctions';


function SunIcon(props) {

    return <Icon {...props} name='sun-outline' />
}

export default function BrighnessToolButton({ style, id, ...props }) {

    const pressEditorTool = pressTool(id);

    return (
        <EditorContext.Consumer>
            {(data) => (
                <Button
                    {...props}
                    style={style}
                    active={data.history.find(_ => _.key === id)?.active}
                    accessoryLeft={SunIcon}
                    size={'giant'}
                    onPress={() => pressEditorTool(data)}
                />
            )}
        </EditorContext.Consumer>
    );
}