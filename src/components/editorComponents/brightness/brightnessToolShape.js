import { ColorMatrix } from '@shopify/react-native-skia';

export default function BrightnessShape({ id, ...props }) {

    if (!props.colorMatrix) return;
    
    return <ColorMatrix matrix={props.colorMatrix.flat()} />;
}