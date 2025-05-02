'use client';

import type { Answer } from '@/lib/game-logic';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface QuestionCardProps {
  question: string;
  onAnswer: (answer: Answer) => void;
}

export default function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  return (
    <Card className="w-full shadow-lg border-blue-200 dark:border-blue-800">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">I'm thinking...</CardTitle>
        <CardDescription>Answer the questions so I can guess your character</CardDescription>
      </CardHeader>

      <div className="flex justify-center my-4">
        <div className="relative w-20 h-20">
          <Image
            src="/akinator.png"
            alt="Akinator"
            width={80}
            height={80}
            className="object-contain"
            style={{ objectFit: 'contain' }}
            onError={(e) => {
              // Fallback to a question mark if image fails to load
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzYjgyZjYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1oZWxwLWNpcmNsZSI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48cGF0aCBkPSJNOS4wOSA5YTMgMyAwIDAgMSA1LjgzIDFjMCAyLTMgMy0zIDMiLz48cGF0aCBkPSJNMTIgMTd2LjAxIi8+PC9zdmc+';
            }}
          />
        </div>
      </div>

      <CardContent className="text-center">
        <p className="text-xl font-medium mb-8 min-h-[60px]">{question}</p>
      </CardContent>

      <CardFooter className="flex justify-between gap-2">
        <Button
          onClick={() => onAnswer('yes')}
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          Yes
        </Button>
        <Button
          onClick={() => onAnswer('no')}
          className="flex-1 bg-red-600 hover:bg-red-700"
        >
          No
        </Button>
        <Button
          onClick={() => onAnswer('unknown')}
          variant="outline"
          className="flex-1"
        >
          I don't know
        </Button>
      </CardFooter>
    </Card>
  );
}
