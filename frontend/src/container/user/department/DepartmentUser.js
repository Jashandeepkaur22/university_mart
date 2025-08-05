
import React,{useEffect,useState} from 'react'

import {  useLocation,useNavigate } from 'react-router-dom'
import axios from 'axios';
import ROUTES from '../../../navigation/Routes';

function useQuery(){
  const{search}=useLocation();
  return React.useMemo(()=> new URLSearchParams(search),[search]);
}

function DepartmentUser() {
  const query=useQuery();
  const naviagte=useNavigate();
  const[departments,setDepartments]=useState(null);
  function getDepartmentByUniversity(){
try {
  axios.get("http://localhost:8081/department?universityId="+query.get("id"))
  .then((d)=>{
    setDepartments(d.data.depData);
  });
} catch (error) {
  console.log("unable to fetch departments");
}
  }

  useEffect(()=>{
    getDepartmentByUniversity();
  },[]);

  // function renderDepartments(){
  //   return departments?.map((item)=>{
  //     return(
  //       <div className='col=3'>
  //         <div class="card">
  //           <img class="card-img-top" src={"http://localhost:8081/"+item.image}/>
  //           <div class="card-body">
  //             <h5 class="card-title">{item.name}</h5>
  //             <a class="btn btn-primary text-white" onClick={()=>{
  //               naviagte(ROUTES.productUser.name + "?id=" +(item._id));
  //             }}>View product</a>
  //           </div>
  //         </div>
  //       </div>
  //     )
  //   })
  // }


  function renderDepartments() {
  return departments?.map((item) => {
    return (
      <div className="col-3" key={item._id}>
        <div className="card">
          <img 
            className="card-img-top" 
            src={"http://localhost:8081/" + item.image} 
            alt={item.name} 
          />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <button 
              className="btn btn-primary text-white" 
              onClick={() => {
                naviagte(ROUTES.productUser.name + "?id=" + item._id);
              }}
            >
              View product
            </button>
          </div>
        </div>
      </div>
    )
  })
}
  return (
    <div>
      <div className='row m-2'>{renderDepartments()}</div>
    </div>
  )
}

export default DepartmentUser
