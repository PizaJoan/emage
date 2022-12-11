import { View, StyleSheet } from 'react-native';

export default function CutToolShape({ id }) {

    return (
        <View 
            style={style.square}
        />
    );
}

const styles = StyleSheet.create({
    square: {
        borderColor: 'white',
        borderWidth: 2
    }
})