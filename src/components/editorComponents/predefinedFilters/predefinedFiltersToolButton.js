import { Icon } from '@ui-kitten/components';

import DefaultButton from './../../defaultButton';

function FilterIcon(props) {

    return <Icon {...props} name='funnel-outline' />
}

export default function PredefinedFiltersToolButton({ containerStyle, buttonStyle, textStyle, id, ...props }) {

    return (
        <DefaultButton
            {...props}
            id={id}
            containerStyle={containerStyle}
            buttonStyle={buttonStyle}
            textStyle={textStyle}
            icon={FilterIcon}
            text='Filtres'
        />
    );
}
