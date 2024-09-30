import React from 'react';
import { Button } from 'react-native';
import { Timer } from './Timer';
import { TimerDisplay } from './TimerDisplay';

interface TimerControlProps {
  timerStart: number;
}

export const TimerControls = (props: TimerControlProps) => {
  const [countingDownFlag, setCountingDownFlag] = React.useState(false);
  const [minutes, setMinutes] = React.useState(props.timerStart);

  function startCounting() {
    setCountingDownFlag(true);
  }

  function resetCounting() {
    setCountingDownFlag(false);
    setMinutes(props.timerStart);
  }

  return (
    <div className="timer-control-box">
      <div className="timer-control">
        <div>
          {countingDownFlag ? <Timer deadlineMinutes={minutes} /> : <TimerDisplay minutes={minutes} seconds={0} modulo={1} />}
        </div>
        <div className="controls">
          <Button onPress={startCounting} title="Start" disabled={countingDownFlag} />
          <Button onPress={resetCounting} title="Reset" />
        </div>
      </div>
    </div>
  );
};
