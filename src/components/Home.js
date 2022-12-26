import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Home = () => {

    const [getUserData, setUserData] = useState([])
    console.log(getUserData);

    const getData = async (e) => {

        const res = await fetch('https://crud-server-8fzm.onrender.com/getdata', {
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
            setUserData(data)
            console.log(data);
        }

    }
    useEffect(() => {
        getData()
    }, [])

    const deleteUser = async (id) => {
        const res2 = await fetch(`https://crud-server-8fzm.onrender.com/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const deletedata = await res2.json()
        console.log(deletedata)

        if (res2.status === 404 || !deletedata) {
            console.log('error')
        } else {
            console.log("user deleted");
            getData()
        }

    }

    return (
        <div>
            <div className='mt-5'>
                <div className="container">
                    <div className="add_btn mt-2">
                        <NavLink to="/register" className='btn btn-primary mb-2'><AddIcon />Add Data</NavLink>
                    </div>
                    <table className="table  table-striped">
                        <thead>
                            <tr className='table-dark'>
                                <th scope="col">Id</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Job</th>
                                <th scope="col">Number</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {getUserData.map((user, id) => {
                                return (
                                    <>
                                        <tr>
                                            <th scope="row">{id + 1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.work}</td>
                                            <td>{user.mobile}</td>
                                            <td className='d-flex justify-content-between'>
                                                <NavLink to={`view/${user._id}`} ><button className='btn btn-success'><RemoveRedEyeIcon /></button></NavLink>
                                                <NavLink to={`edit/${user._id}`} ><button className='btn btn-primary'><EditIcon /></button></NavLink>
                                                <button className='btn btn-danger' onClick={() => deleteUser(user._id)}  ><DeleteIcon /></button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Home