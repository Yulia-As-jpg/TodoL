import React, { useRef, useEffect } from 'react'

const TaskTimer = ({ isRunning, onToggle, elapsedTime, initialTime, updateElapsedTime }) => {
  const timeRef = useRef(elapsedTime)
  const intervalRef = useRef()

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - timeRef.current

      intervalRef.current = setInterval(() => {
        timeRef.current = Date.now() - startTime

        if (initialTime && timeRef.current >= initialTime) {
          timeRef.current = initialTime
          onToggle(false)
        }

        updateElapsedTime(timeRef.current)
      }, 100)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning, updateElapsedTime, initialTime, onToggle])

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  const remainingTime = initialTime ? initialTime - timeRef.current : 0

  return (
    <>
      <span>{formatTime(remainingTime)}</span>
      <button className="icon icon-play" onClick={() => onToggle(true)}></button>
      <button className="icon icon-pause" onClick={() => onToggle(false)}></button>
    </>
  )
}

export default TaskTimer
