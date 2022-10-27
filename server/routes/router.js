const express = require("express")
const router = express.Router()

const users = require("../model/userSchema")

// router.get('/' , (req, res)=>{
//     console.log("connected");
// })

// @register a user
router.post('/register', async (req,res)=>{

    // console.log(req.body);
    // res.json(req.body)
    
    // object destructuring - whatever details we'll send, will be stored in resp variable
    const {name,email,age,mobile,work,add,desc} = req.body

    // checking if user filled all the fields or not
    if( !name || !email || !age || !mobile || !work || !add || !desc ){
        res.status(404).json("Please fill all the fields")
    }

    try {
        // checking, user aleady exists or not
        const preUser = await users.findOne({email:email})
        console.log(preUser)

        if(preUser){
            res.status(404).json("User already exists")
        }else {
            // adding new user
            const addUser = new users({name,email,age,mobile,work,add,desc})
            await addUser.save()
            res.status(201).json(addUser) //reflecting user's details on console/postman
            console.log(addUser)
        }
    } catch (error) {
        res.status(404).json(error)
    }
})

// @Getting details of user
router.get('/getdata', async(req,res)=>{
    try {
        const userdata = await users.find()
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(404).json(error)
    }
})

// @Getting individual details of a user
router.get('/viewdetails/:id', async(req, res)=>{
    try {
        console.log(req.params) //{ id: '6348c5719792e5c19cf5dbef' }
        const {id} = req.params
        const individualDetails = await users.findById({_id:id})
        res.status(201).json(individualDetails)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
})

// @ update user's data
router.patch('/updateuser/:id', async(req,res)=>{
    try {
        const {id} = req.params

        const updatedUser = await users.findByIdAndUpdate(id, req.body, {
            new:true
        })
        console.log(updatedUser);
        res.status(201).json(updatedUser)
    } catch (error) {
        res.status(404).json(error)
    }
})


// @delete a user
router.delete('/deleteuser/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const deleteUser = await users.findByIdAndDelete({_id:id})
        console.log(deleteUser);
        res.status(201).json(deleteUser)
    } catch (error) {
        res.status(404).json(error)
    }
})


module.exports = router