import { 
  Box, 
  Card, 
  Container, 
  IconButton, 
  Button, 
  FormGroup, 
  FormControlLabel, 
  Checkbox, 
  Dialog, 
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  ButtonGroup,
  FormControl,
} from "@mui/material"
import { Add, Delete, ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { useCallback, useEffect, useState, useImperativeHandle, useRef } from "react";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { forwardRef } from "react";
import { getAuth } from "firebase/auth";
import axios from 'axios';
import { TaskMenu } from "../../../components/TaskMenu/TaskMenu";


const sampleTasks = [
  {
    name: 'Task 1',
    priority: 2,
    done: false,
    private: false,
    repeated: 'daily',
    timeToComplete: 3,
    category: 'Category 1'
  },
  {
    name: 'Task 2',
    priority: 1,
    done: false,
    private: false,
    repeated: 'daily',
    timeToComplete: 4,
    category: 'Category 2'
  },
  {
    name: 'Task 3',
    priority: 1,
    done: false,
    private: false,
    repeated: 'daily',
    timeToComplete: 4,
    category: 'Category 2'
  },
]


const groupBy = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    const curGroup = acc[key] ?? [];

    return { ...acc, [key]: [...curGroup, obj] };
  }, {});
}

const numTasksDone = (tasks) => {
  return tasks.reduce((acc, task) => acc + task.done, 0);
}

// probably should move this outside to a types directory


const Task = ({task, allTasks, setTasks}) => {
  // const [done, setDone] = useState(task.done);

  const handleCheck = () => {
    setTasks([...allTasks.filter((_, index) => index !== task.i), {...task, done: !task.done}]);
  }

  return (
    <>
      <FormControlLabel control={<Checkbox value={task.done} onChange={handleCheck} />} label={task.name} />
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
        { tasks.reduce((acc, task, i) => [...acc, <Task key={i} task={task} hidden={collapsed} allTasks={allTasks} setTasks={setTasks} />], [])}
      </FormGroup>
    </div>
  )
}

export const TaskList = ({tasks, setTasks}) => {
  const [TaskMenuOpen, setTaskMenuOpen] = useState(false);
  const taskMenuRef = useRef();

  // Delete when hooked up to actual db
  if (!tasks) {
    tasks = sampleTasks;
  }

  // const groups = groupBy(tasks, 'category');
  const groups = useCallback(() => {
    return groupBy(_tasks(), 'category');
  }, [tasks]);

  const _tasks = () => {
    return tasks.reduce((acc, task, i) => ([...acc, {...task, i}]), []);
  }

  const handleTaskMenuOpen = () => {
    setTaskMenuOpen(true);
    taskMenuRef.current.restoreDefaults();
  }
  const handleTaskMenuClose = () => {
    setTaskMenuOpen(false);
  }

  return (
    <Card
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        '& h2': { alignSelf: 'center' },
        '& hr': { border: '0.1px solid #ccc', width: '100%'},
        '& h3': { alignSelf: 'center'},
        '& *': {m: 0},
      }}
    >
      <TaskMenu 
        ref={taskMenuRef} 
        open={TaskMenuOpen} 
        onClose={handleTaskMenuClose} 
        categories={Object.keys(groups())} 
        tasks={_tasks()}
        setTasks={setTasks} 
      />
      <h2>Today's Tasks</h2>
      <hr />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 0,
          margin: 0,
        }}
      >
        <h3>{`${numTasksDone(tasks)}/${tasks.length} tasks completed`}</h3>
        <Box>
          <IconButton color="primary" aria-label="delete task" component="label">
            <Delete />
          </IconButton>
          <IconButton color="primary" aria-label="add task" component="label" onClick={handleTaskMenuOpen}>
            <Add />
          </IconButton>
        </Box>
      </Box>
      { Object.entries(groups()).reduce(
        (acc, groupEntry, i) => {
          return [...acc, <TaskGroup key={i} groupName={groupEntry[0]} tasks={groupEntry[1]} allTasks={tasks} setTasks={setTasks}/>]
        }, [])
      }
    </Card>
  )
}