import VectorImage from 'react-native-vector-image';

import DefaultButton from './../../defaultButton';

function SaturationIcon(props) {

    return <VectorImage source={require('./img/saturation.svg')} />
}

export default function SaturationToolButton({ containerStyle, buttonStyle, textStyle, id, ...props }) {

    return (
        <DefaultButton
            {...props}
            id={id}
            containerStyle={containerStyle}
            buttonStyle={buttonStyle}
            textStyle={textStyle}
            icon={SaturationIcon}
            text='Saturació'
        />
    );
}