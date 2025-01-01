import React from 'react';
import * as backgroundColorChanger from './backgroundColorChanger';

interface TimerDisplayProps {
  minutes: number;
  seconds: number;
  modulo: number;
}

export const TimerDisplay = (props: TimerDisplayProps) => {
  const changeColor = backgroundColorChanger.useBackgroundStore((state: any) => state.changeColor);
  const minutes = props.minutes;
  const seconds = props.seconds;
  const modulo = props.modulo % 2;
  if (minutes === 0 && seconds === 0 && modulo === 0) {
    changeColor(backgroundColorChanger.alertColor);
  } else if (minutes === 0) {
    changeColor(backgroundColorChanger.warningColor);
  }
  return (
    <div className="timer" role="timer">
      <div className="col-4">
        <div className="box">
          <p id="minute">{minutes < 10 ? "0" + minutes : minutes}</p>
        </div>
      </div>
      <div className="col-4">
        <div className="box-no-pad-side">
          <p>:</p>
        </div>
      </div>
      <div className="col-4">
        <div className="box">
          <p id="second">{seconds < 10 ? "0" + seconds : seconds}</p>
        </div>
      </div>
    </div>
  );
};
