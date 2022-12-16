import VectorImage from 'react-native-vector-image';

import DefaultButton from './../../defaultButton';


function ContrastIcon(props) {

    return <VectorImage
        source={require('./img/contrast.svg')} 
        style={{
            width: 19,
            height: 19,
        }}
    />
}

export default function ContrastToolButton({ containerStyle, buttonStyle, textStyle, id, ...props }) {

    return (
        <DefaultButton
            {...props}
            id={id}
            containerStyle={containerStyle}
            buttonStyle={buttonStyle}
            textStyle={textStyle}
            icon={ContrastIcon}
            text='Contrast'
        />
    );
}