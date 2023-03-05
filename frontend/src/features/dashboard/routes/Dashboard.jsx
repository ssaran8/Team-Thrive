
import { Box, Grid, Paper, Container, LinearProgress, Typography, CircularProgress } from '@mui/material';

import { TaskList } from '../components/TaskList';
import { History } from '../components/History';
import { ContentLayout } from '../../../components/Layout/ContentLayout';
import { createContext, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import { styled } from '@mui/system';


export const TasksContext = createContext([]);

export const numTasksDone = (tasks) => {
  return tasks.reduce((acc, task) => acc + task.done, 0);
}

export const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4567/tasks', {
      params: {
        uid: getAuth().currentUser.uid,
        scope: "today"
      }
    }).then((res) => {
      setTasks(res.data);
      setLoading(false);
    });
  }, [])

  return (
    <ContentLayout title={'Dashboard'}>
      <TasksContext.Provider value={{tasks, setTasks}}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2
          }}
        >
          <LinearProgress
            variant={loading ? 'indeterminate' : 'determinate'}
            value={Math.ceil(numTasksDone(tasks) / tasks.length * 100)}
            sx={{
              height: 25,
              borderRadius: 5,
              width: '100%',
            }}
          />
          <Typography variant='h6' align='center' sx={{ position: 'absolute', right: 90 }}> {`${Math.ceil(numTasksDone(tasks) / tasks.length * 100) || 0}/100`} </Typography>
        </Box>
        <Grid
          container
          spacing={4}
          sx={{
            height: '100%',
            alignSelf: 'center',
          }}
        >
          <Grid item xs={8}>
            <TaskList tasks={tasks} loading={loading} />
          </Grid>
          <Grid item xs={4}>
            <History loading={loading} />
          </Grid>
        </Grid>
      </TasksContext.Provider>
    </ContentLayout>
  )
}