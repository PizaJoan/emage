import { ColorMatrix } from '@shopify/react-native-skia';

export default function TintToolShape({ id, ...props }) {

    if (!props.colorMatrix) return;
    
    return <ColorMatrix matrix={props.colorMatrix.flat()} />;
}