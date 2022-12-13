import { StyleSheet } from 'react-native';
import { Line, Circle, vec } from '@shopify/react-native-skia';

export default function CutToolShape({ id, data }) {

    return (<>
        {/* <Line 
            p1={vec(10, 40)}
            p2={vec(290, 40)}
            style='stroke'
            strokeWidth={2}
            color='white'
        />
        <Circle
            cx={10}
            cy={40}
            r={10}
            color='white'
        />
        <Line 
            p1={vec(290, 40)}
            p2={vec(290, 410)}
            style='stroke'
            strokeWidth={3}
            color='white'
        />
        <Circle
            cx={290}
            cy={40}
            r={10}
            color='white'
        />
        <Line 
            p1={vec(290, 410)}
            p2={vec(10, 410)}
            style='stroke'
            strokeWidth={2}
            color='white'
        />
        <Circle
            cx={290}
            cy={410}
            r={10}
            color='white'
        />
        <Line 
            p1={vec(10, 40)}
            p2={vec(10, 410)}
            style='stroke'
            strokeWidth={3}
            color='white'
        />
        <Circle
            cx={10}
            cy={410}
            r={10}
            color='white'
        /> */}
    </>);
}

const styles = StyleSheet.create({
    square: {
        borderColor: 'white',
        borderWidth: 2
    }
})