'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface GameModeCardProps {
    title: string;
    description: string;
    icon: string;
    onClick: () => void;
}

export default function GameModeCard({ title, description, icon, onClick }: GameModeCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            className="glass-effect rounded-lg p-6 cursor-pointer"
            onClick={onClick}
        >
            <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-4">
                    <Image
                        src={icon}
                        alt={title}
                        fill
                        className="object-contain"
                    />
                </div>
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                    {title}
                </h2>
                <p className="text-gray-300">
                    {description}
                </p>
            </div>
        </motion.div>
    );
} 