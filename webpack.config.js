const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
   entry: './src/js/main.js',
   devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 9000,
      open: true
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].bundle.js',
   },
   devtool: 'source-map',
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env']
               }
            }
         },
         {
            test: /\.html$/,
            exclude: /node_modules/,
            use: [
               {
                  loader: 'html-loader',
                  options: {
                     interpolate: true //para incluir partials
                  }
               }
            ]
         },
         {
            test: [/.css$|.scss$|.sass$/], // soporte para archivos css y scss
            use: [
               MiniCssExtractPlugin.loader,
               {
                  loader: 'css-loader',
                  options: {
                     sourceMap: true
                  }
               },
               'resolve-url-loader',
               {
                  loader: 'sass-loader',
                  options: {
                     sourceMap: true
                  }
               }
            ],
         },
         {
            test: /\.(png|svg|jpe?g|gif|webp)$/i,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     name: '[name].[ext]',
                     outputPath: 'img',
                     publicPath: '/img'
                  }
               },
               {
                  loader: 'image-webpack-loader',
                  options: {
                     bypassOnDebug: true,
                     mozjpeg: {
                        progressive: true,
                        quality: 65
                     },
                     optipng: {
                        enabled: true
                     },
                     pngquant: {
                        quality: [0.65, 0.90],
                        speed: 4
                     }
                  }
               }
            ],
         },
         {
            test: /\.(pdf)$/i,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     name: '[name].[ext]',
                     outputPath: 'files',
                     publicPath: '/files'
                  }
               }
            ],
         },
         {
            test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            use: 'file-loader'
         }
      ],
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: "css/[name].bundle.css",
         chunkFilename: "[id].css"
      }),
      new HtmlWebpackPlugin({
         filename: 'index.html',
         template: './src/index.html',
         favicon: './src/img/iconTitle.png'
      }),
   ]
}