// babel.config.js
module.exports = function (api) {
  api.cache(true);
  const isTest = api.env('test');

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      // Disable NativeWind's Babel preset during Jest runs to avoid
      // `_ReactNativeCSSInterop` being injected into jest.mock factories.
      // Jest forbids out-of-scope captures in mock factories.
      !isTest && 'nativewind/babel',
    ].filter(Boolean),
  };
};
