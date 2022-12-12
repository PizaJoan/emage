import { useTheme } from '@ui-kitten/components';
import { Slider } from '@miblanchard/react-native-slider';
import { useState } from 'react';
import { View } from 'react-native';

import EditorContext from '../../../lib/editorContext';
import { handleSubmenuTool } from '../../../lib/editorFunctions';



export default function BrightnessSubmenu({ id }) {

    const theme = useTheme();

    const handleSubmenuEditTool = handleSubmenuTool(id);

    function changeValue(data) {

        return function (value) {

            const colorMatrix = [
                1, 0, 0, 0, value[0],
                0, 1, 0, 0, value[0],
                0, 0, 1, 0, value[0],
                0, 0, 0, 1, 0,
            ];

            handleSubmenuEditTool(data, {
                colorMatrix,
                lastValue: value[0],
            });
        }
    }
    
    return (<EditorContext.Consumer>
        {(data) => (
            <View style={{ flex: 1, marginHorizontal: 40, marginTop: 15 }}>
                <Slider
                    value={data.history.find(_ => _.key === id)?.data?.lastValue}
                    onValueChange={changeValue(data)}
                    minimumValue={0}
                    maximumValue={0.5}
                    maximumTrackTintColor='white'
                    minimumTrackTintColor={theme['color-primary-800']}
                    thumbTintColor={theme['color-primary-800']}
                />
            </View>
        )}
    </EditorContext.Consumer>);
}
