module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@store': './src/store',
          '@navigators': './src/navigators',
          '@screens': './src/screens',
          '@services': './src/services',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@types': './src/types',
          '@containers': './src/containers',
        },
      },
    ],
  ],
};
