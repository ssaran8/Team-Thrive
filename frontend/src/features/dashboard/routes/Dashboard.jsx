
import { Box, Grid, Paper, Container} from '@mui/material';
import { logOut } from '../../../lib/firebase';
import { DummyComponent } from '../components/DummyComponent';

import { TaskList } from '../components/TaskList';
import { History } from '../components/History';

export const Dashboard = () => {
  return (
    <Container> 
      <Grid 
        container 
        spacing={2}
      >
        <Grid item xs={4}>
          <TaskList />
        </Grid>
        <Grid item xs={4}>
          <Paper> 2 </Paper>
        </Grid>
        <Grid item xs={4}>
          <History />
        </Grid>
      </Grid>
      {/* you're logged in! 
      <br />
      <button onClick={logOut}>logout here</button>
      <DummyComponent propExample="Dashboard" /> */}
    </Container> 
  )
}