import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import TaskRow from '../TaskRow';
import ENVS from '../../utils/envs';
import './TaskList.css'

const TaskList = ({query}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const retrieveTasks = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (query.member !== 'All') {
        params.who = query.member;
      }
      const response = await axios.get(`${ENVS.API_URL}/api/v1/issues`, { params });
      setTasks(response.data)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [query.member]);

  useEffect(() => {
    retrieveTasks();
  }, [retrieveTasks]);
  return (
    <div className='list'>
      {!loading ? tasks.map((props) => <TaskRow key={props.number} {...props} />) : <CircularProgress />}
    </div>
  )
}

export default TaskList;
