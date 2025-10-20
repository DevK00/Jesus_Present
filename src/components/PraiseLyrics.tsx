'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Praise } from '@/data/praises';

interface PraiseLyricsProps {
  praise: Praise;
  currentTime: number;
  isPlaying: boolean;
  onComplete?: () => void;
}

export default function PraiseLyrics({ praise, currentTime, isPlaying, onComplete }: PraiseLyricsProps) {
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [nextLyricIndex, setNextLyricIndex] = useState(1);

  useEffect(() => {
    if (!isPlaying) return;

    const currentLyric = praise.lyrics.find((lyric, index) => {
      const nextLyric = praise.lyrics[index + 1];
      return currentTime >= lyric.time && (!nextLyric || currentTime < nextLyric.time);
    });

    if (currentLyric) {
      const index = praise.lyrics.indexOf(currentLyric);
      setCurrentLyricIndex(index);
      setNextLyricIndex(index + 1);
    }
  }, [currentTime, praise.lyrics, isPlaying]);

  useEffect(() => {
    if (currentTime >= praise.duration && onComplete) {
      onComplete();
    }
  }, [currentTime, praise.duration, onComplete]);

  const currentLyric = praise.lyrics[currentLyricIndex];
  const nextLyric = praise.lyrics[nextLyricIndex];

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-6">
      {/* 찬양 제목 */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
          {praise.title}
        </h2>
        <p className="text-lg text-yellow-200/80">
          {praise.artist}
        </p>
      </motion.div>

      {/* 가사 영역 */}
      <div className="min-h-[300px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentLyric && (
            <motion.div
              key={currentLyricIndex}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="text-center mb-8"
            >
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
                <motion.p
                  className={`text-2xl md:text-4xl lg:text-5xl font-medium leading-relaxed ${
                    currentLyric.highlight 
                      ? 'text-yellow-300 font-bold' 
                      : 'text-white'
                  } drop-shadow-lg`}
                  animate={currentLyric.highlight ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {currentLyric.text}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 다음 가사 미리보기 */}
        {nextLyric && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <p className="text-lg md:text-xl text-white/50">
              {nextLyric.text}
            </p>
          </motion.div>
        )}
      </div>

      {/* 진행 바 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8"
      >
        <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm">
          <motion.div
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentTime / praise.duration) * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="flex justify-between text-sm text-white/70 mt-2">
          <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(0).padStart(2, '0')}</span>
          <span>{Math.floor(praise.duration / 60)}:{(praise.duration % 60).toFixed(0).padStart(2, '0')}</span>
        </div>
      </motion.div>
    </div>
  );
}
