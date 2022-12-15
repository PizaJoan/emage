import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    bringFront: {
        zIndex: 999,
    },
    layout: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1
    },
    editorMenu: {
        display: 'flex',
        height: 77,
        position: 'absolute',
        bottom: 0
    },
    editorTool: {
        borderRadius: 0,
        paddingHorizontal: 11,
    },
    toolSettings: {
        height: 77,
        position: 'absolute',
        bottom: 76.9,
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
});
