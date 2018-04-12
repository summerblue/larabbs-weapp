const path = require('path')
var prod = process.env.NODE_ENV === 'production'

module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: !prod,
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js')
    }
  },
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy'],
    modules: ['node_modules']
  },
  compilers: {
    less: {
      compress: prod
    },
    /* sass: {
      outputStyle: 'compressed'
    }, */
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions'
      ]
    }
  },
  plugins: {
    replace: [{
      filter: /moment\.js$/,
      config: {
        find: /([\w\[\]a-d\.]+)\s*instanceof Function/g,
        replace: function (matchs, word) {
          return ' typeof ' + word + " ==='function' "
        }
      }
    }, {
      filter: /\.js$/,
      config: {
        find: /__BASE_URL__/g,
        replace: prod ? "'https://weapp.laravel-china.org/api'" : "'http://larabbs.test/api'"
      }
    }]
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

if (prod) {
  // 压缩sass
  // module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {
      }
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    },
    replace: [{
      filter: /moment\.js$/,
      config: {
        find: /([\w\[\]a-d\.]+)\s*instanceof Function/g,
        replace: function (matchs, word) {
          return ' typeof ' + word + " ==='function' "
        }
      }
    }, {
      filter: /\.js$/,
      config: {
        find: /__BASE_URL__/g,
        replace: prod ? "'https://weapp.laravel-china.org/api'" : "'http://larabbs.test/api'"
      }
    }]
  }
}
