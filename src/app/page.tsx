import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">Akinator</h1>
        <p className="text-gray-600 dark:text-gray-400">Think of a character and I will guess it!</p>
      </div>

      <div className="grid grid-cols-1 gap-6 w-full max-w-md">
        <Card className="shadow-lg border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Single Player</CardTitle>
            <CardDescription>Play against the AI</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Think of a character and answer questions to see if the AI can guess who it is!
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/play" className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Play Now</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="shadow-lg border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Multiplayer</CardTitle>
            <CardDescription>Challenge a friend</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Take turns answering questions and trying to guess each other's characters!
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/multiplayer" className="w-full">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">Start Multiplayer</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="shadow-lg border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Contribute</CardTitle>
            <CardDescription>Add new characters</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Help improve the game by adding characters to our database!
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/contribute" className="w-full">
              <Button className="w-full bg-green-600 hover:bg-green-700">Add Character</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
