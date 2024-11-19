const express = require('express');

const app = express();
const fs = require('fs');
const zlib = require('zlib');

const statusMonitor = require('express-status-monitor');
app.use(statusMonitor());

fs.createReadStream('./stream/sample.txt',"utf-8").pipe(zlib.createGzip()).pipe(fs.createWriteStream('./stream/sample.zip'));

app.get('/',(req,res)=>{
    const readStream = fs.createReadStream('./stream/sample.txt',"utf-8");
    readStream.on('data',(chunk)=>{
        res.write(chunk);
    })
    readStream.on('end',()=>{
        res.end();
    })
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});