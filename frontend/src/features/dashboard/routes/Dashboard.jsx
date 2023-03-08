
import { Box, Grid, Paper, Container, LinearProgress, Typography, CircularProgress, Button } from '@mui/material';

import { TaskList } from '../components/TaskList';
import { History } from '../components/History';
import { ContentLayout } from '../../../components/Layout/ContentLayout';
import { createContext, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { axios } from '../../../lib/axios';
import { styled } from '@mui/system';
import dayjs from 'dayjs';


export const TasksContext = createContext([]);

export const numTasksDone = (tasks) => {
  return tasks.reduce((acc, task) => acc + task.done, 0);
}

const padEnd = (array, minLength, fillValue = undefined) => {
  return Object.assign(new Array(minLength).fill(fillValue), array);
}

export const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [summary, setSummary] = useState({ month: new Array(dayjs().daysInMonth()).fill(0), week: new Array(7).fill(0) })
  const [loading, setLoading] = useState(true);
  const [histLoading, setHistLoading] = useState(true);

  useEffect(() => {
    const tasksPromise = axios.get('/tasks', {
      params: {
        uid: getAuth().currentUser.uid,
        scope: "today"
      }
    }).then((tasksRes) => {
      setTasks(tasksRes.data);
      setLoading(false);
    });
    const summaryPromise = axios.get('/tasksummary', {
      params: {
        uid: getAuth().currentUser.uid,
      }
    }).then((summaryRes) => {
      setSummary({
        week: padEnd(summaryRes.data.week, 7, 0),
        month: padEnd(summaryRes.data.month, dayjs().daysInMonth(), 0),
      });
      setHistLoading(false);
    });

    // Promise.all([ tasksPromise, summaryPromise]).then(([tasksRes, summaryRes]) => {
    //   setSummary({
    //     week: padEnd(summaryRes.data.week, 7, 0),
    //     month: padEnd(summaryRes.data.month, dayjs().daysInMonth(), 0),
    //   });
    //   setTasks(tasksRes.data);
    //   setLoading(false);
    // });
  }, []);

  useEffect(() => {
    if (!histLoading) {
      let newSummary = { ...summary }
      const score = Math.ceil(numTasksDone(tasks) / tasks.length * 100) || 0;
      newSummary.week[dayjs().day()] = score;
      newSummary.month[dayjs().date() - 1] = score;
      setSummary(newSummary);
    }
  }, [tasks])

  return (
    <ContentLayout title={'Dashboard'}>
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2
          }}
        >
          <LinearProgress
            variant={'determinate'}
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
          <Grid item xs={8} maxHeight="100%">
            <TaskList tasks={tasks} loading={loading} />
          </Grid>
          <Grid item xs={4} maxHeight="100%">
            <History summary={summary} loading={histLoading} />
          </Grid>
        </Grid>
      </TasksContext.Provider>
    </ContentLayout>
  )
}