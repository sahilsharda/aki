'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface QuestionCardProps {
  question: string;
  onAnswer: (answer: 'yes' | 'no' | 'unknown') => void;
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.8,
    rotateX: -20
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.8,
    rotateX: 20,
    transition: {
      duration: 0.3
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.95
  }
};

export default function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="glass-effect neon-border rounded-lg p-8 hover-scale"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
      >
        <div className="flex flex-col items-center gap-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: -20 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
              }
            }}
            className="relative w-40 h-40"
            style={{
              filter: "drop-shadow(0 0 20px rgba(147, 51, 234, 0.5))"
            }}
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="relative w-full h-full"
            >
              <Image
                src="/akinator.svg"
                alt="Akinator"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                delay: 0.2
              }
            }}
            className="text-3xl font-bold text-center gradient-text"
            style={{
              textShadow: "0 0 20px rgba(147, 51, 234, 0.5)"
            }}
          >
            {question}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                delay: 0.4
              }
            }}
            className="flex gap-6"
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => onAnswer('yes')}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full 
                hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg 
                hover:shadow-purple-500/50 relative overflow-hidden group"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">Yes</span>
            </motion.button>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => onAnswer('no')}
              className="px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full 
                hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-lg 
                hover:shadow-pink-500/50 relative overflow-hidden group"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-400/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">No</span>
            </motion.button>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => onAnswer('unknown')}
              className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-full 
                hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg 
                hover:shadow-gray-500/50 relative overflow-hidden group"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-gray-400/20 to-gray-500/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">Don't Know</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
