import React, { useEffect, useState, createElement } from 'react';
import reactDom from 'react-dom';
import '../ui/App.css'
import DefeatOverlay from './DefeatOverlay';
import SingleCard from './SingleCard';
import VictoryOverlay from './VictoryOverlay';

// --- GIF OBJECTS ---
const tileImages = [
  { "src": "https://media2.giphy.com/media/61VzGiRUQp3pZ8omne/200.gif", matched: false },
  { "src": "https://media4.giphy.com/media/CjapibfcpYMZa/200.gif", matched: false },
  { "src": "https://media3.giphy.com/media/l4FGvZyINwriOXDYk/giphy.gif", matched: false },
  { "src": "https://media2.giphy.com/media/cSozWbWHEfUis/200.gif", matched: false },
  { "src": "https://c.tenor.com/73vhftW9zYMAAAAC/kanye-west-blink.gif", matched: false },
  { "src": "https://i.gifer.com/22Lk.gif", matched: false },

]

// CREATE THE BODY OF THE GAME
export default function GameBoard() {
  // represents the mapped cards/tiles on the page.
  const [tiles, setTiles] = useState([]);
  // represents the count of all turns.
  const [turns, setTurns] = useState(0);
  // represents the entered username.
  const [userName, setUserName] = useState("");
  // represents the first choice.
  const [choiceOne, setChoiceOne] = useState(null);
  // represents the second choice.
  const [choiceTwo, setChoiceTwo] = useState(null);
  // represents the "New Game" button -- whether the input has text.
  const [disabled, setDisabled] = useState(false);
  // represents if the user has started the game.
  const [gameStarted, setGameStarted] = useState(false);
  // represents the enabled state of the start button.
  const [startEnabled, setStartEnabled] = useState(false);
  // represents if the user has finished the game.
  const [gameEnded, setGameEnded] = useState(false);
  // set when the user loses the game.
  const [gameLost, setGameLost] = useState(false);
  // represents game difficulty (number of allowed turns).
  const [difficulty, setDifficulty] = useState(0);
  // represents the display of the validation message.
  const [showValidataion, setShowValidation] = useState(false);
  // used to refresh the component if the user wants to restart.
  const [key, setKey] = useState(0);
  const [quote, setQuote] = useState("");

  // shuffle tiles, duplicate tiles to get set of 12, assign random ID to each.
  const shuffleTiles = () => {
    const shuffledTiles = [...tileImages, ...tileImages]      // Need each (used) gif to be used twice.
      .sort(() => Math.random() - 0.5)                        // shuffled array
      .map((tile) => ({ ...tile, id: Math.random() }))        // add on random ID number to each tile.
      .slice(0, 16)

    setChoiceOne(null);
    setChoiceTwo(null);
    setTiles(shuffledTiles);
    setTurns(0);
  }

  // handle a user choice, update choice one or two
  const handleChoice = (tile) => {
    choiceOne ? setChoiceTwo(tile) : setChoiceOne(tile)       // if choiceOne is null (is false), update with setChoiceOne, else update choiceTwo with setChoiceTwo
  }

  useEffect(() => {
    fetch("https://api.kanye.rest/")
      .then(res => res.json())
      .then(res => {
        console.warn(res);
        setQuote(res["quote"])
      })
    shuffleTiles();
  }, [])

  // compare two selected tiles
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setTiles(prevTiles => {
          return prevTiles.map((tile) => {
            if (tile.src === choiceOne.src) {
              checkEndGame();
              return { ...tile, matched: true }
            } else {
              return tile;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo])


  // reset choices and increase number of turns.
  const resetTurn = () => {
    checkEndGame();
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }


  // After each turn, check if the game should end.
  const checkEndGame = () => {
    let maxTurns = getMaxAmountOfTurns();

    // Get the card elments. ONLY LOOKING AT THE CLASSNAMES.
    // This is the count for "how many cards were flipped correctly".
    let flipped = document.getElementsByClassName("flipped");

    // If there are unflipped cards and no turns remaining:
    if (flipped.length !== 12 && turns === maxTurns) setGameLost(true);
    // If it's just a normal turn:
    else if (flipped.length !== 12) return;
    // If all cards are flipped, the game ends.
    else {
      setTimeout(() => {
        setGameEnded(true);
      }, 250)

    }
  }

  const handleDifficulty = (e) => {

    switch (e.target.innerHTML) {
      case ("tryhard"): {
        setDifficulty(4);
        break;
      }
      case ("hard"): {
        setDifficulty(3);
        break;
      }
      case ("medium"): {
        setDifficulty(2);
        break;
      } 
      case ("easy"): {
        setDifficulty(1);
        break;
      } 
    }
  }

  const getMaxAmountOfTurns = () => {
    switch(difficulty) {
      case (1): return 15;
      case (2): return 12;
      case (3): return 8;
      case (4): return 6;
    }
  }

  const validateForm = () => {
    setGameStarted(true);
  }


  return (
    <div className="App">
      <h1>wake up, mr. west!</h1>
      {gameEnded && <VictoryOverlay />}
      {gameLost && <DefeatOverlay />}
      {gameStarted && <p>Welcome, <label name="username">{userName}</label>!</p>}
      <p name="score">Turns: {turns} / {getMaxAmountOfTurns()}</p>
      {gameStarted ? (
        <div className="tile-grid" key={key}>
          {tiles.map((tile) => (
            <SingleCard
              key={tile.id}
              card={tile}
              handleChoice={handleChoice}
              cardFlipped={tile === choiceOne || tile === choiceTwo || tile.matched}
              disabled={disabled}
            />
          ))}

        </div>
      )
        : (

          <div className='user-form'>

            <div className='row'>
              <ul class="nav nav-tabs d-flex justify-content-center">
                <li class="nav-item">
                  <button
                    onClick={(e) => handleDifficulty(e)}
                    class="btn btn-success difficulty"
                  >easy</button>
                </li>
                <li class="nav-item">
                  <button
                    onClick={(e) => handleDifficulty(e)}
                    class="btn btn-secondary difficulty"
                  >medium</button>
                </li>
                <li class="nav-item">
                  <button
                    onClick={(e) => handleDifficulty(e)}
                    class="btn btn-primary difficulty"
                  >hard</button>
                </li>
                <li class="nav-item">
                  <button
                    onClick={(e) => handleDifficulty(e)}
                    class="btn btn-danger difficulty"
                  >tryhard</button>
                </li>
              </ul>
            </div>

            {difficulty === 1 && <p>difficulty: easy</p>}
            {difficulty === 2 && <p>difficulty: medium</p>}
            {difficulty === 3 && <p>difficulty: hard</p>}
            {difficulty === 4 && <p>difficulty: tryhard</p>}



            <div className='row'>
              <h3>"{quote}"</h3>
              {showValidataion && <p>Please select a difficulty.</p>}
              <input className='form-control form-control-sm' placeholder='Username...' onChange={(e) => {
                setUserName(e.target.value);
                e.target.value.length > 0 ? setStartEnabled(true) : setStartEnabled(false);
              }

              } />
              <button className='btn btn-primary' disabled={!startEnabled} onClick={() => validateForm()}>New Game</button>
            </div>
          </div>
        )
      }
    </div>
  );

}
