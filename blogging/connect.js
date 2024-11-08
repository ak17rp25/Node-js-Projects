const mongoose = require('mongoose');

async function createConnection(url){
    return mongoose.connect(url);
}

module.exports = {createConnection};