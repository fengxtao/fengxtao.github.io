const fs = require('fs')
const execSync = require('child_process').execSync;
const path = require('path')
const pwd = process.cwd();

    //删除dist目录
    if( fs.existsSync( process.cwd()+'/dist' ) ){
        execSync(`rm -rf ${process.cwd()}/dist`,function(error,stdout,stderr){
            if (error) {
            console.error(`执行的错误: ${error}`);
            return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    }
    // //重命名 preview 为dist
    fs.renameSync( process.cwd()+'/preview', 'dist', function(err) {
        console.log('md-html 产出到dist:err',err)
        if (!err) {
        console.log("md-html 产出到dist");
        }
    })

    let titles=[];
    const htmlFilesPath=pwd+'/dist';
    if( fs.existsSync( htmlFilesPath ) ) {
        let stats = fs.statSync( htmlFilesPath )
        if( stats.isDirectory() ){
            var dir=fs.readdirSync(htmlFilesPath);
            console.log("dir==:",dir)
            dir.forEach(( dir_file )=>{
                dir_file_name = dir_file.substring(0,dir_file.lastIndexOf('.')); 
                dir_file_last = dir_file.split(".").pop();
                if(dir_file_last === 'html'){
                    titles.push({
                        src:path.join('dist',dir_file),
                        title:dir_file_name
                    })
                }
            })
        }
    };
    console.log("catalogue", JSON.stringify(titles))
    fs.writeFile(pwd + '/src/catalogue.json', JSON.stringify(titles), {  }, function(e){
        console.log('目录文件已生成')
    })
