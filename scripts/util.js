var child_process = require('child_process');

function copyIt(from, to) {
    child_process.spawn('cp', ['-r', from, to]);    
}
module.exports={
    copy:copyIt
};