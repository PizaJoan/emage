import { Text, useTheme } from '@ui-kitten/components';
import { Slider } from '@miblanchard/react-native-slider';
import { View } from 'react-native';

export default function DefaultSlider({ value, onValueChange, minimumValue = 0, maximumValue = 1 }) {

    const theme = useTheme();

    return (
        <View>
            <Text style={{ 
                textAlign: 'center',
                fontFamily: 'Roboto-Medium'
            }}>
                {Math.round(value * 100) / 100}
            </Text>
            <Slider
                value={value}
                onValueChange={onValueChange}
                minimumValue={minimumValue}
                maximumValue={maximumValue}
                maximumTrackTintColor='white'
                minimumTrackTintColor={theme['color-primary-800']}
                thumbTintColor={theme['color-primary-800']}
            />
        </View>
    );
}