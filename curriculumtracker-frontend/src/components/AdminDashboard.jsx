import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddCurriculum from './AddCurriculum';
import { Button, TextField, Typography } from '@mui/material';
import '../styles/Nav.css';
import '../styles/Admin.css';
import UnauthorizedMessage from './UnauthorizedMessage';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [singleValue, setSingleValue] = useState(null);
  const [userrole, setUserRole] = useState('');
  const [userToken, setUserToken] = useState(sessionStorage.getItem('userToken'));
  const [unAuth, setUnAuth] = useState(false);

  const fetchDataFromApi = () => {
    const storedUsertoken = sessionStorage.getItem('userToken');
    setUserToken(storedUsertoken);
    axios
      .get('http://localhost:5000/api/curriculumlist/', { params: { userToken: userToken } })
      .then((response) => {
        console.log('print');
        if (response.data.message === 'Unauthorised User') {
          console.log('unauthorised user');
          setUnAuth(true);
        } else {
          console.log(response.data);
          setData(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setUnAuth(true);
        setData([]); // Set an empty array in case of an error or unauthorized user
      });
  };

  useEffect(() => {
    const storedUserRole = sessionStorage.getItem('userrole');
    setUserRole(storedUserRole);
    fetchDataFromApi();
  }, []);

  const deleteCurriculum = (id) => {
    console.log('id delete');
    console.log(id);
    axios.delete('http://localhost:5000/api/curriculumlist/' + id).then((response) => {
      alert(response.data.message);
      window.location.reload(false);
    });
  };

  const ApproveCurriculum = (id) => {
    console.log('id approve');
    console.log(id);
    axios.put('http://localhost:5000/api/curriculumlist/approve/' + id).then((response) => {
      alert(response.data.message);
      window.location.reload(false);
    });
  };

  const updateCurriculum = (val) => {
    setUpdate(true);
    setSingleValue(val);
  };

  const searchCurriculum = () => {
    console.log('button clicked');
    // Convert the search state to an object with the field "query"
    const searchQuery = { query: search };
    axios
      .post('http://localhost:5000/api/curriculum/search', { query: search })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  let finalJSX;

  if (unAuth) {
    console.log('auth display message');
    finalJSX = <UnauthorizedMessage />;
  } else {
    finalJSX = (
      <div>
        <h1>CURRICULUM DETAILS</h1>
        <Typography>Search</Typography>
        <TextField
          className='search mt-1'
          name='search'
          variant='outlined'
          color='success'
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          label='Search'
          fullWidth
          margin='normal'
        />
        <Button className='btnsearch m-2' onClick={searchCurriculum} variant='contained' color='primary'>
          Search
        </Button>
        <div className='container'>
          <div>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Requirement</th>
                  <th scope='col'>Area</th>
                  <th scope='col'>Institution</th>
                  <th scope='col'>Category</th>
                  <th scope='col'>Hours</th>
                  <th scope='col'>Download</th>
                  <th scope='col'>Status</th>
                  <th scope='col'></th>
                  <th scope='col'></th>
                  <th scope='col'></th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{value.requirementname}</td>
                        <td>{value.area}</td>
                        <td>{value.institution}</td>
                        <td>{value.category}</td>
                        <td>{value.hours}</td>
                        <td>
                          <a href={value.faculty_upload_url}>Response Download</a>
                        </td>
                        <td>{value.status}</td>
                        <td>
                          {value.status === 'InProgress' ? (
                            <button className='btn btn-primary' onClick={() => ApproveCurriculum(value._id)}>
                              Approve
                            </button>
                          ) : null}
                        </td>
                        <td>
                          {value.status === 'InProgress' ? (
                            <button className='btn btn-danger' onClick={() => deleteCurriculum(value._id)}>
                              Delete
                            </button>
                          ) : null}
                        </td>
                        <td>
                          {value.status === 'InProgress' ? (
                            <button className='btn btn-success' onClick={() => updateCurriculum(value)}>
                              Update
                            </button>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan='11'>You are not Authorized to View datas.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (update) {
    finalJSX = <AddCurriculum method='put' data={singleValue} />;
  }

  return finalJSX;
};

export default AdminDashboard;
