import { Icon } from '@ui-kitten/components';

import DefaultButton from './../../defaultButton';


function SunIcon(props) {

    return <Icon {...props} name='sun-outline' />
}

export default function BrighnessToolButton({ containerStyle, buttonStyle, textStyle, id, ...props }) {

    return (
        <DefaultButton
            {...props}
            id={id}
            containerStyle={containerStyle}
            buttonStyle={buttonStyle}
            textStyle={textStyle}
            icon={SunIcon}
            text='Lluminositat'
        />
    );
}