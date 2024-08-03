import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('');
  const [power, setPower] = useState(true);

  const drumPads = [
    { key: 'Q', name: 'Heater-1', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
    { key: 'W', name: 'Heater-2', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
    { key: 'E', name: 'Heater-3', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
    { key: 'A', name: 'Heater-4', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
    { key: 'S', name: 'Clap', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
    { key: 'D', name: 'Open-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
    { key: 'Z', name: 'Kick-n\'-Hat', src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
    { key: 'X', name: 'Kick', src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
    { key: 'C', name: 'Closed-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
  ];

  const playSound = (key, name) => {
    if (!power) return;
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.play();
    setDisplay(name);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toUpperCase();
      const pad = drumPads.find(p => p.key === key);
      if (pad) {
        playSound(key, pad.name);
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [drumPads, power]);

  const togglePower = () => {
    setPower(!power);
    setDisplay(power ? '' : 'Power Off');
  };

  return (
    <div>
      <div id="drum-machine">
        <div id="display">{display}</div>
        <button onClick={togglePower}>{power ? 'OFF' : 'ON'}</button>
        <div id="drum-box">
          {drumPads.map(pad => (
            <div
              key={pad.key}
              className="drum-pad"
              id={pad.name}
              onClick={() => playSound(pad.key, pad.name)}
            >
              {pad.key}
              <audio className="clip" id={pad.key} src={pad.src}></audio>
            </div>
          ))}
        </div>
        <img src={`${process.env.PUBLIC_URL}/Hamza__3_-removebg-preview.png`} alt="Logo" className="logo" />
      </div>
    </div>
  );
}

export default App;
