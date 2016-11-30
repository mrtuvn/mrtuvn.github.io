var config = {
   entry: './app/main.js',
	
   output: {
      path:'./app',
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      contentBase: './app',
      port: 8080
   },
	
   module: {
      loaders: [
         {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel',
				
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;