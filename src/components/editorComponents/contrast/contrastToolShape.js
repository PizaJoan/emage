import { ColorMatrix } from "@shopify/react-native-skia";

export default function ContrastToolShape(props) {

    if (!props.colorMatrix) return;

    return <ColorMatrix matrix={props.colorMatrix} />;
}