import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";
import { Main } from "./components/main/Main";
import { GameBoard } from "./components/board/GameBoard";
import { GameRules } from "./components/game-rules/GameRules";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="rules" element={<GameRules />} />
          <Route path="game" element={<GameBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
