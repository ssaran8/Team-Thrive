import { ContentLayout } from "../../../components/Layout/ContentLayout";

import { useState, useEffect } from 'react'
import Fullcalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'
import { Box, CircularProgress, Container } from '@mui/material'
import { axios } from "../../../lib/axios";
import { getAuth } from "firebase/auth";
import dayjs from "dayjs";
import { TaskRepetitionEnum } from "../../../enums";
import { TaskMenu } from "../../../components/TaskMenu/TaskMenu";

const colors = [
  "#F7D7C4", // peach
  "#E8E1D4", // light beige
  "#C8D5B9", // sage green
  "#BFD6C2", // seafoam green
  "#E4C2C2", // pink
  "#E3DAC9", // light pink-orange
  "#B8D7D1", // light blue-green
  "#C2C2C2", // light gray
  "#F5BFAE", // coral
  "#B9B7D4"  // lavender
]

const groupBy = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    const curGroup = acc[key] ?? [];

    return { ...acc, [key]: [...curGroup, obj] };
  }, {});
}

export const Calendar = () => {
  const [taskMenuOpen, setTaskMenuOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/tasks', {
      params: {
        uid: getAuth().currentUser.uid,
        scope: "all"
      }
    }).then((res) => {
      setTasks(res.data);
      setLoading(false);
    });
  }, [])

  const categories = [...new Set(tasks.map((task) => task.category))];
  const tasksClean = tasks.map((task) => {
    let calendarEvent = {
      title: task.name,
      color: colors[categories.indexOf(task.category)],
      textColor: 'black',
      groupId: task.category,
    }
    const start = dayjs(task.startDate).format('YYYY-MM-DD')
    const end = dayjs(task.endDate).format('YYYY-MM-DD')
    if (start == end) {
      calendarEvent = { ...calendarEvent, start }
    } else {
      calendarEvent = { ...calendarEvent, startRecur: start, endRecur: end }
    }
    if (task.frequency == TaskRepetitionEnum.Weekly) {
      calendarEvent = {...calendarEvent, daysOfWeek: task.daysOfWeek.reduce((acc, active, day) => {
        if (active) {
          acc.push(day);
        }
        return acc;
      }, [])}
    }

    return calendarEvent;
  });

  const handleTaskMenuOpen = () => {
    setTaskMenuOpen(true);
  }
  const handleTaskMenuClose = () => {
    setTaskMenuOpen(false);
  }

  const sidePadding = 20
  return (
    <ContentLayout title={'Calendar'}>
      <TaskMenu
        open={taskMenuOpen}
        onClose={handleTaskMenuClose}
        categories={Object.keys(groupBy(tasks, 'category'))}
        tasks={tasks}
        setTasks={setTasks}
      />
      {loading ?
        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <CircularProgress size={160}/>
        </Box>
        :
        <Box sx={{ height: '100%', pl: sidePadding, pr: sidePadding }}>
          <Fullcalendar
            height='100%'
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            events={tasksClean}
            customButtons={{
              btn: {
                text: 'New Task',
                click: handleTaskMenuOpen
              }
            }}
            headerToolbar={{ left: "title", center: "dayGridWeek,dayGridMonth btn", right: "prev,next" }}
            eventOrder="groupId,title"
          />
        </Box>
      }
    </ContentLayout>
  );
}