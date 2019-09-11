const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const path = require('path');
const config = require('../webpack.config.dev.js');
const choosePort=require('./chose')
const isInteractive = process.stdout.isTTY;
const clearConsole=require('./clearConsole')
const chalk =require('chalk')
const openBrowser=require('./openBrowser')

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const options = {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    inline: true,
    // port: 3000,
    host: 'localhost:3000',
    disableHostCheck: true,
    open:true
};

choosePort(HOST,DEFAULT_PORT).then((port)=>{
    webpackDevServer.addDevServerEntrypoints(config, options);
    const compiler = webpack(config);
    const server = new webpackDevServer(compiler, options);
    
    server.listen(port, HOST, err => {
      if (err) {
        return console.log(err);
      }
      if (isInteractive) {
        clearConsole();
      }
      console.log(chalk.cyan('Starting the development server...\n'));
      openBrowser('http://localhost:'+port);
     
    });
})



