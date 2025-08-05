import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ROUTES from '../navigation/Routes';


function Headers() {
  const[user,setUser]=useState({id:null,role:null});
  const navigate=useNavigate();
  useEffect(()=>{
    let id=localStorage.getItem("id")
    let role=localStorage.getItem("role")
    if(id) setUser({id:id, role:role});
  },[]);
  function renderMenu()
  {
    if(user?.role=="admin"){
      return(
        <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link to={ROUTES.home.name} className="nav-link">
        Home
        </Link>
      </li>
      <li class="nav-item">
         <Link to={ROUTES.about.name} className="nav-link">
        About
        </Link>
      </li>
      <li class="nav-item">
         <Link to={ROUTES.contact.name} className="nav-link">
        Contact
        </Link>
      </li>
      <li class="nav-item">
         <Link to={ROUTES.support.name} className="nav-link">
        Support
        </Link>
      </li>
      <li class="nav-item">
         <Link to={ROUTES.universityAdmin.name} className="nav-link">
        University Management
        </Link>
      </li>
      <li class="nav-item">
         <Link to={ROUTES.universityAdmin.name} className="nav-link">
        Order Management
        </Link>
      </li><li class="nav-item">
         <Link to={ROUTES.universityAdmin.name} className="nav-link">
        User Management
        </Link>
      </li>
      
    </ul>

      );
    } else{
      return(
      <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link to={ROUTES.home.name} className="nav-link">
        Home
        </Link>
      </li>
      <li class="nav-item">
         <Link to={ROUTES.about.name} className="nav-link">
        About
        </Link>
      </li>
      <li class="nav-item">
         <Link to={ROUTES.contact.name} className="nav-link">
        Contact
        </Link>
      </li>
      <li class="nav-item">
         <Link to={ROUTES.support.name} className="nav-link">
        Support
        </Link>
      </li>
    </ul>
      )
    }
  }
  function renderButtons()
  {
    if (user?.id){
      return(
        <button class="btn btn-outline-success my-2 my-sm-0" onClick={()=>{
          localStorage.clear();
          navigate(ROUTES.login.name);
        }}>Logout</button>
      );
    }
    else{
      return(
        <>
         <Link to={ROUTES.register.name} class="btn btn-outline-success my-2 my-sm-0" o
        >Register</Link>
        <Link to={ROUTES.login.name} class="btn btn-outline-success my-2 my-sm-0" o
        >Login</Link>
        </>
      )

    }
  }
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
       {renderMenu()}
       {renderButtons()}
  </div>
</nav>
    </>
  );
}

export default Headers