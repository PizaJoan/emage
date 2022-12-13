import { Button } from '@ui-kitten/components';
import VectorImage from 'react-native-vector-image';
import EditorContext from './../../../lib/editorContext';

import { pressTool } from './../../../lib/editorFunctions';

function SaturationIcon(props) {

    return <VectorImage source={require('./img/saturation.svg')} />
}

export default function SaturationToolButton({ style, id, ...props }) {

    const pressEditorTool = pressTool(id);

    return (
        <EditorContext.Consumer>
            {(data) => (
                <Button
                    {...props}
                    style={{
                        ...style,
                        paddingHorizontal: 24,
                    }}
                    active={data.history.find(_ => _.key === id)?.active}
                    accessoryLeft={SaturationIcon}
                    size={'giant'}
                    onPress={() => pressEditorTool(data)}
                />
            )}
        </EditorContext.Consumer>
    );
}