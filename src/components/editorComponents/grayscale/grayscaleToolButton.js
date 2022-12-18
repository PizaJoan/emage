import VectorImage from 'react-native-vector-image';

import DefaultButton from './../../defaultButton';

function GrayscaleIcon(props) {

    return (
        <VectorImage 
            source={require('./img/grayscale.svg')}
            style={{ width: 28, height: 28 }}
        />
    );
}

export default function GrayscaleToolButton({ containerStyle, buttonStyle, textStyle, id, ...props }) {

    return (
        <DefaultButton
            {...props}
            id={id}
            containerStyle={containerStyle}
            buttonStyle={buttonStyle}
            textStyle={textStyle}
            icon={GrayscaleIcon}
            text='Escala Grisos'
        />
    );
}