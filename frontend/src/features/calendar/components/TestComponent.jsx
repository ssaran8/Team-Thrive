import React, {createRef, useState} from 'react'
import Popup from 'react'
import Fullcalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'

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




export const TestComponent = () => {
  const events = [
    { title: 'Task 1', startRecur:'2023-02-13', color: 'red', daysOfWeek: [ '3' ], endRecur:'2023-03-22'},
    { title: 'Task 2', start: '2023-02-13', color: 'blue', daysOfWeek: [ '3' ]},
    { title: 'Task 3', start: '2023-02-13', color: 'cyan', daysOfWeek: [ '3' ]}
  ]

  //const events2 = sampleTasks.map(function(val, index){
  //  return {}
  //})
  
  return (
    <Fullcalendar
      plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
      initialView="dayGridMonth"
      events={events}
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
  )
}