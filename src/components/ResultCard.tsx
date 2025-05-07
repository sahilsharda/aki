'use client';

import type { Character } from '@/lib/characters';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full shadow-lg glass-effect neon-border">
          <CardHeader className="text-center">
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent neon-glow">
                I couldn't guess your character!
              </CardTitle>
            </motion.div>
            <CardDescription className="text-lg mt-2 text-gray-300">I need to improve my knowledge base.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-xl text-gray-300">Try again with a different character.</p>
          </CardContent>
          <CardFooter className="justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onRestart}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg neon-border"
              >
                Play Again
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  // Format confidence percentage
  const confidencePercentage = Math.round(confidence);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full shadow-lg glass-effect neon-border">
        <CardHeader className="text-center pb-2">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent neon-glow">
              I think your character is...
            </CardTitle>
          </motion.div>
          <CardDescription className="text-lg mt-2 text-gray-300">
            With {confidencePercentage}% confidence
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center">
          <motion.div
            className="relative w-48 h-48 mb-6 overflow-hidden rounded-2xl shadow-xl neon-border"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
          >
            <Image
              src={character.image || '/characters/placeholder.jpg'}
              alt={character.name}
              width={192}
              height={192}
              className="object-cover"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                e.currentTarget.src = '/characters/placeholder.jpg';
              }}
            />
          </motion.div>

          <motion.h3
            className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent neon-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {character.name}
          </motion.h3>

          <motion.p
            className="text-center text-gray-300 mb-6 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {character.description}
          </motion.p>

          {possibleCharacters.length > 1 && (
            <motion.div
              className="w-full mt-4 p-4 glass-effect rounded-xl neon-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h4 className="text-lg font-semibold mb-3 text-gray-300">Other possibilities:</h4>
              <ul className="space-y-2">
                {possibleCharacters.slice(1, 4).map((char) => (
                  <motion.li
                    key={char.id}
                    className="text-gray-300 hover:text-purple-300 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {char.name}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </CardContent>

        <CardFooter className="justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={onRestart}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg neon-border"
            >
              Play Again
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
