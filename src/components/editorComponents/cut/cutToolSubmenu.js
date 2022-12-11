import { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button, Icon } from '@ui-kitten/components';

import EditorContext from './../../../lib/editorContext';
import { handleSubmenuTool } from './../../../lib/editorFunctions';

function Square(props) {

    return <Icon {...props} name='square-outline' />
}

function Circle(props) {

    return <Icon {...props} name='radio-button-off-outline' />
}

function Hand() {
    return <Image
        source={require('./img/hand-crop.png')}
        style={{
            width: 35,
            height: 43,
            transform: [{ scale: 0.75 }]
        }}
    />
}


export default function CutToolSubmenu({ style, id }) {

    const [ selected, setSelected ] = useState(0);

    const handleSubmenuEditTool = handleSubmenuTool(id);

    function pressSubmenuEditTool(data, newSelected) {

        if (newSelected === selected) newSelected = false;

        setSelected(newSelected);

        handleSubmenuEditTool(data, {
            shape: newSelected,
        });
    }
    
    return (
        <EditorContext.Consumer>
            {(data) => (
                <View style={styles.container}>
                    <Button
                        accessoryLeft={Square}
                        size={'giant'}
                        style={style}
                        active={selected === 0}
                        onPress={() => pressSubmenuEditTool(data, 0)}
                    />
                    <Button
                        accessoryLeft={Circle}
                        size={'giant'}
                        style={style}
                        active={selected === 1}
                        onPress={() => pressSubmenuEditTool(data, 1)}
                    />
                    <Button
                        accessoryLeft={Hand}
                        size={'giant'}
                        act
                        style={{
                            ...style,
                            paddingVertical: 7.5,
                        }}
                        active={selected === 2}
                        onPress={() => pressSubmenuEditTool(data, 2)}
                    /> 
                </View>
            )}
        </EditorContext.Consumer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
})