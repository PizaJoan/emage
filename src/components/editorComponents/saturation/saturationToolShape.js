import { ColorMatrix } from "@shopify/react-native-skia";

export default function SaturationToolShape(props) {

    if (!props.colorMatrix) return;

    return <ColorMatrix matrix={props.colorMatrix} />;
}