import React from 'react';

interface TimerDisplayProps {
  minutes: number;
  seconds: number;
  modulo: number;
}

export const TimerDisplay = (props: TimerDisplayProps) => {
  const minutes = props.minutes;
  const seconds = props.seconds;
  const modulo = props.modulo % 2;
  let backgroundColor = undefined;
  if (minutes === 0 && seconds === 0 && modulo === 0) {
    backgroundColor = "rgba(255, 0, 0, 0.5)";
  } else if (minutes === 0) {
    backgroundColor = "rgba(255, 255, 0, 0.5)";
  }
  return (
    <div className="timer" role="timer" style={{
      backgroundColor,
    }}>
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
