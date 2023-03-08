import { 
  Container, 
  Button, 
  FormControlLabel, 
  Checkbox, 
  Dialog, 
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  ButtonGroup,
  FormControl,
} from "@mui/material"
import { useEffect, useState } from "react";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { getAuth } from "firebase/auth";
import { axios } from "../../lib/axios";

import { TaskRepetitionEnum, TaskRepetitionStr, DaysOfWeek } from "../../enums";

const DEFAULTS = {
  category: '',
  name: '',
  priority: 1,
  hidden: false,
  recurring: TaskRepetitionEnum.Once,
  daysOfWeek: new Array(7).fill(false)
}

// Pop-up menu for adding tasks in Dashboard and Calendar pages.
export const TaskMenu = ({open, onClose, categories, tasks, setTasks}) => {
  const [category, setCategory] = useState(DEFAULTS.category);
  const [name, setName] = useState(DEFAULTS.name);
  const [priority, setPriority] = useState(DEFAULTS.priority);
  const [hidden, setHidden] = useState(DEFAULTS.hidden);
  const [recurring, setRecurring] = useState(DEFAULTS.recurring);
  const [days, setDays] = useState(dayjs());
  const [daysOfWeek, setDaysOfWeek] = useState(DEFAULTS.daysOfWeek);
  const [loading, setLoading] = useState(false);

  // Clean state on every open
  useEffect(() => {
    if (open) {
      setCategory(DEFAULTS.category);
      setName(DEFAULTS.name);
      setPriority(DEFAULTS.priority);
      setHidden(DEFAULTS.hidden);
      setRecurring(DEFAULTS.recurring);
      setDays(dayjs());  
      setDaysOfWeek(DEFAULTS.daysOfWeek);    
    }
  }, [open]);

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
    setDays(dayjs());
    setDaysOfWeek(DEFAULTS.daysOfWeek);
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
    setLoading(true);
    const newTask = {
      userId: getAuth().currentUser.uid,
      name,
      category,
      frequency: recurring,
      privateTask: hidden,
      startDate: days.startOf('day'),
      endDate: recurring == TaskRepetitionEnum.Once ? days.endOf('day') : dayjs(new Date(2100, 1, 1)),
      daysOfWeek,
    }

    axios.post('/tasks', newTask,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }  
      }
    ).then((res) => {
      if (res.statusText === "OK") {
        setTasks([...tasks, {...newTask, done: false, taskId: res.data}]);
      }
      setLoading(false);
      handleClose();
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });
  }

  const DateSelector = () => {
    return (
      recurring !== TaskRepetitionEnum.Weekly ? 
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker 
          displayStaticWrapperAs="desktop"
          openTo='day'
          value={days}
          onChange={handleDaysChange}
          renderInput={(params) => <TextField {...params} />}
          disablePast
        />
      </LocalizationProvider>
      :
      <ButtonGroup sx={{display : recurring === TaskRepetitionEnum.Weekly ? 'hidden' : 'none'}}>
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
    <Dialog 
      open={open} 
      onClose={handleClose}
      fullWidth
    >
      <DialogTitle sx={{textAlign: 'center'}}>Create a New Task </DialogTitle>
      <DialogContent>
        <Container
          sx={{
            padding: 2,
            '> *': {
              width: '100%',
              margin: 1,
              p:0,
            },
            boxSizing: 'border-box'
          }}
        >
          <FormControl>
            <TextField variant='outlined' label='Task Name' value={name} onChange={handleNameChange}/>
          </FormControl>
          <FormControl>
            <Autocomplete
              freeSolo
              options={categories}
              onChange={(_,b) => setCategory(b)}
              renderInput={(params) => <TextField {...params} label="Category" value={category} onChange={handleCategoryChange}/>}
            />
          </FormControl>
          <FormControl>
            <Select value={recurring} onChange={handleRecurringChange}>
              {Object.values(TaskRepetitionEnum).map((type, i) =>
                <MenuItem key={i} value={type}>{TaskRepetitionStr[type]}</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl>
            <FormControlLabel control={<Checkbox value={hidden} onChange={handleHiddenChange} />} label="Make this task private" />
          </FormControl>
          <Container sx={{display: 'flex', justifyContent: 'center'}}>
            {DateSelector()}
          </Container>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='secondary' onClick={handleClose}>Discard</Button>
        <Button 
          variant='contained' 
          color='primary' 
          onClick={handleClickCreate}
          disabled={loading || !(category && name) || (recurring === TaskRepetitionEnum.Weekly && daysOfWeek.every((v) => !v))}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}