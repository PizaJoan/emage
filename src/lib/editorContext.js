import { createContext } from 'react';

export default EditorContext = createContext({
    activeTool: false,
    history: [],
    undoHistory: [],
    disabledUndo: true,
    disabledRedo: true,
    updateState: () => {},
    imageWidth: 0,
    imageHeight: 0,
});