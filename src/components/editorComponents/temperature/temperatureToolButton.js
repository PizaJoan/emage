import { Button, Icon } from '@ui-kitten/components';
import EditorContext from './../../../lib/editorContext';

import { pressTool } from './../../../lib/editorFunctions';


function ThermometerIcon(props) {

    return <Icon {...props} name='thermometer-outline' />
}

export default function TemperatureToolButton({ style, id, ...props }) {

    const pressEditorTool = pressTool(id);

    return (
        <EditorContext.Consumer>
            {(data) => (
                <Button
                    {...props}
                    style={style}
                    active={data.history.find(_ => _.key === id)?.active}
                    accessoryLeft={ThermometerIcon}
                    size={'giant'}
                    onPress={() => pressEditorTool(data)}
                />
            )}
        </EditorContext.Consumer>
    );
}