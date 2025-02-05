import os from 'os';
function upTimeDisplay(){
    const uptime = os.uptime();
    console.log(`Days : ${Math.floor(uptime/(24*60*60))}`);
    console.log(`Hours : ${Math.floor((uptime%(24*60*60))/3600)}`);
    console.log(`Minutes : ${Math.floor((uptime%3600)/60)}`);
}
upTimeDisplay();