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

            if (state.history.length > 0) state.history.forEach(editAction => editAction.active = false);
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