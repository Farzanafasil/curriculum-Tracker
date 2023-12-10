import Header from './Header'
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState }  from 'react'
import '../styles/Emp.css';
import '../styles/Nav.css';
const UpdateResponse = (props) => {
    const [faculty_comments, setfaculty_comments] = useState("");
    const [faculty_upload_url, setfaculty_upload_url] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const data = {"_id" : id };
    useEffect (()=>
    {
        loaddata();
    },[]);
    const loaddata =() => {
        console.log('dta loading')
        axios.get("http://localhost:5000/api/curriculumlist/"+ id)
        .then((response) => {
            setfaculty_comments(response.data.faculty_comments)
            setfaculty_upload_url(response.data.faculty_upload_url)
    });

}
const updateResponse=() => {
    const data = {"_id" : id ,
                  "faculty_comments": faculty_comments,
                  "faculty_upload_url": faculty_upload_url
            }
    console.log('set data++++++')
    console.log(data)
    axios.post("http://localhost:5000/api/curriculumlist/response/" + id,data)
    .then((response)=> {
        console.log(response.data);
        alert('data has been succesfully updated')
    })
}
  return (
    <div>
          <div>
        {/* <Button variant='contained' color="primary" onClick={loaddata} >Click here for update</Button> */}
     <div class="testbox">
    <form action="/employee" className='form'>
      <div class="banner">
        <h1 className='pt-4'>Response Form</h1>
      </div><br /><br />
      <div class="colums">
        <div class="item">
          <label for="fname" className='labl'>Notes<span>:</span></label>
          <textarea id="fname" type="text" name="faculty_comments" value={faculty_comments} onChange={(e) => setfaculty_comments(e.target.value)} required/>
        </div><br />
        <div class="item">
          <label for="lname" className='labl'>Upload<span>:</span></label>
          <input id="lname" type="text" name="faculty_upload_url" value={faculty_upload_url} onChange={(e) => setfaculty_upload_url(e.target.value)} required/>
        </div>
      </div><br />
      <div class="btn-block mb-4">
        <button type="submit"  onClick={updateResponse} class='rf'>Submit</button>
      </div>
    </form>
  </div>
    </div>
    </div>
  )
}

export default UpdateResponse
