'use client';

import { useState } from 'react';
import type { Category, DifficultyLevel } from '@/lib/game-logic';
import Game from '@/components/Game';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import Link from 'next/link';

export default function PlayPage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [category, setCategory] = useState<Category>('all');

  const handleStartGame = () => {
    setGameStarted(true);
  };

  if (gameStarted) {
    return <Game difficulty={difficulty} category={category} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="shadow-lg border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">Game Settings</CardTitle>
            <CardDescription>Choose your preferences before starting</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty Level</label>
              <Select
                value={difficulty}
                onValueChange={(value) => setDifficulty(value as DifficultyLevel)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy (More questions, easier guessing)</SelectItem>
                  <SelectItem value="medium">Medium (Default)</SelectItem>
                  <SelectItem value="hard">Hard (Fewer questions, harder to guess)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Character Category</label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value as Category)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="movies">Movies</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="games">Video Games</SelectItem>
                  <SelectItem value="history">Historical Figures</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="cartoons">Cartoons & Animation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Link href="/">
              <Button variant="outline">Back</Button>
            </Link>
            <Button
              onClick={handleStartGame}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Start Game
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
