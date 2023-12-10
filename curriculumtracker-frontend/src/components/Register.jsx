import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';


const Register = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate username
    if (!inputs.username) {
      newErrors.username = 'Username is required';
    }

    // Validate email
    if (!inputs.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Validate address
    if (!inputs.address) {
      newErrors.address = 'Address is required';
    }

    // Validate phone
    if (!inputs.phone) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d+$/.test(inputs.phone)) {
      newErrors.phone = 'Phone must contain only numbers';
    }

    // Validate password
    if (!inputs.password) {
      newErrors.password = 'Password is required';
    } else if (inputs.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const submitHandler = () => {
    if (validateForm()) {
    const dataToSend = {
      ...inputs,
      role: 'user', // Replace 'user' with the desired userrole value
    };

    axios.post("http://localhost:5000/api/user", dataToSend)
      .then((response) => {
        console.log('response')
        console.log(response.data.message)
        if (response.data.message === "Registered Succesfully") {
          alert(response.data.message);
          navigate('/');
        }
        else {
            alert(response.data.message);   
        }
      })
      .catch(err => console.log(err));
    }
  };

  return (
    <div className="register ">
    <div className="cont container ">
      <div className="row">
        <div className="col-lg-12  ">
          <div className="card2 card   ">
            <div className="regist card-header">Register</div>
            <div className="card-body p-5 bg-gradient-blue-card-1">
              <div className="row g-3">
                <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                  <label htmlFor="username">UserName</label>
                  <input type="text" className="outline form-control" name="username" onChange={inputHandler} />
                  {errors.username && <div className="text-danger">{errors.username}</div>}
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                  <label htmlFor="email">Email Id</label>
                  <input type="text" className="outline form-control" name="email" onChange={inputHandler} />
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <label htmlFor="address">Address</label>
                  <textarea name="address" onChange={inputHandler} id="" cols="30" rows="6" className="outline form-control"></textarea>
                  {errors.address && <div className="text-danger">{errors.address}</div>}
                  {/* <input type="text" className="form-control" name="address" onChange={inputHandler} /> */}
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                  <label htmlFor="phone">Phone</label>
                  <input type="text" className="outline form-control" name="phone" onChange={inputHandler} />
                  {errors.phone && <div className="text-danger">{errors.phone}</div>}
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="outline form-control" name="password" onChange={inputHandler} />
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
              </div>
              <button className="btn2 btn btn-success mt-3" onClick={submitHandler}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;
