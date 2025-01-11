import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import { enAU } from 'date-fns/locale'

const Task = ({ todo, changeCheck, deleteItem, editItem }) => {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState('')
  const [timeAgo, setTimeAgo] = useState('')

  useEffect(() => {
    if (todo && todo.date) {
      const updateTimeAgo = () => {
        setTimeAgo(
          formatDistanceToNow(todo.date, {
            includeSeconds: true,
            locale: enAU,
            addSuffix: true,
          })
        )
      }

      updateTimeAgo()
      const interval = setInterval(updateTimeAgo, 1000)

      return () => clearInterval(interval)
    }
  }, [todo])

  const handleSubmit = (event) => {
    event.preventDefault()
    editItem(todo.id, value)
    setValue('')
    setEditing(false)
  }

  const { body, id, checked } = todo

  return (
    <li className={checked ? 'completed' : editing ? 'editing' : null}>
      <div className="view">
        <input
          id={id}
          className="toggle"
          type="checkbox"
          onChange={(event) => changeCheck(id, event.target.checked)}
          checked={checked}
        />
        <label htmlFor={id}>
          <span className="description">{body}</span>
          <span className="created">{`created ${timeAgo}`}</span>
        </label>
        <button type="button" onClick={() => setEditing((prevEditing) => !prevEditing)} className="icon icon-edit" />
        <button type="button" onClick={() => deleteItem(id)} className="icon icon-destroy" />
      </div>
      {editing && (
        <form onSubmit={handleSubmit}>
          <input onChange={(event) => setValue(event.target.value)} type="text" className="edit" value={value} />
        </form>
      )}
    </li>
  )
}

Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  deleteItem: PropTypes.func.isRequired,
  changeCheck: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
}

export default Task
