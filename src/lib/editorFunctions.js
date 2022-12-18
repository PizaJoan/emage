import { CameraRoll } from '@react-native-camera-roll/camera-roll';
const RNFS = require('react-native-fs');

import { appDownloadFolder, imageFormatsEquivalences } from './constants/variables';


export function pressTool(key) {

    return function (state) {

        const data = {
            activeTool: true,
        }

        const editActionIndex = state.history.findIndex(editAction => editAction.key === key);

        if (~editActionIndex) {

            if (state.history[editActionIndex].active) {

                data.activeTool = false;
                state.history[editActionIndex].active = false;

            } else {

                state.history.forEach(editAction => editAction.active = false);
                state.history[editActionIndex].active = true;
            }
        } else {

            if (state.history.length > 0) {

                state.history.forEach(editAction => editAction.active = false);
            }
            
            state.disabledUndo = false;
            state.history.push({
                key: key,
                active: true,
            });
        }

        state.updateState({ ...state, ...data });
    }
}

export function handleSubmenuTool(key) {

    return function (state, data) {

        const editActionIndex = state.history.findIndex(editAction => editAction.key === key);

        state.history[editActionIndex].data = {
            ...state.history[editActionIndex].data,
            ...data,
        }

        state.updateState({ ...state });
    }
}

export function handleSaveImage(canvasRef, goHome) {

    return function (filename, format) {
        
        const editedImage = canvasRef.current.makeImageSnapshot();
        const bytes = editedImage.encodeToBase64(imageFormatsEquivalences[format], 100);
        
        return RNFS.exists(appDownloadFolder).then(exists => {
            
            if (!exists) {
                
                return Promise.resolve(RNFS.mkdir(appDownloadFolder).then(writeImage)).then(goHome);
                
            } else {
                
                return Promise.resolve(writeImage()).then(goHome);
            }
        });
        
        function writeImage() {
            
            const filePath = appDownloadFolder + `/${filename}.${format}`;
            
            return RNFS.writeFile(filePath, bytes, 'base64')
                .then(() => {
                    
                    CameraRoll.save(filePath, { type: 'photo' }).then(() => {
                        
                        RNFS.unlink(filePath).catch(console.log);
                    });
                    
                })
                .catch(console.log);
        }
    }
}

export function handleUndo(state) {

    const lastEdit = state.history.pop();

    if (lastEdit.active) {
        lastEdit.active = false;
        state.activeTool = false;
    }

    state.undoHistory.push(lastEdit);

    if (state.history.length < 1) state.disabledUndo = true;

    state.disabledRedo = false;

    state.updateState({ ...state});
}

export function handleRedo(state) {

    let lastUndo = state.undoHistory.pop();
    
    if (state.undoHistory.length < 1) state.disabledRedo = true;
    
    if (state.history.length > 0) {

        state.disabledUndo = false;

        const actualLast = state.history.findIndex(action => lastUndo.key === action.key && action.active);
        if (~actualLast) {
            
            lastUndo = {
                ...lastUndo,
                ...state.history[actualLast],
            }
            state.history.splice(actualLast);
        }
    }

    state.history.push(lastUndo);

    state.updateState({ ...state});
}