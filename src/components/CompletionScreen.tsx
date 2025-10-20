'use client';

import { motion } from 'framer-motion';
import { BibleVerse } from '@/data/bibleVerses';
import { Praise } from '@/data/praises';
import { Share2, Home, Clock } from 'lucide-react';

interface CompletionScreenProps {
  verse: BibleVerse;
  praise: Praise;
  nextUpdate: number;
  onHome: () => void;
  onShare: () => void;
}

export default function CompletionScreen({ 
  verse, 
  praise, 
  nextUpdate, 
  onHome, 
  onShare 
}: CompletionScreenProps) {
  const getTimeUntilNext = () => {
    const now = Date.now();
    const diff = nextUpdate - now;
    
    if (diff <= 0) return { hours: 0, minutes: 0 };
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { hours, minutes };
  };

  const { hours, minutes } = getTimeUntilNext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center p-6"
    >
      <div className="max-w-2xl w-full">
        {/* 완료 메시지 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            오늘의 말씀과 찬양
          </h1>
          <p className="text-xl text-yellow-200/80">
            평안히 가거라, 어린양아
          </p>
        </motion.div>

        {/* 오늘의 말씀 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 mb-8 shadow-2xl"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-yellow-300 mb-6">오늘의 말씀</h2>
            <blockquote className="text-xl md:text-2xl font-serif leading-relaxed text-white mb-6">
              &ldquo;{verse.text}&rdquo;
            </blockquote>
            <cite className="text-lg text-yellow-200">
              - {verse.book} {verse.chapter}장 {verse.verse}절
            </cite>
          </div>
        </motion.div>

        {/* 찬양 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 mb-8 shadow-2xl"
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-yellow-300 mb-2">오늘의 찬양</h3>
            <p className="text-lg text-white">{praise.title}</p>
            <p className="text-sm text-yellow-200/80">{praise.artist}</p>
          </div>
        </motion.div>

        {/* 다음 업데이트 시간 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-400/30">
            <Clock className="w-5 h-5 text-purple-300" />
            <span className="text-purple-200">
              다음 콘텐츠까지 {hours}시간 {minutes}분 남음
            </span>
          </div>
        </motion.div>

        {/* 액션 버튼들 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onShare}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg"
          >
            <Share2 className="w-5 h-5" />
            공유하기
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onHome}
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg"
          >
            <Home className="w-5 h-5" />
            홈으로
          </motion.button>
        </motion.div>

        {/* 하단 메시지 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-white/60">
            내일 다시 만나요 ✨
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
