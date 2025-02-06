import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewTaskForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState('')
  const [newTaskMin, setNewTaskMin] = useState('')
  const [newTaskSec, setNewTaskSec] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTask.trim()) {
      const initialTime = (parseInt(newTaskMin, 10) * 60 + parseInt(newTaskSec, 10)) * 1000
      onAddTask(newTask, initialTime)
      setNewTask('')
      setNewTaskMin('')
      setNewTaskSec('')
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder="Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={newTaskMin}
          onChange={(e) => setNewTaskMin(e.target.value)}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={newTaskSec}
          onChange={(e) => setNewTaskSec(e.target.value)}
        />
        <button type="submit"></button>
      </form>
    </header>
  )
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
}

export default NewTaskForm
