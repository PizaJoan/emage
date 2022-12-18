import { ColorMatrix } from "@shopify/react-native-skia";

export default function GrayscaleToolShape(props) {

    if (!props.colorMatrix) return;

    return <ColorMatrix matrix={props.colorMatrix} />;
}