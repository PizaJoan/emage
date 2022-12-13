import { Button } from '@ui-kitten/components';
import VectorImage from 'react-native-vector-image';
import EditorContext from './../../../lib/editorContext';

import { pressTool } from './../../../lib/editorFunctions';


function ContrastIcon(props) {

    return <VectorImage
        source={require('./img/contrast.svg')} 
        style={{
            width: 19,
            height: 19,
        }}
    />
}

export default function ContrastToolButton({ style, id, ...props }) {

    const pressEditorTool = pressTool(id);

    return (
        <EditorContext.Consumer>
            {(data) => (
                <Button
                    {...props}
                    style={{
                        ...style,
                        paddingHorizontal: 22
                    }}
                    active={data.history.find(_ => _.key === id)?.active}
                    accessoryLeft={ContrastIcon}
                    size={'giant'}
                    onPress={() => pressEditorTool(data)}
                />
            )}
        </EditorContext.Consumer>
    );
}