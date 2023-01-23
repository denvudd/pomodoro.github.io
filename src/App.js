import { useState } from 'react';

import Timer from './components/Timer';
import Settings from './components/Settings';
import SettingsContext from './components/SettingsContext';

import './App.css';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <main>
      <div className="pomodoro">
        <div className="container">
        <h1>Pomadoro Timer 🍅</h1>
          <SettingsContext.Provider value={{
            showSettings: showSettings,
            workMinutes: workMinutes,
            breakMinutes: breakMinutes,
            setShowSettings: setShowSettings,
            setWorkMinutes: setWorkMinutes,
            setBreakMinutes: setBreakMinutes,
          }}>
            {showSettings ? <Settings/> : <Timer/>}
          </SettingsContext.Provider>
        </div>
      </div>
    </main>
  );
}


export default App;
