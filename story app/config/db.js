const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });
        console.log(`Data base is connected on host ${conn.connection.host}...`)
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;