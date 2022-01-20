const mongoose=require('mongoose')
//Storing my database URI in`.env` file 
// as `MONGO_URI`. Connect to the database using `mongoose.connect(<Your URI>)`
const connectionDBs=async()=>{
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('Connected to DBs.....'))
    .catch(err=>console.log('err in the connection',err));
  }
connectionDBs();



