import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '../../../navigation/Routes';

// Query Hook
function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function Department() {
  const query = useQuery();
  const navigate = useNavigate();
const [departments, setDepartments] = useState(null);
  const [departmentId, setDepartmentId] = useState(null);
  const [form, setForm] = useState({ name: "", image: null, university: query.get("universityId") });
  const [formError, setFormError] = useState({ name: null, image: "" });

  const changeHandel = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function getDepartmentByUniversity(){
  try {
    axios.get("http://localhost:8081/department?universityId=" + query.get("universityId")).then((d)=>{
      setDepartments(d.data.depData);
    });
  }  
 catch (error) {
    alert(error?.message);
}}

// function getDepartmentBbUniversity() {
//   axios.get("http://localhost:8081/department?universityId=" + query.get("id"))
//     .then((d) => {
//       setDepartments(d.data.depData);
//     })
//     .catch((error) => {
//       alert(error?.message);
//     });
// }


useEffect(()=>{
  getDepartmentByUniversity();
},[]);
  const saveDepartment = () => {
    try {
      let formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image?.name);
      formData.append("universityId", query.get("universityId"));

      axios.post("http://localhost:8081/department", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }).then((d) => {
        alert(d.data.message);
        getDepartmentByUniversity();
        resetForm();
      });
    } catch (error) {
      alert(error?.message);
    }
  };

  const updateDepartment = () => {
    try {
      let formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image?.name);
      formData.append("universityId", query.get("id"));
      formData.append("id", departmentId);

      axios.put("http://localhost:8081/department", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }).then((d) => {
        alert(d.data.message);
        getDepartmentByUniversity();
        resetForm();
      });
    } catch (error) {
      alert(error?.message);
    }
  };

  const deleteDepartment = (id) => {
    try {
      axios.delete("http://localhost:8081/department", { data: { id: id } })
        .then((d) => {
          alert(d.data.message);
          getDepartmentByUniversity();
          resetForm();
        });
    } catch (error) {
      alert(error?.message);
    }
  };

  // const getDepartmentByUniversity = () => {
  //   // You can implement this logic to fetch departments for the university
  // };


function resetForm() {
  setForm({ name: "", image: null, university: query.get("id") });
  setDepartmentId(null);
}



function onDepartmentSubmit() {
    let errors = false;
    let error = { name: "", image: "" };

    if (form.name.trim().length === 0) {
      errors = true;
      error = { ...error, name: "Name is empty" };
    }

    if (form.image == null) {
      errors = true;
      error = { ...error, image: "Please select an image" };
    }

    if (errors) {
      setFormError(error);
    } else {
      setFormError({});
      departmentId ? updateDepartment() : saveDepartment();
    }
  }

// Reset Form

 



function renderDepartments(){
return departments?.map((item)=>{
  return(
  <tr>
    <td>
      <img src={"http://localhost:8081/"+item.image}
      height="150px"
      width="150px"
      />
    </td>
    <td>{item.name}</td>
    <td>
      <button className="btn btn-primary" onClick={()=>{
        navigate(ROUTES.productAdmin.name+"?id="+
          item._id+
          "&name="+
          item.name);
        }
      }>Add product</button>
    </td>
    <td><button className='btn btn-info'
    onClick={()=>{
      setDepartmentId(item._id);
      setForm({...form,name:item.name});}}>Edit</button>
    </td>
    <td><button className='btn btn-danger'
    onClick={()=>{
      deleteDepartment(item._id);
    }}>Delete</button></td>
  </tr>
  )
}
)}



// function renderDepartments() {
//   return departments?.map((item) => (
//     <tr key={item._id}>
//       <td>
//         <img
//           src={"http://localhost:8081/" + item.image}
//           height="150px"
//           width="150px"
//         />
//       </td>
//       <td>{item.name}</td>
//       <td>
//         <button
//           className="btn btn-primary"
//           onClick={() => {
//             navigate(
//               ROUTES.productAdmin.name +
//                 "?id=" +
//                 item._id +
//                 "&name=" +
//                 item.name
//             );
//           }}
//         >
//           Add product
//         </button>
//       </td>
//       <td>
//         <button
//           className="btn btn-info"
//           onClick={() => {
//             setDepartmentId(item._id);
//             setForm({ ...form, name: item.name });
//           }}
//         >
//           Edit
//         </button>
//       </td>
//       <td>
//         <button
//           className="btn btn-danger"
//           onClick={() => {
//             deleteDepartment(item._id);
//           }}
//         >
//           Delete
//         </button>
//       </td>
//     </tr>
//   ));
// }

  return (
    <>

 <div className="row p-2 m-2">
        <div className="card text-center mx-auto">
          <div className="card-header bg-info text-white">
            {departmentId?"edit Department":"New Department"}
          New Department
          </div>

          <div className="card-body">
            <div className="form-group row">
              <label className="col-4">Department Name</label>
              <div className="col-8">
                <input type="text" 
                name="name" 
                className="form-control"
                 onChange={changeHandel} />
              </div>
            </div>

            <div className="form-group row mt-2">
              <label className="col-4">Department Image</label>
              <div className="col-8">
                <input type="file" 
                name="image"
                 className="form-control" 
                 onChange={(e) => {
                  const file = e.target.files[0];
                  setForm({ ...form, image: file });
                }} />
                <p className="text-danger">{formError.image}</p>
              </div>
            </div>
          </div>

          <div className="card-footer text-muted">
            <button className="btn btn-info"  onClick={()=>{
              onDepartmentSubmit();
            }}
          >{departmentId?"Update":"Save"}</button>
          </div>
        </div>
      </div>

      <div className=" row border p-2 m-2">
        <table className="table table-border-striped table-hover">
          <thead>
            <tr>
              <th>Department Image</th>
              <th>Department Name</th>
              <th>Add product</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{renderDepartments()}</tbody>
        </table>
      </div>
    </>
  )
}
      {/* Your form and department listing can go here */}
    



export default Department;
