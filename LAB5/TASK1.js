import os from 'os'
function memoryUsage(){
    const tm = os.totalmem()
    const fm = os.freemem()
    const usedm = tm-fm
    const fmper = (fm/tm)*100
    console.log(`Free memory : ${fm/1024**3} GB`)
    console.log(`Used memory : ${usedm/1024**3} GB`)
    console.log(`Free memory percentage: ${fmper.toFixed(3)} %`)
}
setTimeout(memoryUsage,5000)