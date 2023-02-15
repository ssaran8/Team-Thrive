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
const TaskRepetitionType = {
  Single: 'One Time',
  Daily: 'Daily',
  Weekly: 'Weekly',
  Monthly: 'Monthly',
  Yearly: 'Yearly'
}

const DaysOfWeek = {
  Sunday: 'Sun',
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat'
}

// TODO: error handling
const NewTaskMenu = forwardRef(({open, onClose, categories}, ref) => {
  const DEFAULTS = {
    category: '',
    name: '',
    priority: 1,
    hidden: false,
    recurring: TaskRepetitionType.Single,
    daysOfWeek: new Array(7).fill(false)
  }

  const [category, setCategory] = useState(DEFAULTS.category);
  const [name, setName] = useState(DEFAULTS.name);
  const [priority, setPriority] = useState(DEFAULTS.priority);
  const [hidden, setHidden] = useState(DEFAULTS.hidden);
  const [recurring, setRecurring] = useState(DEFAULTS.recurring);
  const [days, setDays] = useState(dayjs());
  const [daysOfWeek, setDaysOfWeek] = useState(DEFAULTS.daysOfWeek);

  useImperativeHandle(ref, () => ({restoreDefaults}));

  // Dialog component persists even though it gets hidden. Therefore, we
  // need to restore defaults between menu openings. 
  const restoreDefaults = () => {
    console.log('hi');
    setCategory(DEFAULTS.category);
    setName(DEFAULTS.name);
    setPriority(DEFAULTS.priority);
    setHidden(DEFAULTS.hidden);
    setRecurring(DEFAULTS.recurring);
    setDays(dayjs());  
    setDaysOfWeek(DEFAULTS.daysOfWeek);
  }

  const handleClose = () => {
    onClose();
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  }

  const handleHiddenChange = () => {
    setHidden(!hidden);
  }

  const handleRecurringChange = (e) => {
    setRecurring(e.target.value);
  }

  const handleDaysChange = (day) => {
    setDays(day);
  }

  const handleDaysOfWeekChange = (day) => {
    let newDays = [...daysOfWeek]
    newDays[day] = !newDays[day];
    setDaysOfWeek(newDays)
  }

  const handleClickCreate = () => {
    alert('Not implemented yet');
    handleClose();
  }

  const DateSelector = () => {
    return (
      recurring !== TaskRepetitionType.Weekly ? 
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker 
          displayStaticWrapperAs="desktop"
          openTo='day'
          value={days}
          onChange={handleDaysChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      :
      <ButtonGroup sx={{display : recurring === TaskRepetitionType.Weekly ? 'hidden' : 'none'}}>
        { Object.values(DaysOfWeek).map((day, i) => 
          <Button 
            variant={daysOfWeek[i] ? 'contained':'outlined'}
            onClick={() => handleDaysOfWeekChange(i)}
            key={i}
          >
            {day}
          </Button>
        )}
      </ButtonGroup>
    )
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{textAlign: 'center'}}>Create a New Task </DialogTitle>
      <DialogContent>
        <Container
          sx={{
            padding: 2,
            '> *': {
              width: '100%',
              margin: 1,
              p:0,
            }
          }}
        >
          <TextField variant='outlined' label='Task Name' value={name} onChange={handleNameChange} />
          <Autocomplete
            freeSolo
            options={categories}
            renderInput={(params) => <TextField {...params} label="Category" value={category} onChange={handleCategoryChange}/>}
          />
          <Select value={recurring} onChange={handleRecurringChange}>
            {Object.values(TaskRepetitionType).map((type, i) =>
              <MenuItem key={i} value={type}>{type}</MenuItem>
            )}
          </Select>
          <FormControlLabel control={<Checkbox value={hidden} onChange={handleHiddenChange} />} label="Make this task private" />
          {DateSelector()}
        </Container>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='secondary' onClick={handleClose}>Discard</Button>
        <Button variant='contained' color='primary' onClick={handleClickCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  )
});

const Task = ({task}) => {
  const [done, setDone] = useState(task.done);

  const handleCheck = () => {
    setDone(!done)
  }

  return (
    <>
      <FormControlLabel control={<Checkbox value={done} onChange={handleCheck} />} label={task.name} />
    </>
  )
}

const TaskGroup = ({groupName, tasks}) => {
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
        { tasks.reduce((acc, task, i) => [...acc, <Task key={i} task={task} hidden={collapsed} />], [])}
      </FormGroup>
    </div>
  )
}

export const TaskList = ({tasks}) => {
  const [TaskMenuOpen, setTaskMenuOpen] = useState(false);
  const taskMenuRef = useRef();

  // Delete when hooked up to actual db
  if (!tasks) {
    tasks = sampleTasks;
  }

  const groups = groupBy(tasks, 'category');
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
      <NewTaskMenu ref={taskMenuRef} open={TaskMenuOpen} onClose={handleTaskMenuClose} categories={Object.keys(groups)} />
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
      { Object.entries(groups).reduce(
        (acc, groupEntry, i) => {
          return [...acc, <TaskGroup key={i} groupName={groupEntry[0]} tasks={groupEntry[1]}/>]
        }, [])
      }
    </Card>
  )
}