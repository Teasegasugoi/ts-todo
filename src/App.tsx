// import React from 'react';
import { useState } from 'react'
import './App.css'
import TaskList from 'components/TaskList'
import { Task } from 'components/TaskType'
import TaskInput from 'components/TaskInput'

function App() {
  const dummyTasks: Task[] = [
    {
      id: 1,
      date: '2021/9/30',
      title: 'お金をおろす',
      done: true,
    },
    {
      id: 2,
      date: '2021/10/5',
      title: '動画を視聴する',
      done: false,
    },
    {
      id: 3,
      date: '2021/12/25',
      title: 'イルミネーションを見に行く',
      done: false,
    },
    {
      id: 4,
      date: '2021/10/2',
      title: '時間割を決める',
      done: false,
    },
  ]

  const judgeSeason = (date: string): 'future' | 'recent' | 'over' => {
    const today: number = Date.now()
    const dateNum: number = new Date(date).getTime()
    const deadline: number = dateNum - today
    // 直近1週間以内かどうか or ずいぶん先のtaskか or 過ぎ去った日かどうか
    if (0 < deadline && deadline < 7 * 24 * 60 * 60 * 1000) {
      return 'recent'
    } else if (deadline >= 7 * 24 * 60 * 60 * 1000) {
      return 'future'
    } else {
      return 'over'
    }
  }

  // 各タスクにseasonを付与
  const addSeasonToTasks = (tasks: Task[]): Task[] => {
    return tasks.map((item) => ({
      id: item.id,
      date: item.date,
      title: item.title,
      done: item.done,
      season: judgeSeason(item.date),
    }))
  }

  const [taskList, setTaskList] = useState<Task[]>(addSeasonToTasks(dummyTasks))
  const [inputTask, setInputTask] = useState('')
  const registerTask = (task: string, taskList: Task[]): void => {
    const newTask: Task = {
      id: 10,
      date: '2021/11/4',
      title: task,
      done: false,
    }
    taskList.push(newTask)
    const updatedTaskList: Task[] = addSeasonToTasks(taskList);
    setTaskList(updatedTaskList);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Todoアプリ</p>
      </header>
      <h1 className="recent-todo-title-h1">直近のtodo</h1>
      <TaskList tasks={taskList} season="recent" />
      <h1 className="future-todo-title-h1">まだ先のtodo</h1>
      <TaskList tasks={taskList} season="future" />
      <h1 className="over-todo-title-h1">予定日を過ぎたtodo</h1>
      <TaskList tasks={taskList} season="over" />
      <TaskInput />
      <div className="todo-input-wrapper-div">
        <input
          type="text"
          onChange={(e) => {
            setInputTask(e.target.value)
          }}
        />
        <button onClick={() => registerTask(inputTask, taskList)}>追加</button>
        <button>編集</button>
      </div>
    </div>
  )
}

export default App
