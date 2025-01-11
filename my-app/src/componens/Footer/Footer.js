import React from 'react'
import PropTypes from 'prop-types'
import TasksFilter from '../TaskFilter/TaskFilter'

const Footer = ({ taskCount, onClearCompleted, onFilterChange, selectedFilter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{taskCount} items left</span>
      <TasksFilter onFilterChange={onFilterChange} selectedFilter={selectedFilter} />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  taskCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
}

export default Footer
