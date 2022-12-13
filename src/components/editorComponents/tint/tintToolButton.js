import { Button } from '@ui-kitten/components';
import VectorImage from 'react-native-vector-image';
import EditorContext from './../../../lib/editorContext';

import { pressTool } from './../../../lib/editorFunctions';


function ThermometerIcon(props) {

    return <VectorImage 
        source={require('./img/tint.svg')}
        style={{
            width: 19,
            height: 19,
        }}
    />
}

export default function TintToolButton({ style, id, ...props }) {

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
                    accessoryLeft={ThermometerIcon}
                    size={'giant'}
                    onPress={() => pressEditorTool(data)}
                />
            )}
        </EditorContext.Consumer>
    );
}