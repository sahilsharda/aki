'use client';

import { useState, useEffect } from 'react';
import { type GameState, type Answer, startNewGame, updateGameState, type DifficultyLevel, type Category } from '@/lib/game-logic';
import QuestionCard from './QuestionCard';
import ResultCard from './ResultCard';
import GameHeader from './GameHeader';

interface GameProps {
  difficulty?: DifficultyLevel;
  category?: Category | null;
}

export default function Game({ difficulty = 'medium', category = null }: GameProps) {
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    // Initialize the game on component mount with difficulty and category
    setGameState(startNewGame(difficulty, category));
  }, [difficulty, category]);

  const handleAnswer = (answer: Answer) => {
    if (!gameState) return;

    const newState = updateGameState(gameState, answer);
    setGameState(newState);
  };

  const handleRestart = () => {
    setGameState(startNewGame(difficulty, category));
  };

  if (!gameState) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-4">
      <GameHeader
        progress={gameState.progress}
        questionsAsked={gameState.askedQuestions.length}
        difficulty={gameState.difficultyLevel}
        category={gameState.category}
      />

      <div className="max-w-md w-full mt-8">
        {gameState.gameOver ? (
          <ResultCard
            character={gameState.guessedCharacter}
            confidence={gameState.confidence}
            possibleCharacters={gameState.possibleCharacters}
            onRestart={handleRestart}
          />
        ) : (
          <QuestionCard
            question={gameState.currentQuestion?.text || ''}
            onAnswer={handleAnswer}
          />
        )}
      </div>
    </div>
  );
}
