import React from 'react'
import PropTypes from 'prop-types'
import Task from '../Task/Task'


const TaskList = ({ tasks, onToggleComplete, onEditTask, onDeleteTask }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          todo={task}
          changeCheck={onToggleComplete}
          deleteItem={onDeleteTask}
          editItem={onEditTask}
        />
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
}

export default TaskList
