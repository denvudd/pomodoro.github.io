import { useContext } from 'react';
import ReactSlider from 'react-slider';
import BackButton from './BackButton';
import SettingsContext from './SettingsContext';

function Settings() {
  const settingsInfo = useContext(SettingsContext);
  return (
    <div className="settings">
      <div className="slider-wrapper">
        <label>Work: {settingsInfo.workMinutes}:00</label>
        <ReactSlider
                  className='slider red'
                  thumbClassName='thumb'
                  trackClassName='track'
                  value={settingsInfo.workMinutes}
                  onChange={e => settingsInfo.setWorkMinutes(e)}
                  min={1}
                  max={120}
        />
      </div>
      <div className="slider-wrapper">
        <label>Break: {settingsInfo.breakMinutes}:00</label>
        <ReactSlider
                  className='slider green'
                  thumbClassName='thumb'
                  trackClassName='track'
                  value={settingsInfo.breakMinutes}
                  onChange={e => settingsInfo.setBreakMinutes(e)}
                  min={1}
                  max={120}
        />
      </div>
      <div className="back-button-wrapper">
        <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
      </div>
    </div>
  )
}

export default Settings;