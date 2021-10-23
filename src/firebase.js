import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAC9gWz_XGm_Tc-vVBj_M5XSjDcMCqWLHw",
  authDomain: "crud-app-with-authentication.firebaseapp.com",
  projectId: "crud-app-with-authentication",
  storageBucket: "crud-app-with-authentication.appspot.com",
  messagingSenderId: "553978063669",
  appId: "1:553978063669:web:97772b330a0c03b5183a7c"
};

  
  const app= firebase.initializeApp(firebaseConfig);
  
  
  export const db=getFirestore(app);
  export default firebase;