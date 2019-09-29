const fs = require("fs");
const execSync = require('child_process').execSync;
const pwd = process.cwd();

const copy = require('../util').copy;
const distPath = pwd + '/outdist/img';
const srcPath = pwd + '/src/img';

if( fs.existsSync(distPath) ){
    execSync( `rm -rf ${distPath}` ,function(error,stdout,stderr){
        if (error) {
          console.error(`执行的错误: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    })
}

copy(srcPath,distPath);
 