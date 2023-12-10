import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Nav.css';
const AddCurriculum = (props) => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(sessionStorage.getItem("userToken"));
  const [userId, setUserID] = useState(sessionStorage.getItem("userId"));
  const [curriculum, setCurriculum] = useState({
    ...props.data,
    area: props.data?.area || '',
    category: props.data?.category || '',
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setCurriculum({
      ...curriculum,
      [name]: value,
    });
  };

  const addCurriculum = () => {
    let data = {
      userId: userId,
      token: userToken,
      requirementname: curriculum.requirementname,
      area: curriculum.area,
      category: curriculum.category,
      institution: curriculum.institution,
      hours: curriculum.hours,
      admin_upload_url: curriculum.admin_upload_url,
      faculty_comments:"",
      faculty_upload_url:"",
      status :'InProgress'
    };

    if (props.method === "post") {
      axios
        .post("http://localhost:5000/api/curriculumlist", data)
        .then((response) => {
          if (response.data.message === "Created Succesfully") {
            alert(response.data.message);
            navigate('/admin');
          } else {
            alert(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (props.method === "put") {
      axios
        .put("http://localhost:5000/api/curriculumlist/" + curriculum._id, curriculum)
        .then((response) => {
          if (response.data.message === "Updated successfully") {
            alert(response.data.message);
            navigate('/admin');
          } else {
            alert(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="createc card-header">Create Curriculum</div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="requirementname">Requirement</label>
                <input type="text" className="form-controlc form-control" name="requirementname" value={curriculum.requirementname} onChange={inputHandler} placeholder="Requirement" />
              </div>
              <div className="mb-3">
                <label htmlFor="area">Area</label>
                <select className="form-controlc form-select" name="area" value={curriculum.area} onChange={inputHandler}>
                  <option value="">Select an area</option>
                  <option value="FSD">FSD</option>
                  <option value="ML-AI">ML-AI</option>
                  <option value="DSA">DSA</option>
                  <option value="DSA">RPA</option>
                  <option value="DSA">ST</option>
                  <option value="DSA">CSA</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="institution">Institution</label>
                <input type="text" className="form-controlc form-control" name="institution" value={curriculum.institution} onChange={inputHandler} placeholder="Institution" />
              </div>
              <div className="mb-3">
                <label htmlFor="category">Category</label>
                <select className="form-controlc form-select" name="category" value={curriculum.category} onChange={inputHandler}>
                  <option value="">Select a category</option>
                  <option value="Retail">Retail</option>
                  <option value="Academic">Academic</option>
                  <option value="Academic">Corporate</option>
                  <option value="Academic">Govt</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="hours">Hours</label>
                <input type="text" className="form-controlc form-control" name="hours" value={curriculum.hours} onChange={inputHandler} placeholder="Hours" />
              </div>
              <div className="mb-3">
                <label htmlFor="admin_upload_url">Upload</label>
                <input type="text" className="form-controlc form-control" name="admin_upload_url" value={curriculum.admin_upload_url} onChange={inputHandler} placeholder="Upload" />
              </div>
              <div className="mb-3">
                <button className="btn btn-success" onClick={addCurriculum}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCurriculum;