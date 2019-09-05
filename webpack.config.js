const webpack = require('webpack')
const path = require('path');

const srcPath = path.join(__dirname, '/src')
const buildFolder = path.join(__dirname, '/dist')

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const cleanPlugin = new CleanWebpackPlugin({
  cleanOnceBeforeBuildPatterns: ['!.gitkeep', '!.well-known', '!favicon.ico']
})

const extractStylePlugin = new MiniCssExtractPlugin({
  filename: '[name]-[contenthash].css',
  chunkFilename: '[name]-[contenthash].css'
})

const htmlPlugin = new HtmlWebpackPlugin({
  // hash: true,
  filename: 'index.html',
  template: './index.html'
})

function getPlugins (NODE_ENV) {
  // Common plugins for all conf
  const plugins = [
    htmlPlugin,
    extractStylePlugin // extract CSS and Less
  ]

  // Env specific plugins
  switch (NODE_ENV) {
    case 'development':
      plugins.push(new webpack.NamedModulesPlugin())
      plugins.push(new webpack.LoaderOptionsPlugin({ debug: true }))
      plugins.push(cleanPlugin)
      plugins.push(new HardSourceWebpackPlugin())
      return plugins

    case 'production':
      plugins.push(new webpack.IgnorePlugin(/\.\/dev/, /\/config$/))
      return plugins
  }
}

function getRules (NODE_ENV) {
  const rules = [
    { test: /\.html$/, use: ['html-loader'] },
    {
      test: /\.(js|jsx)$/,
      include: [path.resolve(srcPath)],
      use: ['babel-loader']
    },
    { test: /\.(jpe?g|png|gif|svg)$/i, use: ['url-loader?limit=1000'] },
    { test: /\.mp4$/, use: ['file-loader'] }
  ]

  switch (NODE_ENV) {
    case 'development':
      rules.push({ test: /\.css$/, use: ['style-loader', 'css-loader?sourceMap'] })
      rules.push({ test: /\.scss$/, use: ['style-loader', 'css-loader?sourceMap', 'sass-loader'] })
      return rules

    case 'production':
      rules.push({
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap']
      })
      rules.push({
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap', 'sass-loader']
      })
      return rules
  }
}

const NODE_ENV = 'development'
const main = ['@babel/polyfill', './index.js']

module.exports = {
  mode: NODE_ENV === 'production' ? 'production' : 'development',
  context: srcPath,
  entry: { main },
  devtool: 'source-map',
  output: {
    path: buildFolder,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    strictExportPresence: true,
    rules: getRules(NODE_ENV)
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.json', '.js', '.jsx']
  },
  plugins: getPlugins(NODE_ENV),
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
    dgram: 'empty'
  },
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    useLocalIp: true,
    port: 1313,
    contentBase: buildFolder
  },
  watch: NODE_ENV === 'development'
}
