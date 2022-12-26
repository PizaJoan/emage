
jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
  
    // The mock for `call` immediately calls the callback which is incorrect
    // So we override it with a no-op
    // Reanimated?.default?.call = jest.fn();
  
    return Reanimated;
});
jest.mock('react-native-image-picker',()=>{
    return{
        launchCamera:jest.fn(),
        launchImageLibrary:jest.fn()
    }
});

jest.mock('@shopify/react-native-skia', () => require('@shopify/react-native-skia/jestSetup'));

jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

jest.mock('react-native-fs', () => ({
    mkdir: jest.fn(),
    moveFile: jest.fn(),
    copyFile: jest.fn(),
    pathForBundle: jest.fn(),
    pathForGroup: jest.fn(),
    getFSInfo: jest.fn(),
    getAllExternalFilesDirs: jest.fn(),
    unlink: jest.fn(),
    exists: jest.fn(),
    stopDownload: jest.fn(),
    resumeDownload: jest.fn(),
    isResumable: jest.fn(),
    stopUpload: jest.fn(),
    completeHandlerIOS: jest.fn(),
    readDir: jest.fn(),
    readDirAssets: jest.fn(),
    existsAssets: jest.fn(),
    readdir: jest.fn(),
    setReadable: jest.fn(),
    stat: jest.fn(),
    readFile: jest.fn(),
    read: jest.fn(),
    readFileAssets: jest.fn(),
    hash: jest.fn(),
    copyFileAssets: jest.fn(),
    copyFileAssetsIOS: jest.fn(),
    copyAssetsVideoIOS: jest.fn(),
    writeFile: jest.fn(),
    appendFile: jest.fn(),
    write: jest.fn(),
    downloadFile: jest.fn(),
    uploadFiles: jest.fn(),
    touch: jest.fn(),
    MainBundlePath: jest.fn(),
    CachesDirectoryPath: jest.fn(),
    DocumentDirectoryPath: jest.fn(),
    ExternalDirectoryPath: jest.fn(),
    ExternalStorageDirectoryPath: jest.fn(),
    TemporaryDirectoryPath: jest.fn(),
    LibraryDirectoryPath: jest.fn(),
    PicturesDirectoryPath: jest.fn(),
}));

jest.mock('@react-native-camera-roll/camera-roll', () => ({
    deletePhotos: jest.fn(),
    saveToCameraRoll: jest.fn(),
    getPhotos: jest.fn(),
}));

jest.mock('@miblanchard/react-native-slider', () => ({
    Slider: jest.fn(),
}));

jest.mock('react-native-vector-image', () => ({
    default: jest.fn(),
}));

jest.useFakeTimers();