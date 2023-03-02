
import { Box, Grid, Paper, Container} from '@mui/material';

import { TaskList } from '../components/TaskList';
import { History } from '../components/History';
import { ContentLayout } from '../../../components/Layout/ContentLayout';
import { TasksContext } from '../../../routes/protected';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

export const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4567/tasks', { params: {
      uid: getAuth().currentUser.uid,
      scope: "all"  // TODO: change to "Today"
    }}).then((res) => {
      setTasks(res.data);
      console.log(tasks);
    });
  }, [])
  

  return (
    <ContentLayout title={'Dashboard'}> 
      <Grid 
        container 
        spacing={4}
      >
        <Grid item xs={4}>
          <TaskList tasks={tasks}/>
        </Grid>
        <Grid item xs={4}>
          <Paper> Coming soon </Paper>
        </Grid>
        <Grid item xs={4}>
          <History />
        </Grid>
      </Grid>
    </ContentLayout> 
  )
}