module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 160,
      selectorBlackList: ['.un-'],
      propList: ['*'],
      exclude: /node_modules|folder_name/i,
      minPixelValue: 2
    }
  }
}
