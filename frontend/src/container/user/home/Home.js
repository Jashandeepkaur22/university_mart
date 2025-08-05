import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../navigation/Routes';

function Home() {
  const navigate=useNavigate();
  const[universities,setuniversities]=useState(null);

  function getUniversities(){
  try {
    
    axios.get("http://localhost:8081/university").then((d)=>{
      setuniversities(d.data.univData);
    });
  } catch (error) {
    console.assertlog("unable to access API");
  }
}
  
  useEffect(()=>{
    getUniversities();
  },[]);
function renderUniversities() {
  return universities?.map((item) => {
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
                navigate(ROUTES.DepartmentUser.name + "?id=" + item._id);
              }}
            >
              View Departments
            </button>
          </div>
        </div>
      </div>
    )
  })
}
return (
    <div>
      <header/>
      <div className='row m-2'>{renderUniversities()}</div>
    </div>
  )

}
export default Home;
