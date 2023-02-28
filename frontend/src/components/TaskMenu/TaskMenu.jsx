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

import { TaskRepetitionType, DaysOfWeek } from "../../enums";
import FormControlContext from "@mui/material/FormControl/FormControlContext";
import { boxSizing } from "@mui/system";

const DEFAULTS = {
  category: '',
  name: '',
  priority: 1,
  hidden: false,
  recurring: TaskRepetitionType.Single,
  daysOfWeek: new Array(7).fill(false)
}

// export const TaskMenu = (forwardRef(({open, onClose, categories, tasks, setTasks}, ref)) => {

export const TaskMenu = ({open, onClose, categories}) => {
  const [category, setCategory] = useState(DEFAULTS.category);
  const [name, setName] = useState(DEFAULTS.name);
  const [priority, setPriority] = useState(DEFAULTS.priority);
  const [hidden, setHidden] = useState(DEFAULTS.hidden);
  const [recurring, setRecurring] = useState(DEFAULTS.recurring);
  const [days, setDays] = useState(dayjs());
  const [daysOfWeek, setDaysOfWeek] = useState(DEFAULTS.daysOfWeek);

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
    const newTask = {
      category,
      name,
      priority,
      hidden,
      recurring,
      daysOfWeek,
      done: false,
      startDate: days,
      endDate: days,
    }
    // TODO: make server call

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
          disablePast
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
              margin='normal'
            />
          </FormControl>
          <FormControl>
            <Select value={recurring} onChange={handleRecurringChange} margin='normal'>
              {Object.values(TaskRepetitionType).map((type, i) =>
                <MenuItem key={i} value={type}>{type}</MenuItem>
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
        <Button variant='contained' color='primary' onClick={handleClickCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}