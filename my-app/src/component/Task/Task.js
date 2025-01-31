import React, { useState, useEffect, useRef } from 'react'

import TaskTimer from '../taskTimer/taskTimer'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'

const Task = ({ todo, changeCheck, deleteItem, editItem, updateTimer }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.body);
  const [timeAgo, setTimeAgo] = useState('');
  const isTimerRunningRef = useRef(todo.isTimerRunning);

  useEffect(() => {
    if (todo && todo.date) {
      const updateTimeAgo = () => {
        setTimeAgo(
          formatDistanceToNow(todo.date, {
            includeSeconds: true,
            locale: enUS,
            addSuffix: true,
          })
        );
      };

      updateTimeAgo();
      const interval = setInterval(updateTimeAgo, 1000);

      return () => clearInterval(interval);
    }
  }, [todo]);

  useEffect(() => {
    if (todo.checked) {
      isTimerRunningRef.current = false;
    }
  }, [todo.checked]);

  const handleSubmit = (event) => {
    event.preventDefault();
    editItem(todo.id, value);
    setValue('');
    setEditing(false);
  };

  const { body, id, checked } = todo;

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
          <span className="title">{body}</span>
          <span className="description">
            <TaskTimer
              isRunning={isTimerRunningRef.current}
              onToggle={(isRunning) => {
                isTimerRunningRef.current = isRunning;
                updateTimer(id, isRunning, todo.elapsedTime);
              }}
              elapsedTime={todo.elapsedTime}
              initialTime={todo.initialTime}
              updateElapsedTime={(newElapsedTime) => updateTimer(id, isTimerRunningRef.current, newElapsedTime)}
            />
            {`created ${timeAgo}`}
          </span>
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
  );
};

Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    isTimerRunning: PropTypes.bool.isRequired,
    elapsedTime: PropTypes.number.isRequired,
  }).isRequired,
  deleteItem: PropTypes.func.isRequired,
  changeCheck: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  updateTimer: PropTypes.func.isRequired,
};



export default Task
