
import React, { useEffect, useState } from 'react';
import AddCurriculum from './AddCurriculum';
import { Button, TextField, Typography } from '@mui/material';
import '../styles/Nav.css';
import '../styles/Admin.css';
const UnauthorizedMessage = () => {
  return (
    <div>
      <div>
      <h1>Unauthorized User</h1>
      <Typography>You are not authorized to view this content.</Typography>
    </div>
    </div>
  )
}

export default UnauthorizedMessage
