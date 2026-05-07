import { useState, useEffect } from 'react'
import gameData from '../data/gameData'

function Game() {
  // start
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])   // cards currently flipped, 3 max
  const [matchedCount, setMatchedCount] = useState(0)    // the number of matched sets
  const [isChecking, setIsChecking] = useState(false)    // in the middle of checking a match, to lock clicks
  const [gameWon, setGameWon] = useState(false)          // victory state

  // prepare
  useEffect(() => {
    const shuffled = [...gameData].sort(() => Math.random() - 0.5)
    setCards(shuffled)
  }, [])

  useEffect(() => {
    if (matchedCount === 4) {
      setGameWon(true)
    }
  }, [matchedCount])

