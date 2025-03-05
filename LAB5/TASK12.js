import os from 'os'
console.log(`Host name: ${os.hostname()}`)
console.log(`Platform: ${os.platform()}`)
console.log(`Uptime: ${os.uptime()}`)
console.log(`Total memory: ${os.totalmem()/(1024*1024)} MB`)
console.log(`Free memory: ${os.freemem()/(1024*1024)} MB`)