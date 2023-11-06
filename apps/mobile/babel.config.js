module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      "expo-router/babel",
      [
        "module-resolver",
        {
          alias: {
            "@lib": "./lib",
            "@hooks": "./hooks",
            "@stores": "./stores",
            "@models": "./models",
            "@components": "./components",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
    ],
  };
};
