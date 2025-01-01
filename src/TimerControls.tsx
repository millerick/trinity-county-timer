import React from 'react';
import { Button } from 'react-native';
import { Timer } from './Timer';
import { TimerDisplay } from './TimerDisplay';
import * as backgroundColorChanger from './backgroundColorChanger';

interface TimerControlProps {
  timerStart: number;
}

export const TimerControls = (props: TimerControlProps) => {
  const [countingDownFlag, setCountingDownFlag] = React.useState(false);
  const [minutes, setMinutes] = React.useState(props.timerStart);
  const backgroundColor = backgroundColorChanger.useBackgroundStore((state: any) => state.backgroundColor);
  const changeColor = backgroundColorChanger.useBackgroundStore((state: any) => state.changeColor);

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
          <Button onPress={startCounting} title="Start" disabled={countingDownFlag} />
          <Button onPress={resetCounting} title="Reset" />
        </div>
      </div>
    </div>
  );
};
