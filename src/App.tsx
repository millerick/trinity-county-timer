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
  const parsed = parseInt(queryParams.get('minutes') || '', 10);
  const minutes = Number.isNaN(parsed) ? 3 : parsed;

  return (
    <div className='app' style={{
      backgroundImage: `url(${import.meta.env.BASE_URL + getBackgroundImage()})`
    }}>
      <TimerControls timerStart={minutes}/>
    </div>
  );
}

export default App;
