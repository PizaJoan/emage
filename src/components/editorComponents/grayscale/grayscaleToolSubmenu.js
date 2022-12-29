import { useMemo } from 'react';
import { View } from 'react-native';
import clamp from 'clamp';

import DefaultSlider from './../../defaultSlider';
import EditorContext from './../../../lib/editorContext';
import { handleSubmenuTool } from './../../../lib/editorFunctions';

export default function GrayscaleToolSubmenu({ id }) {

    const handleSubmenuEditTool = handleSubmenuTool(id);

    const colorMatrix = [
        [ 1, 0, 0, 0, 0 ],
        [ 0, 1, 0, 0, 0 ],
        [ 0, 0, 1, 0, 0 ],
        [ 0, 0, 0, 1, 0 ],
    ];

    const changeValue = useMemo(() => 
        function (data, value) {

            value = Array.isArray(value) ? value[0] : value;

            const clampValue = clamp(1 - value, 0, 1);

            colorMatrix[0][0] = 0.2126 + 0.7874 * clampValue;
            colorMatrix[0][1] = 0.7152 - 0.7152 * clampValue;
            colorMatrix[0][2] = 0.0722 - 0.0722 * clampValue;
            colorMatrix[1][0] = 0.2126 - 0.2126 * clampValue;
            colorMatrix[1][1] = 0.7152 + 0.2848 * clampValue;
            colorMatrix[1][2] = 0.0722 - 0.0722 * clampValue;
            colorMatrix[2][0] = 0.2126 - 0.2126 * clampValue;
            colorMatrix[2][1] = 0.7152 - 0.7152 * clampValue;
            colorMatrix[2][2] = 0.0722 + 0.9278 * clampValue;

            handleSubmenuEditTool(data, {
                colorMatrix,
                lastValue: value,
            });
        },
        [ colorMatrix ],
    );
    
    return (<EditorContext.Consumer>
        {(data) => (
            <View style={{ flex: 1, marginHorizontal: 40, marginTop: 15 }}>
                <DefaultSlider
                    value={data.history.find(_ => _.key === id)?.data?.lastValue || 0}
                    onValueChange={value => changeValue(data, value)}
                    minimumValue={0}
                    maximumValue={1}
                />
            </View>
        )}
    </EditorContext.Consumer>);
}