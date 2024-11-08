const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const Tour = require('./../../models/tourModels')

dotenv.config({path :'./config.env'})

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() =>console.log("DB concoction successful!"));


// Read Json File
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));


// Import data into db
const importData = async () =>{
    try{
        await Tour.create(tours);
        console.log('Data successfully loaded!');
        process.exit();
    }catch(err){
        console.log(err);
    }
}        

// Delete Data into db
const deleteData = async()=>{
    try{
        await Tour.deleteMany();
        console.log('Data deleted!');
       process.exit();
    }catch(err){
        console.log(err);
    }
}
// console.log(process.argv);
if (process.argv[2] === "--import") {
    importData();
    } else if (process.argv[2] === "--delete") {
        deleteData();
        }