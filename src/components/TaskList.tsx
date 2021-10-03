import TaskItem from './TaskItem'
import { Task } from 'components/TaskType'

type TaskProps = {
    season: 'future' | 'recent' | 'over';
    tasks: Task[];
}

const divideTasksBySeason = (
  tasks: Task[],
  season: 'future' | 'recent' | 'over',
): Task[] => {
  const seasonTasks = tasks.filter((task) => {
    return task.season === season
  })
  return seasonTasks
}

const TaskList = (props: TaskProps) => {
  const taskList = divideTasksBySeason(props.tasks, props.season);
  return (
    <div className={`${props.season}-todo-list-div`}>
      <ul>
        {taskList.map((item) => (
          <TaskItem title={item.title} date={item.date} done={item.done} id={item.id} key={item.id} />
        ))}
      </ul>
    </div>
  )
}

export default TaskList
