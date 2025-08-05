
// import React ,{useState} from 'react'
// import Header from
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import ROUTES from

// function Register() {
// const[from,setForm]=useState({
//   firstname:"",
//   lastname:"",
//   email:"",
//   password:"",
//   confirmpassword="",
// });
// const [formError,setFormError]=useState({
//   firstname:"",
//   lastname:"",
//   email:"",
//   password:"",
//   confirmpassword="",
// });
// const navigate=useNavigate();
// const changeHandler=(e)=>{
//   setForm({...Form,[e.target.name]:e.target.value});
// };
// function saveUser()
// {
//   try {
//     axios.post("http://localhost:8082/register",form).then((d)=>{
//       alert(d.data.message)
//       navigate(ROUTES.login.name)
//     })
    
//   } catch (error) {
//     alert("failed to submit data");
//   }
// }
 
// function onsubmitUser(){
//   let errors=false;
//   let error={
//     firstname:"",
//   lastname:"",
//   email:"",
//   password:"",
//   confirmpassword="",
// };

// if(form.firstname.trim().length==0)
// {
//   errors=true;
//   error={...error,firstname:"fisrt name is emty"}
// }
// if(form.lastname.trim().length==0)
// {
//   errors=true;
//   error={...error,lastname:"fisrt name is emty"}
// }
// if(form.email.trim().length==0)
// {
//   errors=true;
//   error={...error,email:"fisrt name is emty"}
// }
// if(form.password.trim().length==0)
// {
//   errors=true;
//   error={...error,password:"fisrt name is emty"}
// }
// if(form.confiormpassword.trim().length==0)
// {
//   errors=true;
//   error={...error,confirmpassword:"fisrt name is emty"}
// };
// }
// if(errors)setFormError(errors);
// else{
//   setFormError(errors);
//   saveUser();
// }
// }
//   return (
//     <div>
//       <Header/>
//       <div className='row p-2 m-2'>
//         <div class="card text-center mx auto">
//           <div class="card-header bg-infom text-white">
//             Register</div>  
//           <div className="card-body">
//             <div className='form-group row'>
//            <label className='col-4'>first name</label>
//            <div className='col-8'>
//             <input type='text' name='firstname' className='form-control' placeholder='firstname'
//             onChange={onchangeHandler}/>
//             <p className='text-danger'>{formError.firstname}</p>
//             </div>         
//           </div> 

// <div className="card-body">
//             <div className='form-group row'>
//            <label className='col-4'>first name</label>
//            <div className='col-8'>
//             <input type='text' name='firstname' className='form-control' placeholder='firstname'
//             onChange={onchangeHandler}/>
//             <p className='text-danger'>{formError.firstname}</p>
//             </div>         
//           </div> 


//             <div className='form-group row'>
//            <label className='col-4'>last name</label>
//            <div className='col-8'>
//             <input type='text' name='firstname' className='form-control' placeholder='lastname'
//             onChange={onchangeHandler}/>
//             <p className='text-danger'>{formError.lastname}</p>
//             </div>         
//           </div> 


//             <div className='form-group row'>
//            <label className='col-4'>Email</label>
//            <div className='col-8'>
//             <input type='text' name='email' className='form-control' placeholder='email@gamil.com'
//             onChange={onchangeHandler}/>
//             <p className='text-danger'>{formError.Email}</p>
//             </div>         
//           </div> 

//             <div className='form-group row'>
//            <label className='col-4'>password</label>
//            <div className='col-8'>
//             <input type='text' name='password' className='form-control' placeholder='enter password'
//             onChange={onchangeHandler}/>
//             <p className='text-danger'>{formError.password}</p>
//             </div>         
//           </div> 

//             <div className='form-group row'>
//            <label className='col-4'>confirmpassword</label>
//            <div className='col-8'>
//             <input type='text' name='confirmpassword' className='form-control' placeholder='confirm password'
//             onChange={onchangeHandler}/>
//             <p className='text-danger'>{formError.confirmpassword}</p>
//             </div>         
//           </div>  

// <div class="card-footer text-muted">
//   <button className='btn btn-info' onClick={()=>{
//     onsubmitUser();
//   }}>Register</button>
// </div>
// </div>       
         
//  </div>   
//  </div>
//  )
//  }

// export default Register


// Register.js (React Component)
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../navigation/Routes';

function Register() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [formError, setFormError] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function saveUser() {
    axios.post("http://localhost:8082/register", form).then((d) => {
      alert(d.data.message);
      navigate(ROUTES.login.name);
    }).catch(() => {
      alert("Failed to submit data");
    });
  }

  function onSubmitUser() {
    let errors = false;
    let error = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
    };

    if (form.firstname.trim().length === 0) {
      errors = true;
      error.firstname = "First name is empty";
    }
    if (form.lastname.trim().length === 0) {
      errors = true;
      error.lastname = "Last name is empty";
    }
    if (form.email.trim().length === 0) {
      errors = true;
      error.email = "Email is empty";
    }
    if (form.password.trim().length === 0) {
      errors = true;
      error.password = "Password is empty";
    }
    if (form.confirmpassword.trim().length === 0) {
      errors = true;
      error.confirmpassword = "Confirm Password is empty";
    }

    if (errors) setFormError(error);
    else {
      setFormError(error);
      saveUser();
    }
  }

  return (
    <div>
      <div className='row p-2 m-2'>
        <div className="card text-center mx-auto">
          <div className="card-header bg-info text-white">Register</div>
          <div className="card-body">
            {['firstname', 'lastname', 'email', 'password', 'confirmpassword'].map((field, index) => (
              <div className='form-group row' key={index}>
                <label className='col-4'>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <div className='col-8'>
                  <input
                    type='text'
                    name={field}
                    className='form-control'
                    placeholder={field}
                    onChange={changeHandler}
                  />
                  <p className='text-danger'>{formError[field]}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="card-footer text-muted">
            <button className='btn btn-info' onClick={onSubmitUser}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
