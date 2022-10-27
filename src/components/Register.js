import React, { useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Register = () => {
  
   
  const navigate = useNavigate()

  const [input, setInput] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    add: "",
    desc: ""
  })

  const setData = (e) => {
    console.log(e.target);
    const { name, value } = e.target
    setInput((preval) => {
      return {
        ...preval,
        [name]: value
      }
    })
  }

  const addInpData = async (e) => {
    e.preventDefault()

    const { name, email, age, mobile, work, add, desc } = input

    const res = await fetch('https://app-crud-react-js.herokuapp.com/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, age, mobile, work, add, desc })
    })

    const data = await res.json()
    console.log(data)

    if (res.status === 404 || !data) {
      alert("Please fill all the values")
      console.log("Please fill all the values");
    } else {
      alert("User added successfully")
      console.log("User added successfully");
      navigate('/')
    }

  }



  return (
    <div className='container mt-3'>
      <NavLink to="/">Home</NavLink>

      <form className='mt-4'>
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputName1" className="form-label">Name</label>
            <input type="text" name='name' value={input.name} onChange={setData} className="form-control" id="exampleInputName1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">Email</label>
            <input type="email" name='email' value={input.email} onChange={setData} className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">Age</label>
            <input type="Number" name='age' value={input.age} onChange={setData} className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" className="form-label">Mobile</label>
            <input type="Number" name='mobile' value={input.mobile} onChange={setData} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">Work</label>
            <input type="text" name='work' value={input.work} onChange={setData} className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">Address</label>
            <input type="text" name='add' value={input.add} onChange={setData} className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Description</label>
            <textarea name="desc" value={input.desc} onChange={setData} className='form-control' id="" cols="30" rows="5"></textarea>
          </div>
          <button type="submit" onClick={addInpData} className="btn btn-primary">Submit</button>
        </div>
      </form>

    </div>
  )
}

export default Register