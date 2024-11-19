const cluster = require('cluster');
const os = require('os');
const express = require('express');

const app = express();
const port = 3000;

const totalCpus = os.cpus().length;
if(cluster.isPrimary){
    console.log('Primary process started',process.pid);
    for(let i=0; i<totalCpus; i++){
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}else{
    app.get('/',(req,res)=>{
        res.send(`Worker ${process.pid} is running`);
    })
    app.listen(port, ()=>{
        console.log(`Worker ${process.pid} is listening on port ${port}`);
    });
}