import { Icon } from '@ui-kitten/components';

import DefaultButton from './../../defaultButton';

function ThermometerIcon(props) {

    return <Icon {...props} name='thermometer-outline' />
}

export default function TemperatureToolButton({ containerStyle, buttonStyle, textStyle, id, ...props }) {

    return (
        <DefaultButton
            {...props}
            id={id}
            containerStyle={containerStyle}
            buttonStyle={buttonStyle}
            textStyle={textStyle}
            icon={ThermometerIcon}
            text='Temperatura'
        />
    );
}