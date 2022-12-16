import { View } from 'react-native';
import VectorImage from 'react-native-vector-image';

import DefaultButton from './../../defaultButton';

function TintIcon(props) {

    return <VectorImage 
        source={require('./img/tint.svg')}
        style={{
            width: 19,
            height: 19,
        }}
    />
}

export default function TintToolButton({ containerStyle, buttonStyle, textStyle, id, ...props }) {

    return (
        <DefaultButton
            {...props}
            id={id}
            containerStyle={containerStyle}
            buttonStyle={buttonStyle}
            textStyle={textStyle}
            icon={TintIcon}
            text='Tint'
        />
    );
}