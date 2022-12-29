import { useMemo } from 'react';
import { View } from 'react-native';

import DefaultSlider from './../../defaultSlider';
import EditorContext from './../../../lib/editorContext';
import { handleSubmenuTool } from './../../../lib/editorFunctions';

export default function TintToolSubmenu({ id }) {

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
        
            colorMatrix[0][0] = 1 + value;
            colorMatrix[2][2] = 1 + value;

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
                    minimumValue={-0.2}
                    maximumValue={0.2}
                />
            </View>
        )}
    </EditorContext.Consumer>);
}
