import { useMemo } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Icon } from '@ui-kitten/components';

import EditorContext from './../../../lib/editorContext';

import { handleSubmenuTool } from './../../../lib/editorFunctions';

const predefinedFilters = [
    {
        icon: 'shuffle-2-outline',
        text: 'Invert',
        colorMatrix: [
            -1, 0, 0, 0, 1,
            0, -1, 0, 0, 1,
            0, 0, -1, 0, 1,
            0, 0, 0,  1, 0
        ]
    },
    {
        icon: 'camera-outline',
        text: 'Polaroid',
        colorMatrix: [
            1.438, -0.062, -0.062, 0, 0,
            -0.122, 1.378, -0.122, 0, 0,
            -0.016, -0.016, 1.483, 0, 0,
            0, 0, 0, 1, 0
        ]
    },
    {
        icon: 'tv-outline',
        text: 'Vintage',
        colorMatrix: [
            0.6279345635605994, 0.3202183420819367, -0.03965408211312453, 0, 9.651285835294123 / 255,
            0.02578397704808868, 0.6441188644374771, 0.03259127616149294, 0, 7.462829176470591 / 255,
            0.0466055556782719, -0.0851232987247891, 0.5241648018700465, 0, 5.159190588235296 / 255,
            0, 0, 0, 1, 0
        ]
    },
]

export default function PredefinedFiltersToolSubmenu({ id }) {

    const handleSubmenuEditTool = handleSubmenuTool(id);

    function pressFilter(data, colorMatrix, idFilter) {

        if (data.history.find(_ => _.key === id)?.data?.idFilter === idFilter) {
            
            handleSubmenuEditTool(data, null, true);

        } else {

            handleSubmenuEditTool(data, {
                colorMatrix,
                idFilter,
            });
        }
    }
    
    return (<EditorContext.Consumer>
        {(data) => (
            <ScrollView
                horizontal
                centerContent
                showsHorizontalScrollIndicator={false}
                bounces={false}
                overScrollMode={'never'}
            >
                {predefinedFilters.map(filter => 
                    <Button
                        key={filter.text}
                        accessoryLeft={props => <Icon name={filter.icon} {...props} />}
                        onPress={() => pressFilter(data, filter.colorMatrix, filter.text)}
                        active={data.history.find(_ => _.key === id)?.data?.idFilter === filter.text}
                    >
                        {filter.text}
                    </Button>
                )}
            </ScrollView>
        )}
    </EditorContext.Consumer>);
}