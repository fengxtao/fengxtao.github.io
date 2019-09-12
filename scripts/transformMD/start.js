const fs = require('fs')
const path =require ('path')
const execSync = require('child_process').execSync;

var is_open = false;
var markd_config = {
    debug: false,
  index: true
}

var pwd = process.cwd() 
function create(source_file_name,dest_file_path){
    // var source_file_name = pwd + '/' + source_file
    // var file_name = source_file_name.split('/').pop();;
    // var _file_name = file_name.substring(0,file_name.lastIndexOf('.')); 
    
    // var dest_file_path = pwd + '/preview/' + _file_name + '.html';
    
    // console.log('pwd=' + pwd);
    // console.log('source_file_name=' + source_file_name);
    // console.log('dest_file_path=' + dest_file_path);
    
    require('i5ting_toc')(pwd, source_file_name, dest_file_path, is_open, markd_config);
}
//函数可以返回当前正在执行的项目路径 
const distPath = process.cwd()+'/dist'
const srcPath = process.cwd()+'/src/source_files'

//删除dist目录
if( fs.existsSync( distPath ) ){
    execSync(`rm -r ${distPath}`,function(error,stdout,stderr){
        if (error) {
          console.error(`执行的错误: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
}

//sourceFileConfig 创建md 为html
const sourceFileConfig=require('./source.file.config.js')
sourceFileConfig.forEach((file)=>{
    const fileNamePath=srcPath+'/'+file
    if( !fs.existsSync( fileNamePath ) ) return;

    let stats = fs.statSync( fileNamePath )
    if( stats.isFile() ){
        var _file_name = file.substring(0,file.lastIndexOf('.')); 
        create( fileNamePath , distPath + '/' + _file_name + '.html' );
    }
    if( stats.isDirectory() ){
        var dir=fs.readdirSync(fileNamePath);
        dir.forEach(( dir_file )=>{
            var _file_name = dir_file.substring(0,dir_file.lastIndexOf('.')); 
            const dir_fileNamePath = fileNamePath + '/' +dir_file;
            create( dir_fileNamePath , distPath + '/'+ file + '_' + _file_name + '.html' );
        })
    }
})

//生成目录对象文件
setTimeout(()=>{
    let titles=[];
    const htmlFilesPath=pwd+'/dist';
    if( fs.existsSync( htmlFilesPath ) ) {
        let stats = fs.statSync( htmlFilesPath )
        if( stats.isDirectory() ){
            var dir=fs.readdirSync(htmlFilesPath);
            dir.forEach(( dir_file )=>{
                dir_file_name = dir_file.substring(0,dir_file.lastIndexOf('.')); 
                dir_file_last = dir_file.split(".").pop();
                if(dir_file_last === 'html'){
                    titles.push({
                        src:path.join('/dist',dir_file),
                        title:dir_file
                    })
                }
            })
        }
    };
    // console.log("catalogue", JSON.stringify(titles))
    fs.writeFile(pwd + '/src/catalogue.json', JSON.stringify(titles), {  }, function(e){
        console.log('目录文件已生成')
    })
},1000)





