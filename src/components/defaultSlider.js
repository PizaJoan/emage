import { useTheme } from '@ui-kitten/components';
import { Slider } from '@miblanchard/react-native-slider';

export default function DefaultSlider({ value, onValueChange, minimumValue = 0, maximumValue = 1 }) {

    const theme = useTheme();

    return <Slider
        value={value}
        onValueChange={onValueChange}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        maximumTrackTintColor='white'
        minimumTrackTintColor={theme['color-primary-800']}
        thumbTintColor={theme['color-primary-800']}
    />
}