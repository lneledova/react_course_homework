import './App.css';

import data from './assets/mock-data.json'

import {MakeCard} from "./components/make-card/make-card";

// Hook import for state
import React from "react";

function App() {

  return (
    <div className="App">

      <div>
        {data.map(item => <MakeCard fields={item}/>)}
      </div>

    </div>
  );
}

export default App;
