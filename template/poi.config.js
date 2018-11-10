const isProd = process.env.NODE_ENV === 'production'

// Disable sourcemaps in production build
const sourceMap = !isProd

module.exports = {
  entry: './src/index.js',
  sourceMap
}
