import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import ROUTES from '../../navigations/Routes';
import axios from 'axios';
import ROUTES from '../../navigation/Routes';

function Login() {
  const[form,setForm]=useState({email:"", password:""})
  const[formError,setFormError]=useState({email:"", password:""})
  const navigate=useNavigate();
  const changeHandler=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };
  function loginCheck(){
    axios.post("http://localhost:8081/login",form).then((d)=>{
      localStorage.setItem("id",d.data.id);
      localStorage.setItem("role",d.data.role);
      if(d.data.role=="admin")navigate(ROUTES.universityAdmin.name);
      else navigate(ROUTES.root.name);
    }).catch((e)=>{
      alert("Wrong user/pwd");
      setForm({email:"",password:""});
    });
  }
  function onLoginSubmit(){
    let errors=false;
    let error={email:"", password:""};
    if(form.email.trim().length==0)
    {
      errors=true;
      error={...error,email:"Email Empty!!!"};
    }
    if(form.password.trim().length==0){
      errors=true;
      error={...error,password:"Password Empty!!!"};
    }
    if(errors)setFormError(error)
      else{
      setFormError(error);
      loginCheck();
    }
  }
  return (
    <>
      <div className='row p-2 m-2'>
       <div class="card text-center mx-auto">
  <div class="card-header bg-info text-white">
    Login
  </div>
  <div class="card-body">
    <div className='form-group row'>
      <label className='col-4'>Email</label>
      <div className='col-8'>
        <input type='text' name="email" className='form-control' onChange={changeHandler}/>
        <p className='text-danger'>{formError.email}</p>
      </div>
    </div>
    <div className='form-group row'>
      <label className='col-4'>Password</label>
      <div className='col-8'>
        <input type='password' name="password" className='form-control' onChange={changeHandler}/>
        <p className='text-danger'>{formError.password}</p>
      </div>
    </div>
  </div>
  <div class="card-footer text-muted">
    <button className='btn btn-info' onClick={()=>{
      onLoginSubmit();
    }}>Login</button>
  </div>
</div>
      </div>
    </>
  );
}

export default Login