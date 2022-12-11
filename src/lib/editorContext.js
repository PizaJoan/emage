import { createContext } from 'react';

export default EditorContext = createContext({
    activeTool: false,
    history: [],
    updateState: () => {},
});