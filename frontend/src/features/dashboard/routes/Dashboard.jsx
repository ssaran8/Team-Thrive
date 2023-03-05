
import { Box, Grid, Paper, Container, LinearProgress, Typography} from '@mui/material';

import { TaskList } from '../components/TaskList';
import { History } from '../components/History';
import { ContentLayout } from '../../../components/Layout/ContentLayout';
import { TasksContext } from '../../../routes/protected';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import { styled } from '@mui/system';




export const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:4567/tasks', { params: {
      uid: getAuth().currentUser.uid,
      scope: "all"  // TODO: change to "Today"
    }}).then((res) => {
      setTasks(res.data);
      console.log(tasks);
    });
  }, [])
  

  // const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  //   height: 10,
  //   borderRadius: 5,
  // }));


  return (
    <ContentLayout title={'Dashboard'}> 
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center', 
          mb: 2
        }}
      >
        <LinearProgress 
          variant='determinate' 
          value={progress} 
          onClick={()=> {setProgress(progress === 100 ? 0 : progress + 10)}}
          sx={{
            height: 25,
            borderRadius: 5,
            width: '100%',
          }}
        />
        <Typography variant='h6' align='center' sx={{position: 'absolute', right: 90}}> {`${progress}/100`} </Typography>
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
          <TaskList tasks={tasks}/>
        </Grid>
        <Grid item xs={4}>
          <History />
        </Grid>
      </Grid>
    </ContentLayout> 
  )
}