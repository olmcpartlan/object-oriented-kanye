import { useEffect, useState } from 'react';
import AppBar from './components/AppBar';
import Maze from './components/Maze';
import GameBoard from './components/GameBoard';
import logo from './logo.svg';
// import './App.css';

function App() {

  const [currentPage, setCurrentPage] = useState("wumw");

  return (
    <div className="App">
      <AppBar changeGame={setCurrentPage}/>
      { currentPage === "wumw" ? <GameBoard/> : <Maze/> }
    </div>
  );
}

export default App;
