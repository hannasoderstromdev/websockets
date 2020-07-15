const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Machine = new Schema({
    osType: String,
    upTime: Number,
    freeMem: Number,
    totalMem: Number,
    usedMemPercentage: Number,
    cpuModel: String,
    cpuSpeed: Number,
    numCores: Number,
    cpuAverage: {
        idle: Number,
        total: Number,
    }, 
    cpuLoad: Number,
    macA: String, 
})

module.exports = mongoose.model('Machine', Machine)
