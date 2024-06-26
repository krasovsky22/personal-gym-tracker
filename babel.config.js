module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['nativewind/babel'],
      [
        'module-resolver',
        {
          alias: {
            '@lib': './lib',
            '@hooks': './hooks',
            '@stores': './stores',
            '@models': './models',
            '@assets': './assets',
            '@components': './components',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
      ['react-native-reanimated/plugin'],
    ],
  };
};
