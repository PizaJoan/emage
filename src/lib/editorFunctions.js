
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

                state.history[editActionIndex].active = true;
            }
        } else {

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