import { 
  Box, 
  Card, 
  Container, 
  IconButton, 
  Button, 
  FormGroup, 
  FormControlLabel, 
  Checkbox,
  Typography,
  Divider,
  CircularProgress, 
} from "@mui/material"
import { Add, Delete, ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { createContext, useCallback, useContext, useState } from "react";
import { TaskMenu } from "../../../components/TaskMenu/TaskMenu";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { numTasksDone, TasksContext } from "..";

const groupBy = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    const curGroup = acc[key] ?? [];

    return { ...acc, [key]: [...curGroup, obj] };
  }, {});
}

const Task = ({task}) => {
  const {tasks, setTasks} = useContext(TasksContext);
  const [loading, setLoading] = useState(false);
  const handleCheck = () => {
    setLoading(true);
    axios.post('http://localhost:4567/taskdone', 
      {
        uid: getAuth().currentUser.uid,
        taskId: task.taskId
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }  
      }
    ).then((res) => {
      if (res.data == "success") {
        setTasks([
          ...tasks.filter((t) => (t.taskId != task.taskId)),
          {...task, done: !task.done}
         ]);
      }
      setLoading(false);
    });
  }

  return (
    <>
      <FormControlLabel control={<Checkbox checked={task.done} onChange={handleCheck} disabled={loading} />} label={task.name} />
    </>
  )
}

const TaskGroup = ({groupName, tasks, allTasks, setTasks}) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleClickGroup = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div>
      <Button
        variant='text'
        sx={{
          color: 'black',
          width: '100%',
          justifyContent: 'flex-start',
        }}
        startIcon={collapsed ? <ArrowRight /> : <ArrowDropDown />}
        onClick={handleClickGroup}
      >
        <h4>{`${groupName} (${numTasksDone(tasks)}/${tasks.length})`}</h4>
      </Button>
      <FormGroup sx={{display: collapsed ? 'none' : 'flex'}}>
        { tasks.sort((a,b) => (a.name.localeCompare(b.name))).reduce((acc, task, i) => [...acc, <Task key={i} task={task} hidden={collapsed} allTasks={allTasks} setTasks={setTasks} />], [])}
      </FormGroup>
    </div>
  )
}

export const TaskList = ({loading}) => {
  const [TaskMenuOpen, setTaskMenuOpen] = useState(false);
  const {tasks, setTasks} = useContext(TasksContext);

  const groups = useCallback(() => {
    return groupBy(_tasks(), 'category');
  }, [tasks]);

  const _tasks = () => {
    return tasks.reduce((acc, task, i) => ([...acc, {...task, i}]), []);
  }

  const handleTaskMenuOpen = () => {
    setTaskMenuOpen(true);
  }
  const handleTaskMenuClose = () => {
    setTaskMenuOpen(false);
  }

  return (
    <Card
      sx={{
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
        '& h2': { alignSelf: 'center' },
        '& hr': { border: '0.1px solid #ccc', width: '100%'},
        '& h3': { alignSelf: 'center'},
        '& *': {m: 0},
        height: '100%',
      }}
    >
      <TaskMenu 
        open={TaskMenuOpen} 
        onClose={handleTaskMenuClose} 
        categories={Object.keys(groups())} 
        tasks={tasks}
        setTasks={setTasks} 
      />
      <Typography 
        variant="h4"
        align="center"
      >
        Today's Tasks
      </Typography>
      <Divider sx={{mt: 2, mb: 2}}/>
      { loading ? <CircularProgress sx={{alignSelf: 'center', justifySelf: 'center'}}/> :  
      <>  
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 0,
            margin: 0,
          }}
        >
          <h3>{`${numTasksDone(tasks)}/${tasks.length} tasks completed`}</h3>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconButton color="primary" aria-label="delete task" component="label">
              <Delete />
            </IconButton>
            <IconButton color="primary" aria-label="add task" component="label" onClick={handleTaskMenuOpen}>
              <Add />
            </IconButton>
          </Box>
        </Box>
        { Object.entries(groups()).sort((a,b) => (a[0].localeCompare(b[0]))).reduce(
          (acc, groupEntry, i) => {
            return [...acc, <TaskGroup key={i} groupName={groupEntry[0]} tasks={groupEntry[1]} allTasks={tasks} setTasks={setTasks}/>]
          }, [])
        }
      </>
      }
    </Card>
  )
}