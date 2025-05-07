'use client';

import { useState, useEffect } from 'react';
import QuestionCard from '@/components/QuestionCard';
import ResultCard from '@/components/ResultCard';
import GameHeader from '@/components/GameHeader';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { startNewGame, updateGameState, type GameState, type Answer, getNextQuestion } from '@/lib/game-logic';

export default function MultiplayerPage() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    // Initialize game state when component mounts
    setGameState(startNewGame('medium', 'games'));
  }, []);

  const handleAnswer = (answer: Answer) => {
    if (!gameState) return;

    const newGameState = updateGameState(gameState, answer);
    setGameState(newGameState);
  };

  const handleRestart = () => {
    router.push('/');
  };

  if (!gameState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const currentQuestion = getNextQuestion(gameState);
  const progress = (gameState.currentQuestion / (gameState.currentQuestion + gameState.remainingQuestions.length)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="text-center mb-8">
        <div className="flex justify-between items-center mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full 
              hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg 
              hover:shadow-purple-500/50"
          >
            Back to Home
          </motion.button>
          <h2 className="text-2xl font-bold gradient-text">Multiplayer Mode</h2>
          <div className="w-[100px]"></div> {/* Spacer for balance */}
        </div>
        <p className="text-gray-300">One person thinks of a character while others help Akinator guess through questions!</p>
      </div>

      <GameHeader
        progress={progress}
        questionsAsked={gameState.currentQuestion}
        difficulty={gameState.difficulty}
        category={gameState.category}
      />

      <div className="max-w-2xl mx-auto mt-8">
        {!gameState.gameOver ? (
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
          />
        ) : (
          gameState.guessedCharacter && (
            <ResultCard
              character={gameState.guessedCharacter}
              confidence={gameState.confidence}
              possibleCharacters={gameState.possibleCharacters.slice(0, 3)}
              onRestart={handleRestart}
            />
          )
        )}
      </div>
    </motion.div>
  );
}
