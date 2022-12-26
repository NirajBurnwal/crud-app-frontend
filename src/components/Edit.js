import React, { useState, useEffect } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'



const Edit = () => {

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

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setInput((previous) => {
      return {
        ...previous,
        [name]: value
      }
    })
  }

  const { id } = useParams("")

  const getData = async (e) => {

    const res = await fetch(`http://localhost:5001/viewdetails/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await res.json()
    console.log(data)

    if (res.status === 404 || !data) {
      console.log("error");
    } else {
      setInput(data)
      console.log(data);
    }

  }
  useEffect(() => {
    getData()
  }, [])

  const updateUser = async (e) => {
    e.preventDefault();

    const { name, email, work, add, mobile, desc, age } = input;

    const res2 = await fetch(`http://localhost:5001/updateuser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, work, add, mobile, desc, age
      })
    });

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 404 || !data2) {
      alert("fill the data");
    } else {
      alert("data updated")
      navigate('/')
    }

  }


  return (
    <div className='container mt-3'>

      <form className='mt-4'>
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputName1" className="form-label">Name</label>
            <input type="text" name='name' value={input.name} onChange={onChangeHandler} className="form-control" id="exampleInputName1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">Email</label>
            <input type="email" name='email' value={input.email} onChange={onChangeHandler} className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">Age</label>
            <input type="Number" name='age' value={input.age} onChange={onChangeHandler} className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" className="form-label">Mobile</label>
            <input type="Number" name='mobile' value={input.mobile} onChange={onChangeHandler} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">Work</label>
            <input type="text" name='work' value={input.work} onChange={onChangeHandler} className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">Address</label>
            <input type="text" name='add' value={input.add} onChange={onChangeHandler} className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Description</label>
            <textarea name="desc" value={input.desc} onChange={onChangeHandler} className='form-control' id="" cols="30" rows="5"></textarea>
          </div>
          <button onClick={updateUser} type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>

    </div>
  )
}

export default Edit