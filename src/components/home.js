import React , {useState,useEffect} from 'react';
import { db } from '../firebase'; 
import {collection,getDocs,addDoc,updateDoc,doc,deleteDoc} from 'firebase/firestore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../components/css/home.css';
import personLogo from '../images/userAvatar.jpg';
import Navbar from './Navbar';
import Input from '@mui/material/Input';



const Home = (props) => {
    const [Users,setUsers]= useState([]);
    const userCollectionRef = collection(db,"users");

    
    



    //STATES TO STORE NEW USER'S DATA
    const [NewName,SetNewName]= useState('');
    const [NewEmail,SetNewEmail]= useState('');
    const [NewAge,SetNewAge]= useState(0);
    const [NewContact,SetNewContact]= useState('');



    //STATES TO STORE UPDATED USER'S DATA
    const [UpdtId,SetUpdtId]= useState('');
    const [UpdName,SetUpdName]= useState('');
    const [UpdEmail,SetUpdEmail]= useState('');
    const [UpdAge,SetUpdAge]= useState(0);
    const [UpdContact,SetUpdContact]= useState('');



    //FUNCTIO TO ADD A USER
    const addUserBtnFunction=()=>{
        document.getElementById('create_user_div').style.display='flex';
    }

    const createUser = async(e)=>{
        e.preventDefault();
        await addDoc(userCollectionRef,{Name:NewName, Email:NewEmail,Age:NewAge,Contact:NewContact});
        alert('USER ADDED');
       document.getElementById('create_user_div').style.display='none';
    
    }

    //FUNCTIO TO UPDATE A USER
    const updateUser= async (e)=>{
        e.preventDefault();
        const userDoc = doc(db,'users', UpdtId);
        await updateDoc(userDoc, {Name: UpdName, Email: UpdEmail, Age:UpdAge,Contact:UpdContact})
        alert("User updated");
        document.getElementById('update_user_div').style.display='none';

    }
    const updateUserForm=(person)=>{
        console.log(person);
        SetUpdName (person.Name);
        SetUpdEmail(person.Email);
        SetUpdAge (person.Age);
        SetUpdContact(person.Contact);
        SetUpdtId(person.id);
        document.getElementById('update_user_div').style.display='block';
        
       

    };


    const deleteUser=async(id)=>{
        const userDoc = doc(db,'users', id);
        await deleteDoc(userDoc);
        alert("User DELETED");


    }



    useEffect(()=>{
        const getUsers=async()=>{
            const data = await getDocs(userCollectionRef);
            setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})));

        };
        getUsers();
    },[deleteUser,updateUser,createUser])



    return (
        <>
        <Navbar loggingstate={props.loggerstate} addUserFunc={addUserBtnFunction}/>

        
        
        <div className='homeMainDiv'>
        
           
           
            {/* DIV TO ADD A USER */}
         
                    
                    <form className='add_user_div' id='create_user_div' style={{ display:'none'}}>
                    <h1>ADD USER</h1>
                        <TextField required helperText="Please enter your Name" id="outlined-basic " className='add_user_comp'  label="NAME" variant="outlined" type='text' onChange={(e)=>{SetNewName(e.target.value)}}/>
                        <TextField required helperText="Please enter your Email" id="outlined-basic " className='add_user_comp'  label="EMAIL" variant="outlined" type='text' onChange={(e)=>{SetNewEmail(e.target.value)}}/>
                        <TextField required helperText="Please enter your Age" id="outlined-basic " className='add_user_comp'  label="AGE" variant="outlined" type='number' onChange={(e)=>{SetNewAge(e.target.value)}}/>
                        <TextField required helperText="Please enter your Contact" id="outlined-basic " className='add_user_comp'  label="CONTACT" variant="outlined" type='text' onChange={(e)=>{SetNewContact(e.target.value)}}/>
                        <Button  className='add_user_comp' onClick={createUser} type='button' variant="contained">ADD USER</Button>
                        <Button  className='add_user_comp' onClick={()=>{document.getElementById('create_user_div').style.display='none'}} variant="outlined">CANCEL</Button>
                    </form>
                    

               

            {/* DIV TO UPDATE A USER */}
            
                 <form id="update_user_div"  className='add_user_div' style={{display:'none',zIndex:3}}>
                    <h1>UPDATE USER</h1>
                    <p>NAME: </p>   <input required type='text'  id='updt_user_name' defaultValue={UpdName} onChange={(e)=>{SetUpdName(e.target.value)}}></input>
                        <p>EMAIL: </p>  <input required type='text' id='updt_user_email' defaultValue={UpdEmail} onChange={(e)=>{SetUpdEmail(e.target.value)}}></input>
                        <p>AGE:</p>     <input required type='number' id='updt_user_age' defaultValue={UpdAge} onChange={(e)=>{SetUpdAge(e.target.value)}}></input>
                        <p>CONTACT: </p><input required type='text' id='updt_user_contact' defaultValue={UpdContact} onChange={(e)=>{SetUpdContact(e.target.value)}}></input><br/>
                        <Button variant="contained" onClick={updateUser} type='button' style={{margin:'10px 2px'}}>UPDATE</Button>
                        <Button variant="contained" style={{margin:'10px 2px'}} onClick={()=>{document.getElementById('update_user_div').style.display='none'}}>CANCEL</Button>
                </form>

                    

        
            
            {Users.length!=0?<div className='showUsers'> {Users.map((user)=>{
                return(
                
                    
                    <div className='users_div'>
                     
                        <div className="card">
                        <img src={personLogo} id='userimg' alt="not loaded" style={{width:'60%'}}/>
                        <h1>{user.Name}</h1>
                        <p className="title">{user.Email}</p>
                        <p>AGE: {user.Age}</p>
                        <p>CONTACT: {user.Contact}</p>
                        <p style={{width:'100%'}}><button id='card_btn' onClick={()=>updateUserForm(user)}> <i style={{color:'white'}} class="fa fa-edit"></i> </button>
                        <button id='card_btn' onClick={()=>deleteUser(user.id)}><i style={{color:'white'}} class="fa fa-trash"></i></button></p>
                        </div>                        
                    </div>
                        
                )
            })}</div>:<div class="loader"></div>}
            
            

            
        </div>
        </>
    )
}

export default Home;


