import React from 'react';
import './css/navbar.css';
import Button from '@mui/material/Button';
import {db} from '../firebase'
import {updateDoc,doc} from 'firebase/firestore';



const Navbar = (props) => {

    //setting up a funtion that will logout
  const updateIsloggFlase=async()=>{
    const userDoc = doc(db,'islogger', 'gWbtK5zR5u3bOS2M3a6u');
        await updateDoc(userDoc, {islogged:false})
        alert('suceess ful')
       props.loggingstate(false);
  }


    return (
        <div className="Navbar_div">
            <div className="Navbar_logo">
            <h1>CRUD-APP</h1>
            <p>BY MUHAMMAD ARSLAN</p>
            </div>

            <Button className='NavbarBtns'  variant="contained" onClick={props.addUserFunc}>ADD USER</Button>
            <Button className='NavbarBtns' onClick={updateIsloggFlase} style={{backgroundColor:'#ff0000d4'}} variant="contained">LOGOUT</Button>

            
        </div>
    )
}

export default Navbar;
