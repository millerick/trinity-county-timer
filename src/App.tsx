import React from 'react';
import './App.css';
import { TimerControls } from './TimerControls';

const TOTAL_PHOTOS = 5;

function getBackgroundImage() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const padded = String(dayOfYear % TOTAL_PHOTOS).padStart(2, '0');
  return `/background/${padded}.jpg`;
}

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const minutes = parseInt(queryParams.get('minutes') || '3');

  return (
    <div className='app' style={{ 
      backgroundImage: `url(${process.env.PUBLIC_URL + getBackgroundImage()})` 
    }}>
      <TimerControls timerStart={minutes}/>
    </div>
  );
}

export default App;
