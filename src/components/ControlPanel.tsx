'use client';

import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Share2, Heart } from 'lucide-react';

interface ControlPanelProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkip: () => void;
  onPrevious: () => void;
  onShare: () => void;
  onFavorite: () => void;
  currentTime: number;
  duration: number;
}

export default function ControlPanel({
  isPlaying,
  onPlayPause,
  onSkip,
  onPrevious,
  onShare,
  onFavorite,
  currentTime,
  duration
}: ControlPanelProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20"
    >
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 shadow-2xl">
        {/* 컨트롤 버튼들 */}
        <div className="flex items-center gap-4 mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onPrevious}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <SkipBack className="w-5 h-5 text-white" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onPlayPause}
            className="p-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 transition-all shadow-lg"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-0.5" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onSkip}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <SkipForward className="w-5 h-5 text-white" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onFavorite}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Heart className="w-5 h-5 text-white" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onShare}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Share2 className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* 진행 바 */}
        <div className="w-full bg-white/20 rounded-full h-1 mb-2">
          <motion.div
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-1 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentTime / duration) * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* 시간 표시 */}
        <div className="flex justify-between text-sm text-white/70">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </motion.div>
  );
}
