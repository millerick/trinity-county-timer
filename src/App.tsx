import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TimerControls } from './TimerControls';

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const minutes = parseInt(queryParams.get('minutes') || '3');

  return (
    <div className='app' style={{ 
      backgroundImage: `url(${process.env.PUBLIC_URL + '/IMG_0390.JPG'})` 
    }}>
      <TimerControls timerStart={minutes}/>
    </div>
  );
}

export default App;
