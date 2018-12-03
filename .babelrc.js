module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV + process.env.BABEL_ENV)
  const moduleResolverOptions = {
    root: [],
    extensions: ['.js', '.ios.js', '.android.js'],
    alias: {'@': './src/'}
  }
  if (process.env.NODE_ENV === 'e2e')
    moduleResolverOptions.root.push('./__mocks__')
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      'lodash',
      'react-require',
      '@babel/plugin-transform-flow-strip-types',
      ['@babel/plugin-proposal-class-properties', {loose: true}],
      ['@babel/plugin-syntax-decorators', {legacy: true}],
      ['module-resolver', moduleResolverOptions],
      [
        'transform-inline-environment-variables',
        {
          include: [
            'NODE_ENV',
            'GOOGLE_PLACES_API_KEY',
            'MESSENGER_RECEIVER_ID',
            'API_URL',
            'IOS_API_URL',
            'ANDROID_API_URL',
            'CDN_URL',
            'IOS_CDN_URL',
            'ANDROID_CDN_URL',
            'APOLLO_ENGINE_URL',
            'IOS_APOLLO_ENGINE_URL',
            'ANDROID_APOLLO_ENGINE_URL',
            'WEB_SOCKET_URL',
            'IOS_WEB_SOCKET_URL',
            'ANDROID_WEB_SOCKET_URL'
          ]
        }
      ]
    ],
    env: {
      development: {
        plugins: ['@babel/plugin-transform-react-jsx-source']
      }
    }
  }
}
