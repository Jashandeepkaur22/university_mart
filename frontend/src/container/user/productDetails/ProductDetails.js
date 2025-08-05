import React, { useEffect, useState } from 'react'
import{useLocation,useNavigate} from "react-router-dom"
import axios from "axios";


function useQuery(){
  const { search }=useLocation();
  return React.useMemo(()=> new URLSearchParams(search));
}

function ProductDetails() {
  const query=useQuery();
  const[productDet,setProductDet]=useState();
  const navigate=useNavigate();
  function getProductDetails()
  {
    axios.get("http://localhost:8081/productDetails?id="+query.get("id"))
    .then((d)=>{
      setProductDet(d.data.prdData);
    })
    .catch((e)=>{
      alert(e?.message);
    });
  }


  useEffect(()=>{
    getProductDetails();
  },[]);


  function renderImages(){
    return productDet?.images?.map((item)=>{
      return(
        <img src={"http://localhost:8081/"+item}height="300px" width="400px"/>
      );
    });
  }
  return (
    <>
< div className="row p-2 m-2"></div>
<div class="card mx-auto">
  <div style={{display:"flex",flexDirection:"row"}}></div>
  {renderImages()}
   
  
  <div class="card-body">
    <h5 class="card-title">Product name:{productDet?.name}</h5>
    <h5 class="card-title">Product description:{productDet?.description}</h5>
     <h5 class="card-title">Product price :{productDet?.price}</h5>
  <h5 class="card-title">
    Qty:<input type="name" name="qty"/>  </h5>
    <a href="#" class="btn btn-primary text-white">Add to cart</a>
  </div>
  <div class="card-footer text-muted">
  
  </div>
</div>

    </>
  )
}

export default ProductDetails
