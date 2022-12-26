module.exports = {
    preset: 'react-native',
    setupFiles: [
        "<rootDir>/jest/setup.js",
        "./node_modules/react-native-gesture-handler/jestSetup.js",
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/jest/assetsTransformer.js",
    },
}