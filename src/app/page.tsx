'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const features = [
  {
    title: "Single Player Mode",
    description: "Challenge yourself against Akinator's AI. Think of a character and answer questions to see if Akinator can guess it!",
    icon: "🎮"
  },
  {
    title: "Multiplayer Mode",
    description: "Play with friends! One person thinks of a character while others help Akinator guess through questions.",
    icon: "👥"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

export default function Home() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<'single' | 'multiplayer' | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleModeSelect = (mode: 'single' | 'multiplayer') => {
    setSelectedMode(mode);
    setShowModal(true);
  };

  const handleStartGame = () => {
    if (selectedMode === 'single') {
      router.push('/play');
    } else if (selectedMode === 'multiplayer') {
      router.push('/multiplayer');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMode(null);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen py-12 px-4"
    >
      {/* Hero Section */}
      <motion.div
        variants={itemVariants}
        className="text-center mb-16"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="relative w-48 h-48 mx-auto mb-8"
        >
          <Image
            src="/akinator.svg"
            alt="Akinator"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
        <h1 className="text-5xl font-bold mb-4 gradient-text">
          Welcome to Akinator Game
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Think of a character, and let Akinator try to guess who you're thinking of!
          Answer yes/no questions and watch as the AI narrows down the possibilities.
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="glass-effect neon-border p-6 rounded-lg"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2 gradient-text">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Game Modes */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row gap-8 justify-center max-w-4xl mx-auto"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass-effect neon-border p-8 rounded-lg text-center cursor-pointer flex-1"
          onClick={() => handleModeSelect('single')}
        >
          <h2 className="text-2xl font-bold mb-4 gradient-text">Single Player</h2>
          <p className="text-gray-300 mb-4">Challenge yourself against Akinator's AI</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full 
              hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg 
              hover:shadow-purple-500/50"
          >
            Start Game
          </motion.button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass-effect neon-border p-8 rounded-lg text-center cursor-pointer flex-1"
          onClick={() => handleModeSelect('multiplayer')}
        >
          <h2 className="text-2xl font-bold mb-4 gradient-text">Multiplayer</h2>
          <p className="text-gray-300 mb-4">Play with friends and family</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full 
              hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-lg 
              hover:shadow-pink-500/50"
          >
            Start Game
          </motion.button>
        </motion.div>
      </motion.div>

      {/* How to Play */}
      <motion.div
        variants={itemVariants}
        className="mt-16 max-w-2xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-6 gradient-text">How to Play</h2>
        <div className="glass-effect neon-border p-6 rounded-lg">
          <ol className="text-left space-y-4 text-gray-300">
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">1.</span>
              Think of a character from movies, games, books, or any category
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">2.</span>
              Answer Akinator's yes/no questions about your character
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">3.</span>
              Watch as Akinator narrows down the possibilities
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">4.</span>
              See if Akinator can guess your character!
            </li>
          </ol>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-lg p-6 max-w-md w-full glass-effect"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-white">
                Start {selectedMode === 'single' ? 'Single Player' : 'Multiplayer'} Game?
              </h2>
              <p className="text-gray-300 mb-6">
                {selectedMode === 'single'
                  ? 'You will play against Akinator\'s AI. Think of a character and answer the questions!'
                  : 'You will play with friends. One person thinks of a character while others ask questions!'}
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartGame}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
                >
                  Start Game
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
