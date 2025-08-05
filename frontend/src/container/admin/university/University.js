// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";
// import { toast } from 'react-toastify';


import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ROUTES from '../../../navigation/Routes';


function University() {
  const [universities, setUniversities] = useState(null);
  const [universityId, setuniversityId] = useState(null);
  const [formError, setFormError] = useState({ name: "", image: "" });
  const [form, setForm] = useState({ name: "", image: "" });

  const navigate = useNavigate();

  const changeHandel = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function getUniversities() {
    axios.get("http://localhost:8081/university")
      .then((d) => {
        setUniversities(d.data.univData);
      }).catch((error) => {
        toast.error(error?.message);
      });
  }

  useEffect(() => {
    getUniversities();
  }, []);

  function renderUniversities() {
  return universities?.map((item) => (
    <tr key={item._id}>
      <td>
        <img
          src={`http://localhost:8081/${item.image}`}
          alt={item.name}
          width="100"
        />
      </td>
      <td>{item.name}</td>

      <td>
        <button
          className="btn btn-info"
          onClick={() => {
            navigate(
              ROUTES.departmentAdmin.name+
              "?universityId="+
              item._id+
              "&name="+item.name
            );
          }}
        >
          Add Department
        </button>
      </td>

      <td>
        <button
          className="btn btn-warning"
          onClick={() => {
            setForm({ name: item.name, image: null });
            setuniversityId(item._id);
          }}
        >
          Edit
        </button>
      </td>

      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteUniversity(item._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
}



  function saveUniversity() {
    try {
      let formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);

      axios.post("http://localhost:8081/university", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }).then((d) => {
        toast.success(d.data.message);
        getUniversities();
        resetForm();
      });
    } catch (error) {
      toast.error(error?.message);
    }
  }

  function updateUniversity() {
    try {
      let formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      formData.append("id", universityId);

      axios.put("http://localhost:8081/university", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }).then((d) => {
        toast.success(d.data.message);
        getUniversities();
        resetForm();
      });
    } catch (error) {
      toast.error(error?.message);
    }
  }

  function deleteUniversity(id) {
    try {
      let ans = window.confirm("Do you want to delete this university?");
      if (!ans) return;

      axios.delete("http://localhost:8081/university", { data: { id: id } })
        .then((d) => {
          toast.success(d.data.message);
          getUniversities();
          resetForm();
        });
    } catch (error) {
      toast.error(error?.message);
    }
  }

  function onUniversitySubmit() {
    let hasError = false;
    let error = { name: "", image: "" };

    if (form.name.trim().length === 0) {
      hasError = true;
      error.name = "Name is required";
    }

    if (!form.image && !universityId) {
      hasError = true;
      error.image = "Please select an image";
    }

    if (hasError) {
      setFormError(error);
    } else {
      setFormError({});
      universityId ? updateUniversity() : saveUniversity();
    }
  }

  function resetForm() {
    setForm({ name: "", image: null });
    setuniversityId(null);
  }

  return (
    <>
      {/* <ToastContainer position="top-right" autoClose={3000} theme="colored" /> */}

      <div className="row p-2 m-2">
        <div className="card text-center mx-auto">
          <div className="card-header bg-info text-white">
            New University
          </div>

          <div className="card-body">
            <div className="form-group row">
              <label className="col-4">University Name</label>
              <div className="col-8">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={changeHandel}
                  value={form.name}
                />
                <span className="text-danger">{formError.name}</span>
              </div>
            </div>

            <div className="form-group row mt-2">
              <label className="col-4">University Image</label>
              <div className="col-8">
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setForm({ ...form, image: file });
                  }}
                />
                <span className="text-danger">{formError.image}</span>
              </div>
            </div>
          </div>

          <div className="card-footer text-muted">
            <button className="btn btn-info" onClick={onUniversitySubmit}>
              {universityId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>

      <div className="border p-3">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>University Image</th>
              <th>University Name</th>
              <th>Add Department</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{renderUniversities()}</tbody>
        </table>
         {/* <ToastContainer /> Important: Toast output */}
      </div>
    </>
  );
}

export default University;

