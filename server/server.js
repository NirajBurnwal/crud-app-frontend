require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")

require("./db/config")
require("./model/userSchema")
const router = require("./routes/router")

app.use(cors())
app.use(express.json())
app.use(router)

app.get('/', (req, res)=>{
    res.json("server started")
})

const port = process.env.PORT || 5001

app.listen(port, ()=> {
    console.log(`server started on port ${port}` );
})