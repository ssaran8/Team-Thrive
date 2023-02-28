
import { Box, Grid, Paper, Container} from '@mui/material';

import { TaskList } from '../components/TaskList';
import { History } from '../components/History';
import { ContentLayout } from '../../../components/Layout/ContentLayout';
import { TasksContext } from '../../../routes/protected';

export const Dashboard = () => {
  return (
    <ContentLayout title={'Dashboard'}> 
      <Grid 
        container 
        spacing={4}
      >
        <Grid item xs={4}>
          <TasksContext.Consumer>
            {({tasks, setTasks}) => (<TaskList tasks={tasks} setTasks={setTasks}/>)}
          </TasksContext.Consumer>
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