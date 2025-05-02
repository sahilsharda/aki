'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { type Category, type DifficultyLevel, type Answer, startNewGame, updateGameState, type GameState } from '@/lib/game-logic';
import QuestionCard from '@/components/QuestionCard';
import ResultCard from '@/components/ResultCard';

type PlayerType = 'player1' | 'player2';
type GamePhase = 'setup' | 'player1-choose' | 'player1-guess' | 'player2-choose' | 'player2-guess' | 'results';

interface MultiplayerGameState {
  player1Name: string;
  player2Name: string;
  phase: GamePhase;
  player1Character: string;
  player2Character: string;
  player1Score: number;
  player2Score: number;
  currentRound: number;
  totalRounds: number;
  difficulty: DifficultyLevel;
  category: Category;
  gameState: GameState | null;
  currentPlayer: PlayerType;
}

const initialState: MultiplayerGameState = {
  player1Name: 'Player 1',
  player2Name: 'Player 2',
  phase: 'setup',
  player1Character: '',
  player2Character: '',
  player1Score: 0,
  player2Score: 0,
  currentRound: 1,
  totalRounds: 3,
  difficulty: 'medium',
  category: 'all',
  gameState: null,
  currentPlayer: 'player1',
};

export default function MultiplayerPage() {
  const [state, setState] = useState<MultiplayerGameState>(initialState);

  useEffect(() => {
    // Initialize game state when needed
    if ((state.phase === 'player1-guess' || state.phase === 'player2-guess') && !state.gameState) {
      setState(prev => ({
        ...prev,
        gameState: startNewGame(state.difficulty, state.category)
      }));
    }
  }, [state.phase, state.gameState, state.difficulty, state.category]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStartGame = () => {
    setState(prev => ({
      ...prev,
      phase: 'player1-choose'
    }));
  };

  const handleCharacterSubmit = (player: PlayerType, character: string) => {
    if (player === 'player1') {
      setState(prev => ({
        ...prev,
        player1Character: character,
        phase: 'player2-choose'
      }));
    } else {
      setState(prev => ({
        ...prev,
        player2Character: character,
        phase: 'player1-guess',
        currentPlayer: 'player1'
      }));
    }
  };

  const handleAnswer = (answer: Answer) => {
    if (!state.gameState) return;

    const newGameState = updateGameState(state.gameState, answer);

    setState(prev => ({
      ...prev,
      gameState: newGameState,
    }));

    // Check if guessing is complete
    if (newGameState.gameOver) {
      // Calculate score based on number of questions and correct guess
      const questionsAsked = newGameState.askedQuestions.length;
      const maxScore = 100;
      let scoreToAdd = 0;

      // Award points if character was correctly guessed
      if (newGameState.guessedCharacter) {
        // Fewer questions = more points
        scoreToAdd = Math.max(10, maxScore - (questionsAsked * 5));
      }

      // Advance to next phase
      setTimeout(() => {
        if (state.currentPlayer === 'player1') {
          setState(prev => ({
            ...prev,
            player1Score: prev.player1Score + scoreToAdd,
            phase: 'player2-guess',
            currentPlayer: 'player2',
            gameState: null
          }));
        } else {
          // Move to results or next round
          if (state.currentRound >= state.totalRounds) {
            setState(prev => ({
              ...prev,
              player2Score: prev.player2Score + scoreToAdd,
              phase: 'results'
            }));
          } else {
            setState(prev => ({
              ...prev,
              player2Score: prev.player2Score + scoreToAdd,
              phase: 'player1-choose',
              currentRound: prev.currentRound + 1,
              player1Character: '',
              player2Character: '',
              gameState: null
            }));
          }
        }
      }, 2000);
    }
  };

  const handlePlayAgain = () => {
    setState(initialState);
  };

  const renderPhase = () => {
    switch (state.phase) {
      case 'setup':
        return (
          <Card className="shadow-lg border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-600 dark:text-purple-400">Multiplayer Game</CardTitle>
              <CardDescription>Challenge a friend to see who's better at Akinator</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="player1Name">Player 1 Name</Label>
                <Input
                  id="player1Name"
                  name="player1Name"
                  value={state.player1Name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="player2Name">Player 2 Name</Label>
                <Input
                  id="player2Name"
                  name="player2Name"
                  value={state.player2Name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalRounds">Number of Rounds</Label>
                <Input
                  id="totalRounds"
                  name="totalRounds"
                  type="number"
                  min={1}
                  max={10}
                  value={state.totalRounds}
                  onChange={(e) => setState(prev => ({
                    ...prev,
                    totalRounds: Number.parseInt(e.target.value) || 3
                  }))}
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Link href="/">
                <Button variant="outline">Back</Button>
              </Link>
              <Button
                onClick={handleStartGame}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Start Game
              </Button>
            </CardFooter>
          </Card>
        );

      case 'player1-choose':
      case 'player2-choose':
        const currentPlayerChoosing = state.phase === 'player1-choose' ? state.player1Name : state.player2Name;
        const otherPlayer = state.phase === 'player1-choose' ? state.player2Name : state.player1Name;

        return (
          <Card className="shadow-lg border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-600 dark:text-purple-400">
                {currentPlayerChoosing}'s Turn
              </CardTitle>
              <CardDescription>
                Think of a character for {otherPlayer} to guess
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-center mb-4">
                Round {state.currentRound} of {state.totalRounds}
              </p>

              <div className="space-y-2">
                <Label htmlFor="character">Your Character</Label>
                <Input
                  id="character"
                  name="character"
                  placeholder="Enter the name of your character"
                  value={state.phase === 'player1-choose' ? state.player1Character : state.player2Character}
                  onChange={(e) => {
                    if (state.phase === 'player1-choose') {
                      setState(prev => ({
                        ...prev,
                        player1Character: e.target.value
                      }));
                    } else {
                      setState(prev => ({
                        ...prev,
                        player2Character: e.target.value
                      }));
                    }
                  }}
                />
              </div>

              <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-md text-yellow-800 dark:text-yellow-200">
                <p className="text-sm">
                  <strong>Important:</strong> Keep this character in mind! At the end of the guessing,
                  you'll need to confirm if the AI guessed correctly.
                </p>
              </div>
            </CardContent>

            <CardFooter className="justify-end">
              <Button
                onClick={() => handleCharacterSubmit(
                  state.phase === 'player1-choose' ? 'player1' : 'player2',
                  state.phase === 'player1-choose' ? state.player1Character : state.player2Character
                )}
                className="bg-purple-600 hover:bg-purple-700"
                disabled={
                  (state.phase === 'player1-choose' && !state.player1Character) ||
                  (state.phase === 'player2-choose' && !state.player2Character)
                }
              >
                Confirm Character
              </Button>
            </CardFooter>
          </Card>
        );

      case 'player1-guess':
      case 'player2-guess':
        const currentPlayerGuessing = state.phase === 'player1-guess' ? state.player1Name : state.player2Name;
        const targetCharacter = state.phase === 'player1-guess' ? state.player2Character : state.player1Character;

        return (
          <div className="w-full max-w-md">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {currentPlayerGuessing}'s Turn to Guess
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Try to guess: {targetCharacter}
              </p>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                <span>Round {state.currentRound} of {state.totalRounds}</span>
                <span>
                  Score: {state.player1Name} {state.player1Score} - {state.player2Score} {state.player2Name}
                </span>
              </div>
            </div>

            {state.gameState && (
              <>
                <Progress
                  value={state.gameState.progress}
                  className="h-2 bg-purple-100 dark:bg-purple-950 mb-6"
                />

                {state.gameState.gameOver ? (
                  <ResultCard
                    character={state.gameState.guessedCharacter}
                    confidence={state.gameState.confidence}
                    possibleCharacters={state.gameState.possibleCharacters}
                    onRestart={() => {}} // Not needed for multiplayer
                  />
                ) : (
                  <QuestionCard
                    question={state.gameState.currentQuestion?.text || ''}
                    onAnswer={handleAnswer}
                  />
                )}
              </>
            )}
          </div>
        );

      case 'results':
        const winner = state.player1Score > state.player2Score
          ? state.player1Name
          : state.player2Score > state.player1Score
            ? state.player2Name
            : 'Tie';

        const isTie = state.player1Score === state.player2Score;

        return (
          <Card className="shadow-lg border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-600 dark:text-purple-400">
                Game Results
              </CardTitle>
              <CardDescription>
                Final scores after {state.totalRounds} rounds
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 text-center">
              <div className="text-3xl font-bold mb-6">
                {isTie ? "It's a Tie!" : `${winner} Wins!`}
              </div>

              <div className="flex justify-center items-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-xl font-semibold">{state.player1Name}</div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{state.player1Score}</div>
                </div>

                <div className="text-2xl font-bold">vs</div>

                <div className="text-center">
                  <div className="text-xl font-semibold">{state.player2Name}</div>
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">{state.player2Score}</div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Link href="/">
                <Button variant="outline">Home</Button>
              </Link>
              <Button
                onClick={handlePlayAgain}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Play Again
              </Button>
            </CardFooter>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        {renderPhase()}
      </div>
    </div>
  );
}
