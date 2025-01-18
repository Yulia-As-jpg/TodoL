import React from 'react'
import PropTypes from 'prop-types'



const TasksFilter = ({ onFilterChange, selectedFilter }) => {
  return (
    <ul className="filters">
      {['All', 'Active', 'Completed'].map((filter) => (
        <li key={filter}>
          <button className={selectedFilter === filter ? 'selected' : ''} onClick={() => onFilterChange(filter)}>
            {filter}
          </button>
        </li>
      ))}
    </ul>
  )
}

TasksFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
}

export default TasksFilter
