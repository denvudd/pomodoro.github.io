import { useState, useContext, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import PauseButton from "./PauseButton";
import PlayButton from "./PlayButton";
import SettingsButton from "./SettingsButton";
import SettingsContext from "./SettingsContext";

function Timer() {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work'); 
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current = secondsLeftRef.current - 1;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function initTimer() {
      secondsLeftRef.current = settingsInfo.workMinutes * 60;
      setSecondsLeft(settingsInfo.workMinutes * 60);
    }

    initTimer();

    function switchMode() {
      const nextMode = modeRef.current === 'work' ? 'break' : 'work';
      const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;
  
      setMode(nextMode);
      modeRef.current = nextMode;
  
      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    const timer = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }


      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(timer);
  }, [settingsInfo]);

  const totalSeconds = (mode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;
  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  return (
    <div>
      <CircularProgressbar value={percentage} text={minutes + ':' + seconds} styles={buildStyles({
        textColor: '#fff',
        pathColor: mode === 'work' ? '#f54e4e' : '#4aec8c',
        tailColor: 'rgba(255,255,255,.2)',
      })}/>
      <div className="button-inner">
        {isPaused 
        ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }}/>
        : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />
        }
        {isPaused ? <div>Relax 💆‍♂️</div> : <div>Good work! 💻</div> }
      </div>
      <div className="settings-wrapper">
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)}/>
      </div>
    </div>
  )
}

export default Timer;