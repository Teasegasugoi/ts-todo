import {Task} from 'components/TaskType'

const TaskItem = (props: Task) => {
  return (
    <li>
      {/* <input type="checkbox" checked={props.done}/> */}
      {props.date} {props.title}
    </li>
  )
}

export default TaskItem
