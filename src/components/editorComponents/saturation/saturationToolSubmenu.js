import { useMemo } from 'react';
import { View } from 'react-native';

import DefaultSlider from './../../defaultSlider';
import EditorContext from './../../../lib/editorContext';
import { handleSubmenuTool } from './../../../lib/editorFunctions';

export default function SaturationToolSubmenu({ id }) {

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

            colorMatrix[0][0] = 0.213 + 0.787 * value;
            colorMatrix[0][1] = 0.715 - 0.715 * value;
            colorMatrix[0][2] = 0.072 - 0.072 * value;
            colorMatrix[1][0] = 0.213 - 0.213 * value;
            colorMatrix[1][1] = 0.715 + 0.285 * value;
            colorMatrix[1][2] = 0.072 - 0.072 * value;
            colorMatrix[2][0] = 0.213 - 0.213 * value;
            colorMatrix[2][1] = 0.715 - 0.715 * value;
            colorMatrix[2][2] = 0.072 + 0.928 * value;

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
                    value={data.history.find(_ => _.key === id)?.data?.lastValue || 1}
                    onValueChange={value => changeValue(data, value)}
                    minimumValue={1}
                    maximumValue={3}
                />
            </View>
        )}
    </EditorContext.Consumer>);
}