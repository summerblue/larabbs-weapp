const path = require('path');
const DefinePlugin = require('@wepy/plugin-define');
const PluginUglifyjs = require('@wepy/plugin-uglifyjs');
var prod = process.env.NODE_ENV === 'production';

module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: !prod,
  static: ['./src/assets'],
  build: {
  },
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    less: {
      compress: prod
    },
    babel: {
      sourceMap: true,
      presets: [
        '@babel/preset-env'
      ],
      plugins: [
        '@wepy/babel-plugin-import-regenerator'
      ]
    }
  },
  plugins: [
    DefinePlugin({
      API_URL: prod ? '"https://weapp.liyu.wiki/api/v1/"' : '"http://larabbs.test/api/v1/"',
    }),
    PluginUglifyjs({
    // options
    })
  ],
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

