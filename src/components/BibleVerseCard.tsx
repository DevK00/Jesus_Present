'use client';

import { motion } from 'framer-motion';
import { BibleVerse } from '@/data/bibleVerses';
import TypewriterText from './TypewriterText';

interface BibleVerseCardProps {
  verse: BibleVerse;
  onComplete?: () => void;
}

export default function BibleVerseCard({ verse, onComplete }: BibleVerseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative z-10 max-w-4xl mx-auto px-6"
    >
      {/* 글래스모피즘 카드 */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
        {/* 성경 구절 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mb-8"
        >
          <TypewriterText
            text={verse.text}
            speed={80}
            className="text-2xl md:text-4xl lg:text-5xl font-serif leading-relaxed text-white drop-shadow-lg"
            onComplete={onComplete}
          />
        </motion.div>

        {/* 출처 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-block bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 backdrop-blur-sm rounded-full px-6 py-3 border border-yellow-400/30">
            <p className="text-lg md:text-xl font-medium text-yellow-200">
              {verse.book} {verse.chapter}장 {verse.verse}절
            </p>
          </div>
        </motion.div>

        {/* 카테고리 태그 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="flex justify-center gap-2 mt-6 flex-wrap"
        >
          {verse.category.map((cat, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-500/20 text-purple-200 text-sm rounded-full border border-purple-400/30"
            >
              #{cat}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
