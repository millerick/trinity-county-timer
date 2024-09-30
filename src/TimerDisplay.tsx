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
  return (
    <div className="timer" role="timer" style={{
      backgroundColor: minutes === 0 && seconds === 0 && modulo === 0 ? "rgba(255, 0, 0, 0.5)" : undefined,
    }}>
      <div className="col-4">
        <div className="box">
          <p id="minute">{minutes < 10 ? "0" + minutes : minutes}</p>
          <span className="text">Minutes</span>
        </div>
      </div>
      <div className="col-4">
        <div className="box">
          <p id="second">{seconds < 10 ? "0" + seconds : seconds}</p>
          <span className="text">Seconds</span>
        </div>
      </div>
    </div>
  );
};
