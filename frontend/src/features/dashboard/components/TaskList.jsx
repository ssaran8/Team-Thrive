import { Box, Card } from "@mui/material"

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

const Task = ({task}) => {
  return (
    <div>
      <p style={{paddingLeft: task.category ? '2ch': 0}}>{task.name}</p>
    </div>
  )
}

const TaskGroup = ({groupName, tasks}) => {
  return (
    <div>
      <p>{groupName}</p>
      {tasks.reduce((acc, task) => [...acc, <Task task={task} />], [])}
    </div>
  )
}

export const TaskList = ({tasks}) => {
  if (!tasks) {
    tasks = sampleTasks;
  }

  const groups = groupBy(tasks, 'category');
  const output = Object.entries(groups).reduce(
    (acc, groupEntry) => {
      return [...acc, <TaskGroup groupName={groupEntry[0]} tasks={groupEntry[1]}/>]
    }, []);
  console.log(output);

  return (
    <Card>
      { Object.entries(groups).reduce(
        (acc, groupEntry, i) => {
          return [...acc, <TaskGroup key={i} groupName={groupEntry[0]} tasks={groupEntry[1]}/>]
        }, [])
      }
    </Card>
  )
}