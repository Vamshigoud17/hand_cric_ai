'use client'

import { useState } from 'react'
import { Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"


export default function HandCricketGame() {
  const [yourScore, setYourScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)
  const [yourChoice, setYourChoice] = useState<number | null>(2)
  const [opponentChoice, setOpponentChoice] = useState<number | null>(2)
  const [gameStarted, setGameStarted] = useState(false)
  const [open, setOpen] = useState(true)
  const [coinResult, setCoinResult] = useState<string | null>(null)
  const [showGameChoice, setShowGameChoice] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)
  const [playerRole, setPlayerRole] = useState<'Batting' | 'Bowling' | null>(null)
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState<'You' | 'Opponent' | null>(null)
  const [youplayed,setyouplayerplayed] = useState(false)
  const [oppplayed,setoppplayerplayed] = useState(false)
  const numbers = [0, 1, 2, 3, 4, 5, 6]

  const flipCoin = (choice: string) => {
    setIsFlipping(true)
    const result = Math.random() > 0.5 ? 'Heads' : 'Tails'
    
    setTimeout(() => {
      setCoinResult(result)
      setIsFlipping(false)
      if(result==choice){
        console.log(result , choice)
        setShowGameChoice(true)
      }
      else
      {
        const role_ = Math.random() > 0.5 ? 'Batting' : 'Bowling'
        setPlayerRole(role_)
        setOpen(false)
        setGameStarted(true)
      }
    }, 1000)
  }

  const handleRoleChoice = (role: 'Batting' | 'Bowling') => {
    setPlayerRole(role)
    setOpen(false)
    setGameStarted(true)
  }
  const endGame = (winner: 'You' | 'Opponent') => {
    setWinner(winner)
    setGameOver(true)
  }

  const resetGame = () => {
    setYourScore(0)
    setOpponentScore(0)
    setYourChoice(null)
    setOpponentChoice(null)
    setGameStarted(false)
    setOpen(true)
    setCoinResult(null)
    setShowGameChoice(false)
    setIsFlipping(false)
    setPlayerRole(null)
    setGameOver(false)
    setWinner(null)
    setyouplayerplayed(false)
    setoppplayerplayed(false)
  }

  const handleNumberSelect = (number: number) => {
    setYourChoice(number)
    const randomChoice = Math.floor(Math.random() * 6) 
    setOpponentChoice(randomChoice)

    if (playerRole === 'Batting') {
      if (number !== randomChoice) {
        if(oppplayed==false)
        {
          console.log("from false batting" ,yourScore,opponentScore,number,randomChoice)
          setYourScore(prevScore => prevScore + number)
        }
        else
        {
          if(yourScore<=opponentScore)
          {
            console.log("from true batting" ,yourScore,opponentScore,number,randomChoice)
            setYourScore(prevScore => prevScore + number)
          }
          else{
            if (opponentScore < yourScore) {
              endGame('You')
            } else {
              endGame('Opponent')
            }
          }
          
        }
      } else {
        // Out! Switch roles or end game
        setyouplayerplayed(true)
        console.log("from true batting out" ,yourScore,opponentScore,number,randomChoice)
        console.log("setplayer cslled",youplayed)
        if(oppplayed==false)
        {
          setPlayerRole('Bowling')
          console.log("setplayerrole clled",playerRole)
        }
        else{
          if (opponentScore < yourScore) {
            endGame('You')
          } else {
            endGame('Opponent')
          }
        }
      }
    } else {
      if (number !== randomChoice) 
      {
        if(youplayed==false)
          {
            console.log("from bowling false" ,yourScore,opponentScore,number,randomChoice)
            setOpponentScore(prevScore => prevScore + randomChoice)
          }
          else{
            if(opponentScore<=yourScore)
            {
              console.log("from  bowling true" ,yourScore,opponentScore,number,randomChoice)
              setOpponentScore(prevScore => prevScore + randomChoice)
            }
            else{
              if (opponentScore < yourScore) {
                endGame('You')
              } else {
                endGame('Opponent')
              }
            }
          }
      } 
        else {
        // Out! Switch roles or end game
        console.log("from  bowling true out" ,yourScore,opponentScore,number,randomChoice)
        setoppplayerplayed(true)
        console.log("setplayer cslled",youplayed)
        if(youplayed==false){
        setPlayerRole('Batting')
        console.log("setplayerrole clled",playerRole)
        }
        else{
          if (opponentScore < yourScore) {
            endGame('You')
          } else {
            endGame('Opponent')
          }
        }
      }
    }
  }

  const getHandEmoji = (number: number) => {
    switch (number) {
      case 0: return '✊'
      case 1: return '☝️'
      case 2: return '✌️'
      case 3: return '🤟'
      case 4: return '🖖'
      case 5: return '✋'
      case 6: return '👍'
      default: return '✌️'
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <div className="grid gap-8 p-4">
            
            {!showGameChoice ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-center">Choose heads/Tails</h2>
                <div className="flex items-center justify-center gap-8">
                  <Button
                    onClick={() => flipCoin('Heads')}
                    disabled={isFlipping}
                    className="bg-blue-700 hover:bg-blue-800 text-xl px-8 py-6"
                  >
                    Heads
                  </Button>
                  
                  <Button
                    onClick={() => flipCoin('Tails')}
                    disabled={isFlipping}
                    className="bg-red-700 hover:bg-red-800 text-xl px-8 py-6"
                  >
                    Tails
                  </Button>
                </div>
                {coinResult && (
                  <p className="text-center text-xl font-semibold">
                    Result: {coinResult}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-center">Choose Batting/Bowling</h2>
                <div className="flex items-center justify-center gap-8">
                  <Button
                    className="bg-blue-700 hover:bg-blue-800 text-xl px-8 py-6"
                    onClick={() => handleRoleChoice('Batting')}
                  >
                    Batting
                  </Button>
                  <Button
                    className="bg-red-700 hover:bg-red-800 text-xl px-8 py-6"
                    onClick={() => handleRoleChoice('Bowling')}
                  >
                    Bowling
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {gameStarted && (
        <>
          <div className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-800 to-red-800">
            <div className="text-4xl font-bold text-white tracking-wider" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              YOU
              <div className="bg-white text-black p-4 rounded-lg mt-2 text-center">{yourScore}</div>
            </div>
            <div className="text-4xl font-bold text-white">VS</div>
            <div className="text-4xl font-bold text-white tracking-wider" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              OPPONENT
              <div className="bg-white text-black p-4 rounded-lg mt-2 text-center">{opponentScore}</div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-20 my-20">
            <div className="text-8xl">{yourChoice ? getHandEmoji(yourChoice) : '✌️'}</div>
            <div className="text-black">
              <Zap size={64} />
            </div>
            <div className="text-8xl">{opponentChoice ? getHandEmoji(opponentChoice) : '✌️'}</div>
          </div>

          <div className="text-center text-4xl font-bold text-black mb-10">
            <h2 className="italic tracking-wider">Select a Number</h2>
          </div>

          <div className="flex justify-center gap-4 px-4 flex-wrap max-w-3xl mx-auto">
            {numbers.map((number) => (
              <button
                key={number}
                onClick={() => handleNumberSelect(number)}
                className="text-5xl p-4 hover:scale-110 transition-transform duration-200 cursor-pointer"
              >
                {getHandEmoji(number)}
              </button>
            ))}
          </div>
        </>
      )}
      <Dialog open={gameOver} onOpenChange={setGameOver}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Game Over!</DialogTitle>
            <DialogDescription className="text-xl">
              {winner === 'You' ? 'Congratulations! You won!' : 'Sorry, you lost. Better luck next time!'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={resetGame} className="w-full mt-4">
              Play Again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}