import AsyncStorage from '@react-native-async-storage/async-storage';

async function setOrMergeItem(key, value, operation) {

    try {

        value = JSON.stringify(value);

        await AsyncStorage[operation](key, value);

    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function setItem(key, value) {

    let operation = 'setItem';

    const actualItem = JSON.parse(await AsyncStorage.getItem(key));

    if (
        null != actualItem &&
        typeof actualItem === 'object' &&
        !Array.isArray(value)
    ) operation = 'mergeItem';

    return await setOrMergeItem(key, value, operation);
}

export async function getItem(key) {

    try {

        return JSON.parse(await AsyncStorage.getItem(key));

    } catch (e) {
        console.log(e);
        throw e;
    }    
}

export async function removeItem(key) {

    await AsyncStorage.removeItem(key);
}