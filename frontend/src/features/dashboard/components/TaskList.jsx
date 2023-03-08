import {
  Box,
  Card,
  IconButton,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  CircularProgress,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Dialog,
} from "@mui/material"
import { Add, Clear, Delete, DeleteOutline, ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { useContext, useEffect, useState } from "react";
import { TaskMenu } from "../../../components/TaskMenu/TaskMenu";
import { getAuth } from "firebase/auth";
import { axios } from "../../../lib/axios";
import { numTasksDone, TasksContext } from "..";
import { red } from "@mui/material/colors";

const groupBy = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    const curGroup = acc[key] ?? [];

    return { ...acc, [key]: [...curGroup, obj] };
  }, {});
}

// Single task component
const Task = ({ task, deleting, handleDelete }) => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [loading, setLoading] = useState(false);
  const handleCheck = () => {
    setLoading(true);
    axios.post('/taskdone',
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
      if (res.data === "success") {
        setTasks([
          ...tasks.filter((t) => (t.taskId !== task.taskId)),
          { ...task, done: !task.done }
        ]);
      }
      setLoading(false);
    });
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        ':hover': {
          backgroundColor: deleting ? red[50] : '',
        },
        transition: "200ms",
        borderRadius: 5
      }}
    >
      <FormControlLabel control={<Checkbox checked={task.done} onChange={handleCheck} disabled={loading || deleting} />} label={task.name} />
      <IconButton color="error" sx={{ visibility: deleting ? 'visible' : 'hidden' }} onClick={() => handleDelete(task)}>
        <Clear />
      </IconButton>
    </Box>
  )
}

// Component for grouping tasks
const TaskGroup = ({ groupName, tasks, deleting, handleDelete }) => {
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
      <FormGroup sx={{ display: collapsed ? 'none' : 'flex' }}>
        {tasks.sort((a, b) => (a.name.localeCompare(b.name))).reduce((acc, task, i) => [...acc, <Task key={i} deleting={deleting} task={task} handleDelete={handleDelete} />], [])}
      </FormGroup>
    </div>
  )
}

// Component for warning user when deleting tasks.
const DeleteWarning = ({ handleClose, task, handleDelete }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!!task) {
      setMessage(`Are you sure you want to delete the task "${task.name || ""}"?`);
    }
  }, [task])
  return (
    <Dialog
      open={!!task}
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">
        Task Deletion Comfirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">Cancel</Button>
        <Button onClick={() => handleDelete(task.taskId, setLoading)} variant="contained" color={"error"} disabled={loading}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// Component that represents a dynamic list of tasks on the dashboard page.
export const TaskList = ({ loading }) => {
  const [taskMenuOpen, setTaskMenuOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deletingTask, setDeletingTask] = useState(null);
  const { tasks, setTasks } = useContext(TasksContext);

  const _tasks = () => {
    return tasks.reduce((acc, task, i) => ([...acc, { ...task, i }]), []);
  }

  const groups = () => groupBy(_tasks(), 'category');

  const handleTaskMenuOpen = () => {
    setTaskMenuOpen(true);
  }
  const handleTaskMenuClose = () => {
    setTaskMenuOpen(false);
  }

  const handleDeleteTaskClick = (task) => {
    setDeletingTask(task);
  }

  const handleDelete = (taskId, setLoading) => {
    setLoading(true);
    axios.post('/deletetask',
      {
        uid: getAuth().currentUser.uid,
        taskId: taskId
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      }
    ).then(() => {
      setTasks(tasks.filter((t) => t.taskId !== taskId));
      setLoading(false);
      setDeletingTask(null);
    });
  }

  return (
    <Card
      sx={{
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
        '& h2': { alignSelf: 'center' },
        '& hr': { border: '0.1px solid #ccc', width: '100%' },
        '& h3': { alignSelf: 'center' },
        '& *': { m: 0 },
        height: '100%',
        mb: 2,
        overflow: "hidden",
        overflowY: "scroll",
        borderRadius: 5,
      }}
    >
      <DeleteWarning task={deletingTask} handleClose={() => setDeletingTask(null)} handleDelete={handleDelete}/>
      <TaskMenu
        open={taskMenuOpen}
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
      <Divider sx={{ mt: 2, mb: 2 }} />
      {loading ? <CircularProgress sx={{ alignSelf: 'center', justifySelf: 'center' }} /> :
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
              <IconButton color={deleting ? "error" : "primary"} onClick={() => setDeleting(!deleting)}>
                {deleting ? <Delete fontSize="large" /> : <DeleteOutline fontSize="large" />}
              </IconButton>
              <IconButton color="primary" onClick={handleTaskMenuOpen}>
                <Add fontSize="large" />
              </IconButton>
            </Box>
          </Box>
          {Object.entries(groups()).sort((a, b) => (a[0].localeCompare(b[0]))).reduce(
            (acc, groupEntry, i) => {
              return [...acc, <TaskGroup key={i} groupName={groupEntry[0]} tasks={groupEntry[1]} allTasks={tasks} setTasks={setTasks} deleting={deleting} handleDelete={handleDeleteTaskClick} />]
            }, [])
          }
        </>
      }
    </Card>
  )
}