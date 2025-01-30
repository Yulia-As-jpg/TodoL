import React, { useRef, useEffect } from 'react'

const TaskTimer = ({ isRunning, onToggle, elapsedTime, initialTime, updateElapsedTime }) => {
  const timeRef = useRef(elapsedTime);
  const intervalRef = useRef();

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - timeRef.current;

      const updateTime = () => {
        timeRef.current = Date.now() - startTime;
        updateElapsedTime(timeRef.current);
        intervalRef.current = requestAnimationFrame(updateTime);
      };

      intervalRef.current = requestAnimationFrame(updateTime);
    } else {
      cancelAnimationFrame(intervalRef.current);
    }

    return () => cancelAnimationFrame(intervalRef.current);
  }, [isRunning, updateElapsedTime]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const remainingTime = initialTime ? initialTime - timeRef.current : timeRef.current;

  return (
    <>
      <span>{formatTime(remainingTime)}</span>
      <button className="icon icon-play" onClick={() => onToggle(true)}></button>
      <button className="icon icon-pause" onClick={() => onToggle(false)}></button>
    </>
  );
};


export default TaskTimer
