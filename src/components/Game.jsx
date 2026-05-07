import { useState, useEffect } from 'react'
import gameData from '../data/gameData'

function Game() {
  // startgame
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])   // cards currently flipped, 3 max
  const [matchedCount, setMatchedCount] = useState(0)    // the number of matched sets
  const [isChecking, setIsChecking] = useState(false)    // in the middle of checking a match, to lock clicks
  const [gameStatus, setGameStatus] = useState('playing')  // 'playing' | 'won' | 'lost'


  // initial shuffle
  useEffect(() => {
    const shuffled = [...gameData].sort(() => Math.random() - 0.5)
    setCards(shuffled)
  }, [])

  // win & lose rules
  useEffect(() => {
    if (matchedCount === 4) setGameStatus('won')
    }, [matchedCount])

  useEffect(() => {
    if (timeLeft <= 0) setGameStatus('lost')
    }, [timeLeft])

  // timer
  const [timeLeft, setTimeLeft] = useState(60) // 60 seconds to win
  
  useEffect(() => {
    if (gameStatus !== 'playing') return
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [gameStatus])

  // update
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
  // restart
  function restartGame() {
    const shuffled = [...gameData].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlippedCards([])
    setMatchedCount(0)
    setIsChecking(false)
    setGameStatus('playing')
  }

  // endgame
  if (gameStatus === 'won') {
    return (
      <div className="game-won">
        <h1>🎉 You matched all cards!</h1>
        <p>You discovered 4 Swedish regions and their culture & food.</p>
        {/* Wikipedia card by design group */}
        <button onClick={restartGame}>Play Again</button>
      </div>
    )
  }

  // ── html ──
  return (
    <div className="game">
      <div className="game-header">
        <h2>Swedish Memory</h2>
        <p>Matched: {matchedCount} / 4</p>
        <p>Flipped: {flippedCards.length} / 3</p>
      </div>

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
                <span>?</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="restart-btn" onClick={restartGame}>
        Restart
      </button>
    </div>
  )
}




export default Game
