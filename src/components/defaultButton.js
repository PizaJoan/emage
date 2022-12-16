import { View } from 'react-native';
import { Button, Text } from '@ui-kitten/components';

import EditorContext from './../lib/editorContext';
import { pressTool } from './../lib/editorFunctions';

export default function DefaultButton({ id, containerStyle, buttonStyle, textStyle, icon, text, ...props }) {

    const pressEditorTool = pressTool(id);

    return (
        <EditorContext.Consumer>
            {(data) => (
                <View style={containerStyle}>
                    <Button
                        {...props}
                        style={buttonStyle}
                        active={data.history.find(_ => _.key === id)?.active}
                        accessoryLeft={icon}
                        size={'giant'}
                        onPress={() => pressEditorTool(data)}
                    />
                    <Text style={textStyle}>{text}</Text>
                </View>
            )}
        </EditorContext.Consumer>
    )
}