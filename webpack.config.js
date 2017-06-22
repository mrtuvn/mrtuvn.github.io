if(process.env.NODE_ENV === 'development'){
  var loaders = ['react-hot','babel']
} else {
  var loaders = ['babel']
}


var config = {
  devtool: 'eval',
  entry: './app/main.js',
  devServer: {
      inline: true,
      contentBase: './app',
      port: 8080
   },
  output: {
    path: __dirname + '/app/dist',
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
       {
         test: /\.js$/,
         loaders: loaders,
         exclude: /node_modules/,
         query: {
               presets: ['es2015', 'react']
         }
       }
    ]
  }
};


module.exports = config;