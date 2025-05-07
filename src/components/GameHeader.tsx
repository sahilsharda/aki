'use client';

import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface GameHeaderProps {
  progress: number;
  questionsAsked: number;
  difficulty: string;
  category: string;
}

export default function GameHeader({
  progress,
  questionsAsked,
  difficulty,
  category,
}: GameHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Questions Asked:
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              {questionsAsked}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Difficulty:
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </motion.div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <motion.span
              className="text-sm font-medium text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Progress
            </motion.span>
            <motion.span
              className="text-sm font-medium bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {Math.round(progress)}%
            </motion.span>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Category:
          </span>
          <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
