import { useState,useEffect } from "react";
import firebase from './firebase';
import Home from "./components/home";
import {db} from './firebase';
import {collection, getDocs,updateDoc,doc} from 'firebase/firestore';
import HomeHeader from "./components/homeHeader.js";
import './components/css/loginpage.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';



const App =()=>{

  const [Num,setNum]= useState('');
  const [Otp,setOtp]= useState('');
 
  
  //getting islogged boolean from db
  const [Logger,setLogger]= useState();
  const [Id,setId]= useState();
  const isloggCollectionRef = collection(db,"islogger");


  //setting up a funtion that will handle the islogg of db when OTP mathces fine
  const updateIsloggTrue=async()=>{
    console.log('updater logger running...')
    const userDoc = doc(db,'islogger', Id);
        await updateDoc(userDoc, {islogged:true})
      setLogger(true);
      document.getElementById('alertSucess').style.display='none';
      document.getElementById('alertSucess2').style.display='none';
      document.getElementById('alertError').style.display='none';
      document.getElementById('alertError2').style.display='none';
  }




  useEffect(()=>{
    console.log('running use effect')
        const getIslogger=async()=>{
            const islogBool = await getDocs(isloggCollectionRef);
            setLogger(islogBool.docs.map((doc)=>({...doc.data()})));
            const hereComesIslogger = islogBool.docs.map((doc)=>({...doc.data(),id:doc.id}));
            setLogger(hereComesIslogger[0].islogged);
            setId(hereComesIslogger[0].id);

            
            

        }
        getIslogger();
    },[])







  //STORING PHONE NUMBER IN STATE
  const handleChange = e =>{
    setNum(e.target.value);
  }
//STORING OTP IN STATE
  const handleChange2 = e =>{
    setOtp(e.target.value);
  }




//CONFIGURING CAPTCHA
  const configureCaptcha=()=>{
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log('recaptcha verified')
        onSignInSubmit();
      }
    });
  }



  //FUNCTION TO BE CALLED WHEN USER ENTERED THE PHONE NUMBER
  const  onSignInSubmit=()=>{
    

    configureCaptcha();
    const phoneNumber = "+92"+Num.substring(1);
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      console.log('otp sent')
      document.getElementById('alertSucess').style.display='block';
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      console.log(error)
      console.log('otp not sent')
      
      // ...
    });


  }


//FUNCTION TO BE CALLED WHEN USER CONFIRMS THE OTP
  const otpConfirm=(e)=>{
    const code = Otp;
    console.log(code);
    window.confirmationResult.confirm(code).then((result) => {
  // User signed in successfully.
  updateIsloggTrue();
  const user = result.user;
  console.log(JSON.stringify(user));
  document.getElementById('alertSucess1').style.display='none';
  document.getElementById('alertSucess2').style.display='block';
  
  
  // ...
  }).catch((error) => {
    console.log(error)
  // User couldn't sign in (bad verification code?)
  // ...
  });
}

  


  



  return(
  <div>
    
    {/* //DIV FOR LOGIN PAGE */}
    {Logger!=undefined?<div>
     
      <div className='login_page' style={{display:Logger?'none':'block'}}>
    <HomeHeader/>
      <div className='loginForm'>
      <div id='sign-in-button'></div>
      <h1>LOGIN WITH PHONE NUMBER</h1>
      <div className='inputdivs_login'>
      <TextField  className='loginInputs' onChange={handleChange} helperText="Enter Phone Number" id="outlined-basic "  label="PHONE" variant="standard" type='text'/>
      <Button  className='loginBtns' onClick={onSignInSubmit} variant="contained">VERIFY</Button><br/>
      
      </div>
      <div className='inputdivs_login'>
      <TextField className='loginInputs' onChange={handleChange2} helperText="Enter the 6-digit code" id="outlined-basic "  label="VERIFICATION CODE" variant="standard" type='text'/>
      <Button className='loginBtns'  onClick={otpConfirm} variant="contained">CONFIRM</Button>
      </div>
   
      <Alert id='alertSucess' style={{display:'none'}} variant="outlined" severity="success">
      CONFIRMATION CODE HAS BEEN SENT
      </Alert>
     
      <Alert id='alertSucess2' style={{display:'none'}} variant="outlined" severity="success">
      USER SUCCESSFULY VERIFIED
      </Alert>

   
    </div>

  </div>


    {/* //DIV FOR HOME PAGE */}
    
    <div  style={{display:Logger?'block':'none'}}>
      <Home loggerstate={setLogger}/>
    </div>
    


        
      
    </div> :<div class="loader"></div>}



    

  </div>
  );
}




export default App;