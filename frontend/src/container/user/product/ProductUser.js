
import React,{useEffect,useState} from 'react'

import {  useLocation,useNavigate } from 'react-router-dom'
import axios from 'axios';
import ROUTES from '../../../navigation/Routes';

function useQuery(){
  const{search}=useLocation();
  return React.useMemo(()=> new URLSearchParams(search),[search]);
}

function ProductDetails() {
  const query=useQuery();
  const naviagte=useNavigate();
  const[products,setProducts]=useState(null);
  function GetProductsByDepartment(){
try {
  axios.get("http://localhost:8081/product?departmentId="+query.get("id"))
  .then((d)=>{
    setProducts(d.data.prdData);
  });
} catch (error) {
  console.log("unable to fetch products");
}
  }

  useEffect(()=>{
    GetProductsByDepartment();
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


  function renderProducts() {
  return products?.map((item) => {
    return (
      <div className="col-3" key={item._id}>
        <div className="card">
          <img 
            className="card-img-top" 
            src={"http://localhost:8081/" + item.images} 
            alt={item.name} 
          />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <button 
              className="btn btn-primary text-white" 
              onClick={() => {
                naviagte(ROUTES.ProductDetails.name + "?id=" + item._id);
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
      <div className='row m-2'>{renderProducts()}</div>
    </div>
  )
}


export default ProductDetails