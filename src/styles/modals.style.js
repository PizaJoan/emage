import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
        width: '75%',
    },
    card: {
        flex: 1,
        margin: 2,
        borderColor: 'transparent',
        borderRadius: 10,
    },
    text: {
        fontFamily: 'Roboto-Bold',
        marginBottom: 25,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 25,
    },
});