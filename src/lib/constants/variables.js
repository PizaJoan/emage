import { Dimensions } from 'react-native';
const RNFS = require('react-native-fs');

export const appDownloadFolder = RNFS.DownloadDirectoryPath + '/Emage';
export const imageWidth = 300;
export const imageHeight = 450;
export const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
export const screenMidWidth = screenWidth / 2;
export const screenMidHeight = screenHeight / 2;

export const imageFormats = [
    'jpg',
    'png',
    'webp',
]

export const imageFormatsEquivalences = {
    jpg: 3,
    png: 4,
    webp: 6,
}
