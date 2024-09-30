import React from 'react';
import { TimerDisplay } from './TimerDisplay';

interface TimerProps {
  deadlineMinutes: number;
  countingDownFlag?: string;
}

export const Timer = (props: TimerProps) => {
  const [minutes, setMinutes] = React.useState(props.deadlineMinutes);
  const [seconds, setSeconds] = React.useState(0);
  const [deadline, setDeadline] = React.useState(addMinutesToNow(props.deadlineMinutes));
  const [modulo, setModulo] = React.useState(0);

  function addMinutesToNow(minutes: number) {
    return new Date(new Date().getTime() + minutes * 60 * 1000);
  }

  function getTime(deadline: Date) {
    const time = deadline.getTime() - Date.now();
    const minutes = Math.max(Math.floor((time / 1000 / 60)), 0);
    const rawSeconds = Math.floor((time / 1000) % 60);
    const seconds = Math.max(rawSeconds, 0);

    setMinutes(minutes);
    setSeconds(seconds);
    setModulo(rawSeconds % 2);
    return { minutes, seconds }
  };

  React.useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <TimerDisplay minutes={minutes} seconds={seconds} modulo={modulo}/>
  );
};
