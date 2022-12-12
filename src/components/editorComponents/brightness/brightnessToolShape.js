import { ColorMatrix } from '@shopify/react-native-skia';

import EditorContext from './../../../lib/editorContext';

export default function BrightnessShape({ id, ...props }) {

    if (!props.colorMatrix) return;
    
    return <ColorMatrix matrix={props.colorMatrix} />;
}