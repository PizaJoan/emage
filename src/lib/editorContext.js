import { createContext } from 'react';

export default EditorContext = createContext({
    activeTool: false,
    history: [],
    updateState: () => {},
    imageWidth: 0,
    imageHeight: 0,
});