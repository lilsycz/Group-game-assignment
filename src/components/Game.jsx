import { useState, useEffect } from 'react'
import gameData, { cardBackImages } from '../data/gameData'



const LEVEL_TIME = {1:120, 2:90, 3:60}  // time rule for each level
// shuffle cards and sort by type
function getSortedCards() {
  const typeOrder = ['region', 'city', 'animal', 'signature']
  return [...gameData].sort((a, b) => {
    if (a.type !== b.type) {
      return typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type)
    }
    return Math.random() - 0.5
  })
}

function Game() {
  // -- state --
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])   // cards currently flipped, 3 max
  const [matchedCount, setMatchedCount] = useState(0)    // the number of matched sets
  const [isChecking, setIsChecking] = useState(false)    // in the middle of checking a match, to lock clicks
  const [level, setLevel] = useState(1)  // level 1 by default
  const [timeLeft, setTimeLeft] = useState(LEVEL_TIME[level])  // time left for current level
  const [moves, setMoves] = useState(0) // count how many moves player made
  const [gameStatus, setGameStatus] = useState('playing')  // 'playing' | 'won' | 'lost'
  const [showExitConfirm, setShowExitConfirm] = useState(false) //exit confirm window

  // -- init --
  useEffect(() => {
    setCards(getSortedCards())
  }, [])

  // win & lose
  useEffect(() => {
    if (matchedCount === 4) setGameStatus('won')
    }, [matchedCount])

  useEffect(() => {
    if (timeLeft <= 0) setGameStatus('lost')
    }, [timeLeft])

  // timer
  useEffect(() => {
    if (gameStatus !== 'playing' || showExitConfirm) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [gameStatus, showExitConfirm])

  // reset states
  function restartGame() {
    setCards(getSortedCards())
    setFlippedCards([])
    setMatchedCount(0)
    setIsChecking(false)
    setGameStatus('playing')
    setTimeLeft(LEVEL_TIME[level])
    setMoves(0)
    setShowExitConfirm(false)
  }

  // level change
  useEffect(() => {
    restartGame()
  }, [level])


  // -- game logic --
  function handleCardClick(clickedCard) {
    if (clickedCard.isMatched) return 
    if (clickedCard.isFlipped) return
    if (isChecking) return
    // flip 1 card only from the same type
    const sameTypeAlreadyFlipped = flippedCards.some(
      (card) => card.type === clickedCard.type
    )
    if (sameTypeAlreadyFlipped) return

    // flip the clicked card
    const updatedCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    )
    setCards(updatedCards)
    setMoves((prev) => prev + 1)

    // add to flippedCards
    const newFlipped = [...flippedCards, clickedCard]
    setFlippedCards(newFlipped)

    // if flipped 3 cards, check for match
    if (newFlipped.length === 3) {
      checkMatch(newFlipped, updatedCards)
    }
  }
  // check if the 3 flipped cards match (same region)
  function checkMatch(flipped, currentCards) {
    setIsChecking(true)

    const [a, b, c] = flipped
    const isMatch = a.region === b.region && b.region === c.region

    if (isMatch) {
      // yes, mark as isMatched
      const updatedCards = currentCards.map((card) =>
        flipped.some((f) => f.id === card.id)
          ? { ...card, isMatched: true, isFlipped: true }
          : card
      )
      setCards(updatedCards)
      setFlippedCards([])
      setMatchedCount((prev) => prev + 1)
      setIsChecking(false)
    } else {
      // no, flip them back
      setTimeout(() => {
        const updatedCards = currentCards.map((card) =>
          flipped.some((f) => f.id === card.id)
            ? { ...card, isFlipped: false }
            : card
        )
        setCards(updatedCards)
        setFlippedCards([])
        setIsChecking(false)
      }, 1000)
    }
  }

  // -- html --
  return (
    <div className="game">
      {/* sidebar */}
      <div className="sidebar">
        <h2 className="Logo">Swedish Match</h2>
        {/* level select */}
        <div className="level-select">
          <button className={`level-btn ${level === 1 ? 'active' : ''}`} onClick={() => setLevel(1)}>1</button>
          <button className={`level-btn ${level === 2 ? 'active' : ''}`} onClick={() => setLevel(2)}>2</button>
          <button className={`level-btn ${level === 3 ? 'active' : ''}`} onClick={() => setLevel(3)}>3</button>
        </div>
        {/* rules container */}
        <div className="rules-container">
          {gameStatus === 'playing' && <p className="rules-text">Rules: ......</p>}
          {gameStatus === 'won' && <p className="success-text">SUCCESS!!</p>}
          {gameStatus === 'lost' && <p className="timeout-text">TIME OUT!</p>}
        </div>
        {/* restart button */}
        <button className="restart-btn" onClick={restartGame}>
          {gameStatus === 'playing' ? 'Restart' : 'Play Again'}
        </button>
        {/* exit game button */}
        <button className="exitgame-btn" onClick={() => setShowExitConfirm(true)}>
          Exit Game
        </button>
      </div>

      {/* --main game area-- */}
      <div className="game-main">
        <div className="game-header">
          <p className="movesCount">Moves: {moves}</p>
          <p className="timeLeft">Time: {timeLeft}s</p>
        </div>

        {/* card grid */}
        <div className="card-grid">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`card 
                ${card.isFlipped ? 'flipped' : ''} 
                ${card.isMatched ? 'matched' : ''}
                ${card.type}
              `}
              onClick={() => handleCardClick(card)}
            >
              {card.isFlipped ? (
                <div className="card-front">
                  <img src={card.image} alt={card.name} />
                  <p>{card.name}</p>
                  <span className="card-type">{card.type}</span>
                </div>
              ) : (
                <div className="card-back">
                   <img src={cardBackImages[card.type]} alt="card back" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --exit confirm window-- */}
      {showExitConfirm && (
      <>
        <div className="overlay" />
        <div className="exit-window">
          <p className="exit-window-text">Are you sure that you want to exit?</p>
          <button className="exit-confirm-btn" onClick={() => alert('TODO: navigate to login page')}>
            Yes
          </button>
          <button className="exit-cancel-btn" onClick={() => setShowExitConfirm(false)}>
            No
          </button>
        </div>
      </>
      )}

    </div>
  )
}


export default Game
