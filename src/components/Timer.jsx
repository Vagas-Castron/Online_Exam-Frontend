import React, { useState, useEffect } from 'react';

function Timer({submit}) {
  const [seconds, setSeconds] = useState(60); // Initial time in seconds
  const [isRunning, setIsRunning] = useState(true);

  // Update the timer every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isRunning) {
        setSeconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Submit the form when the timer reaches zero
  useEffect(() => {
    if (seconds === 0) {
      // Add your submit logic here
      submit()
      console.log('Timer reached zero. Submitting form...');
      setIsRunning(false); // Stop the timer
    }
  }, [seconds]);

  // Format the time as minutes:seconds
  const formattedTime = `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

  return (
    <span className='timer-container'>
      <span>Timer:</span>
      <span>{formattedTime}</span>
    </span>
  );
}

export default Timer;
