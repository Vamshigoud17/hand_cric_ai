'use client'

import { useState } from 'react'
import { Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

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

  const handleNumberSelect = (number: number) => {
    setYourChoice(number)
    const randomChoice = Math.floor(Math.random() * 6) + 1
    setOpponentChoice(randomChoice)

    if (playerRole === 'Batting') {
      if (number !== randomChoice) {
        setYourScore(prevScore => prevScore + number)
      } else {
        // Out! Switch roles or end game
        setPlayerRole('Bowling')
      }
    } else {
      if (number !== randomChoice) {
        setOpponentScore(prevScore => prevScore + randomChoice)
      } else {
        // Out! Switch roles or end game
        setPlayerRole('Batting')
      }
    }
  }

  const getHandEmoji = (number: number) => {
    switch (number) {
      case 0: return '✊'
      case 1: return '✌️'
      case 2: return '🤟'
      case 3: return '🖖'
      case 4: return '🖐️'
      case 5: return '✋'
      case 6: return '👍'
      default: return '✌️'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-red-950">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <div className="grid gap-8 p-4">
            <h1 className="text-3xl font-bold text-center italic">Tossing a Coin</h1>
            
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
                  <div className={`w-24 h-24 rounded-full bg-gray-200 ${isFlipping ? 'animate-spin' : ''}`} />
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
            <div className="text-white">
              <Zap size={64} />
            </div>
            <div className="text-8xl">{opponentChoice ? getHandEmoji(opponentChoice) : '✌️'}</div>
          </div>

          <div className="text-center text-4xl font-bold text-white mb-10">
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
    </div>
  )
}