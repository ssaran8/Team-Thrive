import React, {createRef, useState} from 'react'
import Popup from 'react'
import Fullcalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'
import { Box, Container } from '@mui/material'

const sampleTasks = [
  {
    name: 'Task 1',
    priority: 2,
    done: false,
    private: false,
    repeated: 'daily',
    timeToComplete: 3,
    color: 'red',
    startDate: '2023-02-13',
    endDate: '2023-03-22',
    dayOfWeek: [ '3' ]
  },
  {
    name: 'Task 2',
    priority: 1,
    done: false,
    private: false,
    repeated: 'daily',
    timeToComplete: 4,
    color: 'blue',
    startDate: '2023-02-13',
    endDate: '2023-02-14',
    dayOfWeek: false
  },
  {
    name: 'Task 3',
    priority: 1,
    done: false,
    private: false,
    repeated: 'daily',
    timeToComplete: 4,
    color: 'green',
    startDate: '2023-02-13',
    endDate: '2023-02-13',
    dayOfWeek: false
  },
]

const colors = [
  "#B0E0E6",
  "#98FB98",
  "#FFC0CB",
  "#ADD8E6",
  "#D8BFD8",
  "#E0FFFF",
  "#FFEBCD",
  "#DB7093",
  "#F0FFF0",
  "#FFE4C4"
]



export const TestComponent = ({tasks, setTasks}) => {
  const events = [
    { title: 'Task 1', startRecur:'2023-02-13', color: 'red', daysOfWeek: [ '3' ], endRecur:'2023-03-22'},
    { title: 'Task 2', start: '2023-02-13', color: 'blue', daysOfWeek: [ '3' ]},
    { title: 'Task 3', start: '2023-02-13', color: 'cyan', daysOfWeek: [ '3' ]}
  ]

  const categories = [...new Set(tasks.map((task) => task.category))];

  const tasksClean = tasks.reduce((acc, task, i) => ([...acc, {
    title: task.name,
    start: task.startDate.format('YYYY-MM-DD'),
    color: colors[categories.indexOf(task.category)],
    textColor: 'black',
  }]), []);

  //const events2 = sampleTasks.map(function(val, index){
  //  return {}
  //})
  
  const sidePadding = 0;

  return (
    <Box sx={{height: '100%', pl: sidePadding, pr: sidePadding}}>
      <Fullcalendar
        height='100%'
        plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
        initialView="dayGridMonth"
        events={tasksClean}
        customButtons={{
          btn: {
            text: 'add event',
            click: function() {
              const title = prompt('Add Title followed by \'&\' then enter a date in YYYY-MM-DD format\nExample CSE403 & 2023-04-20')
            }
          }
          
        }}
        headerToolbar={{left: "title", center: "dayGridWeek,dayGridMonth, btn", right:"prev,next"}}

        />
      </Box>
  )
}