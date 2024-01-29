import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import envs from '../../utils/envs';

const MembersFilter = ({onChange = () => {}, member}) => {
  const [members, setMembers] = useState([]);
  const getMembers = async () => {
    try {
      const response = await axios.get(`${envs.API_URL}/api/v1/members`);
      setMembers(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getMembers();
  }, [])
  return (
    <FormControl fullWidth sx={{mb: '5px'}}>
      <InputLabel id="demo-simple-select-label">Member</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={member}
        label="Member"
        onChange={onChange}
      >
        <MenuItem key={'All'} value={'All'}>All</MenuItem>
        {members.map(elem => <MenuItem key={elem} value={elem}>{elem}</MenuItem>)}
      </Select>
    </FormControl>
  )
}

export default MembersFilter;