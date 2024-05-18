module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      //   ['expo-router/babel'],
      ['react-native-reanimated/plugin'],
      [
        'module-resolver',
        {
          alias: {
            '@lib': './lib',
            '@hooks': './hooks',
            '@stores': './stores',
            '@models': './models',
            '@components': './components',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
    ],
  };
};
