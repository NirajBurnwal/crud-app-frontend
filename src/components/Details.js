import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';


const Details = () => {

    const navigate = useNavigate()

    const { id } = useParams("")
    const [getUserData, setUserData] = useState([])
    console.log(getUserData);

    const getData = async (e) => {

        const res = await fetch(`https://app-crud-react-js.herokuapp.com/viewdetails/${id}`, {
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
        const res2 = await fetch(`https://app-crud-react-js.herokuapp.com/deleteuser/${id}`, {
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
            navigate('/')
        }

    }

    return (
        <div className='container mt-3'>
            <h1 style={{ fontWeight: 400 }}>Welcome Niraj Burnwal</h1>

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <img src="/profile.png" style={{ width: 50 }} alt="profile" />
                            <h3 className='mt-4'>Name: <span>{getUserData.name}</span></h3>
                            <h3 className='mt-3'>Age: <span>{getUserData.age}</span></h3>
                            <p className='mt-3'><MailOutlineIcon />Email: <span>{getUserData.email}</span></p>
                            <p className='mt-3'><WorkIcon />Occupation: <span>{getUserData.work}</span> </p>
                        </div>
                        <div className="right_view col-lg-6 col-md-6 col-12 ">
                            <div className="add_btn mb-5">
                                <NavLink to={`/edit/${getUserData._id}`} ><button className='btn btn-primary mx-2'><EditIcon /></button></NavLink>
                                <button className='btn btn-danger' onClick={() => deleteUser(getUserData._id)}  ><DeleteIcon /></button>
                            </div>
                            <p className='mt-4'><PhoneAndroidOutlinedIcon /> Mobile: <span>{getUserData.mobile}</span></p>
                            <p className='mt-3'><LocationOnOutlinedIcon /> Location: <span>{getUserData.add}</span></p>
                            <p className='mt-3'>Description: <span>{getUserData.desc}</span></p>
                        </div>
                    </div>
                </CardContent>
            </Card>


        </div>
    )
}

export default Details