import React, { useState } from 'react'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [nextId, setNextId] = useState(1)
  const [filter, setFilter] = useState('All')

  const addTask = (description) => {
    const newTask = {
      id: nextId,
      body: description,
      checked: false,
      date: new Date(),
      isTimerRunning: false,
      elapsedTime: 0,
    }
    setTasks([...tasks, newTask])
    setNextId(nextId + 1)
  }

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, checked: !task.checked } : task)))
  }

  const editTask = (id, newDescription) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, body: newDescription } : task)))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.checked))
  }

  const updateTimer = (id, isRunning, elapsedTime) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, isTimerRunning: isRunning, elapsedTime } : task)))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true
    if (filter === 'Active') return !task.checked
    if (filter === 'Completed') return task.checked
    return true
  })

  const activeTaskCount = tasks.filter((task) => !task.checked).length

  return (
    <section className="todoapp">
      <NewTaskForm onAddTask={addTask} />
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={toggleComplete}
          onEditTask={editTask}
          onDeleteTask={deleteTask}
          updateTimer={updateTimer}
        />
        <Footer
          taskCount={activeTaskCount}
          onClearCompleted={clearCompleted}
          onFilterChange={setFilter}
          selectedFilter={filter}
        />
      </section>
    </section>
  )
}

export default App
