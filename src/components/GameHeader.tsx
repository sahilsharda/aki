'use client';

import { Progress } from '@/components/ui/progress';
import type { DifficultyLevel, Category } from '@/lib/game-logic';
import { Badge } from '@/components/ui/badge';

interface GameHeaderProps {
  progress: number;
  questionsAsked: number;
  difficulty?: DifficultyLevel;
  category?: Category | null;
}

export default function GameHeader({
  progress,
  questionsAsked,
  difficulty = 'medium',
  category = null
}: GameHeaderProps) {

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  const getCategoryName = () => {
    if (!category || category === 'all') return null;

    const names: Record<string, string> = {
      'movies': 'Movies',
      'books': 'Books',
      'games': 'Games',
      'history': 'History',
      'sports': 'Sports',
      'cartoons': 'Cartoons',
    };

    return names[category] || category;
  };

  const categoryName = getCategoryName();

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Akinator</h1>
          <Badge className={getDifficultyColor()}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
          {categoryName && (
            <Badge variant="outline">
              {categoryName}
            </Badge>
          )}
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Questions: {questionsAsked}
        </span>
      </div>

      <Progress value={progress} className="h-2 bg-blue-100 dark:bg-blue-950" />
    </div>
  );
}
