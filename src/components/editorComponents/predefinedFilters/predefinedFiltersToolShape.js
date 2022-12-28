import { ColorMatrix } from "@shopify/react-native-skia";

export default function PredefinedFiltersToolShape(props) {

    if (!props.colorMatrix) return;

    return <ColorMatrix matrix={props.colorMatrix} />;
}