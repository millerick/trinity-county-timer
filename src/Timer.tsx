import React from 'react';
import { TimerDisplay } from './TimerDisplay';

interface TimerProps {
  deadlineMinutes: number;
  paused?: boolean;
  onFinish?: () => void;
}

export const Timer = (props: TimerProps) => {
  const [minutes, setMinutes] = React.useState(props.deadlineMinutes);
  const [seconds, setSeconds] = React.useState(0);
  const [deadline, setDeadline] = React.useState(() => addMinutesToNow(props.deadlineMinutes));
  const [modulo, setModulo] = React.useState(0);
  const pausedSinceRef = React.useRef<number | null>(null);
  const finishedRef = React.useRef(false);

  function addMinutesToNow(minutes: number) {
    return new Date(new Date().getTime() + minutes * 60 * 1000);
  }

  function tick() {
    const time = deadline.getTime() - Date.now();
    const nextMinutes = Math.max(Math.floor((time / 1000 / 60)), 0);
    const rawSeconds = Math.floor((time / 1000) % 60);
    const nextSeconds = Math.max(rawSeconds, 0);

    setMinutes(nextMinutes);
    setSeconds(nextSeconds);
    setModulo(rawSeconds % 2);

    if (time <= 0 && !finishedRef.current) {
      finishedRef.current = true;
      props.onFinish?.();
    }
  };

  React.useEffect(() => {
    if (props.paused) {
      pausedSinceRef.current = Date.now();
      return;
    }

    if (pausedSinceRef.current !== null) {
      const pausedDuration = Date.now() - pausedSinceRef.current;
      pausedSinceRef.current = null;
      setDeadline(new Date(deadline.getTime() + pausedDuration));
      return;
    }

    const interval = setInterval(tick, 100);

    return () => clearInterval(interval);
  }, [props.paused, deadline]);

  return (
    <TimerDisplay minutes={minutes} seconds={seconds} modulo={modulo}/>
  );
};
