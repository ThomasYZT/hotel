'use strict'
const utils = require('./utils')
const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction,
    extract: isProduction
  }),
  cssSourceMap: isProduction,
  cacheBusting: true,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
