import React, { useState } from 'react'
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    //setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      
      const res = await createUserWithEmailAndPassword(auth, email, password);

      
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
         
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              password,
              photoURL: downloadURL,
            });

            
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            //setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      //setLoading(false);
    }
  };

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Chatea con tus amigos</span>
        <span className='title'>Registro</span>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Usuario'/>
            <input type="email" placeholder='Correo electronico'/>
            <input type="password" placeholder='Contraseña'/>
            <input style={{display: 'none'}}  type="file" id='file'/>
            <label htmlFor="file">
              <img src={Add} alt="" />
              <span>Agrega una foto.</span>
            </label>
            <button>Registrarme</button>
            {err && <span>Algo sucedió mal.</span>}
        </form>
        <p>Ya tienes una cuenta? <Link to="/login">Login</Link></p>  
      </div>  
    </div>
  )
}

export default Register
