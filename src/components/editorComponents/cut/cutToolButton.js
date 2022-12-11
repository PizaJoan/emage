import { Button, Icon } from '@ui-kitten/components';
import EditorContext from './../../../lib/editorContext';


import { pressTool } from './../../../lib/editorFunctions';


function ScissorsIcon(props) {

    return <Icon {...props} name='scissors-outline' />
}

export default function CutToolButton({ style, id, ...props }) {

    const pressEditorTool = pressTool(id);

    return (
        <EditorContext.Consumer>
            {(data) => (
                <Button
                    {...props}
                    style={[
                        {...style},
                        {
                            transform: [{ rotateZ: '-90deg' }]
                        }
                    ]}
                    active={data.history.find(_ => _.key === id)?.active}
                    accessoryLeft={ScissorsIcon}
                    size={'giant'}
                    onPress={() => pressEditorTool(data)}
                />
            )}
        </EditorContext.Consumer>
    );
}