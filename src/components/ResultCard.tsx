'use client';

import type { Character } from '@/lib/characters';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ResultCardProps {
  character: Character | null;
  confidence: number;
  possibleCharacters: Character[];
  onRestart: () => void;
}

export default function ResultCard({
  character,
  confidence,
  possibleCharacters,
  onRestart
}: ResultCardProps) {
  if (!character) {
    return (
      <Card className="w-full shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-red-600">I couldn't guess your character!</CardTitle>
          <CardDescription>I need to improve my knowledge base.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p>Try again with a different character.</p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={onRestart}>Play Again</Button>
        </CardFooter>
      </Card>
    );
  }

  // Format confidence percentage
  const confidencePercentage = Math.round(confidence);

  return (
    <Card className="w-full shadow-lg border-blue-200 dark:border-blue-800">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">
          I think your character is...
        </CardTitle>
        <CardDescription>
          With {confidencePercentage}% confidence
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center">
        <div className="relative w-40 h-40 mb-4 overflow-hidden rounded-lg">
          <Image
            src={character.image || '/characters/placeholder.jpg'}
            alt={character.name}
            width={160}
            height={160}
            className="object-cover"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              e.currentTarget.src = '/characters/placeholder.jpg';
            }}
          />
        </div>

        <h3 className="text-xl font-bold mb-2">{character.name}</h3>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
          {character.description}
        </p>

        {possibleCharacters.length > 1 && (
          <div className="w-full mt-4">
            <h4 className="text-sm font-semibold mb-2">Other possibilities:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400">
              {possibleCharacters.slice(1, 4).map((char) => (
                <li key={char.id} className="mb-1">{char.name}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>

      <CardFooter className="justify-center">
        <Button onClick={onRestart} className="bg-blue-600 hover:bg-blue-700">
          Play Again
        </Button>
      </CardFooter>
    </Card>
  );
}
