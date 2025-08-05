import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// useQuery Hook
function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function Product() {
  const query = useQuery();
  const navigate = useNavigate();

  const [products, setProducts] = useState(null);
  const [productId, setProductId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    images: null,
    departmentId: query.get("id"),
    description: "",
    qty: 10,
    price: 0
  });

  const [formError, setFormError] = useState({
    name: "",
    images: "",
    description: "",
    qty: "",
    price: ""
  });

  const changeHandel = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getProductByDepartment = () => {
    axios.get("http://localhost:8081/product?departmentId=" + query.get("id"))
      .then((d) => {
        setProducts(d.data.prdData);
      }).catch((error) => {
        alert(error?.message);
      });
  };

  useEffect(() => {
    getProductByDepartment();
  }, []);

  const saveProduct = () => {
    try {
      let formData = new FormData();
      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i], form.images[i].name);
      }
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("qty", form.qty);
      formData.append("departmentId", query.get("id"));

      axios.post("http://localhost:8081/product", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }).then((d) => {
        alert(d.data.message);
        getProductByDepartment();
        resetForm();
      });
    } catch (error) {
      alert(error?.message);
    }
  };

  const updateProduct = () => {
    try {
      let formData = new FormData();
      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i], form.images[i].name);
      }
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("qty", form.qty);
      formData.append("departmentId", query.get("id"));
      formData.append("id", productId);

      axios.put("http://localhost:8081/product", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }).then((d) => {
        alert(d.data.message);
        getProductByDepartment();
        resetForm();
      });
    } catch (error) {
      alert(error?.message);
    }
  };

  const deleteProduct = (id) => {
    try {
      let ans = window.confirm("Do you want to delete this product?");
      if (!ans) return;

      axios.delete("http://localhost:8081/product", { data: { id: id } })
        .then((d) => {
          alert(d.data.message);
          getProductByDepartment();
          resetForm();
        });
    } catch (error) {
      alert(error?.message);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      images: null,
      departmentId: query.get("id"),
      description: "",
      qty: 10,
      price: 0
    });
    setProductId(null);
  };

  const onProductSubmit = () => {
    let errors = false;
    let error = {
      name: "",
      images: "",
      description: "",
      qty: "",
      price: ""
    };

    if (form.name.trim().length === 0) {
      errors = true;
      error.name = "Product name is empty";
    }

    if (form.description.trim().length === 0) {
      errors = true;
      error.description = "Product description is empty";
    }

    if (!form.images || form.images.length === 0) {
      errors = true;
      error.images = "Please select product images";
    }

    if (!form.price || form.price <= 0) {
      errors = true;
      error.price = "Product price is required";
    }

    if (!form.qty || form.qty <= 0) {
      errors = true;
      error.qty = "Product quantity is required";
    }

    if (errors) {
      setFormError(error);
    } else {
      setFormError({});
      productId ? updateProduct() : saveProduct();
    }
  };

function renderProducts(){
  return products?.map((item)=>{
    return(
      <tr>
        <td>
          <img src={"http://localhost:8081/"+item.images[0]}
          height="150x" width="120x" />
        </td>
        <td>{item.name}</td>
         <td>{item.description}</td>
          <td>{item.price}</td>
           <td>{item.qty}</td>
          <td>
            <button className='btn btn-info' onClick={()=>{
              setProductId(item._id);
              setForm({...form,
                  name:item.name,
                  description:item.description,
                  price:item.price,
                  qty:item.qty,
              })
            }}>Edit</button>
          </td>
          <td>
            <button className='btn btn-danger' onClick={()=>{
              deleteProduct(item._id); }}>Delete</button>   
         </td>
      </tr>
    )
  })
}


  return (
    <>
      <div className="row p-2 m-2">
        <div className="card text-center mx-auto">
          <div className="card-header bg-info text-white">
            {productId ? "Edit Product" : "New Product"}
          </div>

          <div className="card-body">
            <div className="form-group row">
              <label className="col-4">Product Name</label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  value={form.name}
                  name="name"
                  onChange={changeHandel}
                />
                <p className="text-danger">{formError.name}</p>
              </div>
            </div>

            <div className="form-group row mt-2">
              <label className="col-4">Product Description</label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  value={form.description}
                  name="description"
                  onChange={changeHandel}
                />
                <p className="text-danger">{formError.description}</p>
              </div>
            </div>

            <div className="form-group row mt-2">
              <label className="col-4">Product Quantity</label>
              <div className="col-8">
                <input
                  type="number"
                  className="form-control"
                  value={form.qty}
                  name="qty"
                  onChange={changeHandel}
                />
                <p className="text-danger">{formError.qty}</p>
              </div>
            </div>

            <div className="form-group row mt-2">
              <label className="col-4">Product Price</label>
              <div className="col-8">
                <input
                  type="number"
                  className="form-control"
                  value={form.price}
                  name="price"
                  onChange={changeHandel}
                />
                <p className="text-danger">{formError.price}</p>
              </div>
            </div>

            <div className="form-group row mt-2">
              <label className="col-4">Product Images</label>
              <div className="col-8">
                <input
                  type="file"
                  className="form-control"
                  multiple
                  onChange={(e) => {
                    setForm({ ...form, images: e.target.files });
                  }}
                />
                <p className="text-danger">{formError.images}</p>
              </div>
            </div>
          </div>

          <div className="card-footer text-muted">

          {/* {productId?(
            <button 
            onClick={()=>{
              onProductSubmit();
            }}
            className='btn btn-info'
          > Update </button>
          ):(
            <button onClick={()=>{
              onProductSubmit();
            }}
            className='btn btn-success'
            >Save </button>
          )} */}

            <button className="btn btn-info" onClick={onProductSubmit}>
              {productId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    
      <div class="border p-2 m-2">
        <table className='table table-border table-striped table-hover'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
               <th>Description </th>
               <th>Price </th>
              <th>Qty</th>
                <th>Edit</th>
                 <th>Delete</th> 
            </tr>
          </thead>
          <tbody>{renderProducts()}</tbody>
        </table>
      </div>

    </>
  );
}

export default Product;
