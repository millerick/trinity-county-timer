import React from 'react';
import { Timer } from './Timer';
import { TimerDisplay } from './TimerDisplay';
import * as backgroundColorChanger from './backgroundColorChanger';

interface TimerControlProps {
  timerStart: number;
}

export const TimerControls = (props: TimerControlProps) => {
  const [countingDownFlag, setCountingDownFlag] = React.useState(false);
  const [minutes, setMinutes] = React.useState(props.timerStart);
  const backgroundColor = backgroundColorChanger.useBackgroundStore((state) => state.backgroundColor);
  const changeColor = backgroundColorChanger.useBackgroundStore((state) => state.changeColor);

  function startCounting() {
    setCountingDownFlag(true);
  }

  function resetCounting() {
    setCountingDownFlag(false);
    setMinutes(props.timerStart);
    changeColor(backgroundColorChanger.defaultBackgroundColor);
  }

  return (
    <div className="timer-control-box">
      <div className="timer-control" style={{
        backgroundColor,
      }}>
        <div>
          {countingDownFlag ? <Timer deadlineMinutes={minutes} /> : <TimerDisplay minutes={minutes} seconds={0} modulo={1} />}
        </div>
        <div className="controls">
          <button className="control-button" onClick={startCounting} disabled={countingDownFlag}>Start</button>
          <button className="control-button" onClick={resetCounting}>Reset</button>
        </div>
      </div>
    </div>
  );
};
