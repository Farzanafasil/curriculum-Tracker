import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});

  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });

  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    // Validate email
    if (!user.email) {
      newErrors.email = 'Email is required';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = 'Email is invalid';
      formIsValid = false;
    }

    // Validate password
    if (!user.password) {
      newErrors.password = 'Password is required';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const addHandler = () => {
    if (validateForm()) {
    axios.post("http://localhost:5000/api/login", user).then((response) => {
      if (response.data.message === "Login Success") {
        const token = response.data.token;
        const user_id = response.data.data._id;
        const role = response.data.data.role;
        sessionStorage.setItem("userToken", token);
        sessionStorage.setItem("userId", user_id);
        sessionStorage.setItem("userrole", role);
        alert(response.data.message);
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/employee');
        }
      } else {
        alert('Login failed');
      }
    })
    .catch((error) => {
      console.error('Error during login:', error);
      alert('An error occurred during login.');
    });
}
};
  return (
    <div className="login container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="cardl card p-4 ">
        <div className="card-body text-center">
          <img
            src="/Curriculum Tracker-1 (1).png"
            alt="Logo"
            className="logo mb-4"
            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
          />
          <h2 className="welcome mb-5">Welcome !</h2>
          <div className="mb-4">
            <label htmlFor="email" className="form-label">email</label>
            <input type="text" className="box form-control" id="email" name="email" placeholder='youremail@gmail.com' onChange={inputHandler} />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="box form-control" id="password" name="password" placeholder='********' onChange={inputHandler} />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          <div className="mb-3">
            <button className="btn1 btn btn-success" onClick={addHandler}>Submit</button>
          </div>
          <a className="reg1 btn btn-link " href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
