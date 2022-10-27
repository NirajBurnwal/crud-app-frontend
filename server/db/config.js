const mongoose = require ("mongoose")

const URI = process.env.DATABASE

mongoose.connect( URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("connection start"))
.catch((error)=>console.log(error.message))