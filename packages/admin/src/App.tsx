import { Greeting } from '@therify/ui'
import { ModelTypes } from '@therify/types'
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [msg, setMessage] = useState('Edit src/App.tsx and save to reload.')
  useEffect(() => {
    fetch("/dev/hello").then(res => res.json()).then(data => setMessage(data.message)).catch(console.error)
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Greeting message={msg} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn {ModelTypes.RankingModelFeature.SOCIAL_MEDIA_PRESENCE}
        </a>
      </header>
    </div>
  );
}

export default App;
