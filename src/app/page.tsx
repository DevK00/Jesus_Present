'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from '@/components/ParticleBackground';
import BibleVerseCard from '@/components/BibleVerseCard';
import PraiseLyrics from '@/components/PraiseLyrics';
import ControlPanel from '@/components/ControlPanel';
import CompletionScreen from '@/components/CompletionScreen';
import { getDailyContent, getLastVisitInfo, saveVisitInfo, DailyContent } from '@/utils/dailyContent';

type AppState = 'intro' | 'verse' | 'praise' | 'completion';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('intro');
  const [dailyContent, setDailyContent] = useState<DailyContent | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [, setVerseCompleted] = useState(false);

  // 일일 콘텐츠 로드
  useEffect(() => {
    const { lastContent, shouldUpdate } = getLastVisitInfo();
    
    if (shouldUpdate || !lastContent) {
      const newContent = getDailyContent();
      setDailyContent(newContent);
      saveVisitInfo(newContent);
    } else {
      setDailyContent(lastContent);
    }
  }, []);

  // 타이머 시뮬레이션 (오디오 없이)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && appState === 'praise' && dailyContent) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 0.1;
          if (newTime >= dailyContent.praise.duration) {
            setIsPlaying(false);
            setAppState('completion');
            return dailyContent.praise.duration;
          }
          return newTime;
        });
      }, 100);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, appState, dailyContent]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkip = () => {
    if (appState === 'verse') {
      setAppState('praise');
      setCurrentTime(0);
    } else if (appState === 'praise') {
      setAppState('completion');
      setIsPlaying(false);
    }
  };

  const handlePrevious = () => {
    if (appState === 'praise') {
      setAppState('verse');
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const handleShare = () => {
    if (dailyContent) {
      const shareText = `오늘의 말씀: "${dailyContent.verse.text}" - ${dailyContent.verse.book} ${dailyContent.verse.chapter}장 ${dailyContent.verse.verse}절`;
      if (navigator.share) {
        navigator.share({ text: shareText });
      } else {
        navigator.clipboard.writeText(shareText);
        alert('말씀이 클립보드에 복사되었습니다!');
      }
    }
  };

  const handleFavorite = () => {
    // 즐겨찾기 기능 (로컬 스토리지에 저장)
    if (dailyContent) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const newFavorite = {
        verse: dailyContent.verse,
        date: dailyContent.date
      };
      
      if (!favorites.find((fav: { verse: { id: number } }) => fav.verse.id === dailyContent.verse.id)) {
        favorites.push(newFavorite);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('즐겨찾기에 추가되었습니다!');
      } else {
        alert('이미 즐겨찾기에 추가된 말씀입니다.');
      }
    }
  };

  const handleHome = () => {
    setAppState('intro');
    setCurrentTime(0);
    setIsPlaying(false);
    setVerseCompleted(false);
  };

  const handleVerseComplete = () => {
    setVerseCompleted(true);
    setTimeout(() => {
      setAppState('praise');
    }, 2000);
  };

  if (!dailyContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 파티클 배경 */}
      <ParticleBackground />
      
      {/* 메인 콘텐츠 */}
      <AnimatePresence mode="wait">
        {appState === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <div className="text-center max-w-4xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold text-white mb-8 text-shadow-lg"
              >
                평안하느냐, 어린 양아.
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-xl md:text-2xl text-yellow-200/80 mb-12"
              >
                오늘의 말씀과 찬양으로 시작하는 하루
              </motion.p>
              
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAppState('verse')}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white px-8 py-4 rounded-full text-xl font-medium shadow-2xl glow-animation"
              >
                시작하기
              </motion.button>
            </div>
          </motion.div>
        )}

        {appState === 'verse' && (
          <motion.div
            key="verse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <BibleVerseCard 
              verse={dailyContent.verse} 
              onComplete={handleVerseComplete}
            />
          </motion.div>
        )}

        {appState === 'praise' && (
          <motion.div
            key="praise"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <PraiseLyrics
              praise={dailyContent.praise}
              currentTime={currentTime}
              isPlaying={isPlaying}
              onComplete={() => setAppState('completion')}
            />
          </motion.div>
        )}

        {appState === 'completion' && (
          <motion.div
            key="completion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CompletionScreen
              verse={dailyContent.verse}
              praise={dailyContent.praise}
              nextUpdate={dailyContent.nextUpdate}
              onHome={handleHome}
              onShare={handleShare}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 컨트롤 패널 */}
      {appState !== 'intro' && appState !== 'completion' && (
        <ControlPanel
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onSkip={handleSkip}
          onPrevious={handlePrevious}
          onShare={handleShare}
          onFavorite={handleFavorite}
          currentTime={currentTime}
          duration={appState === 'praise' ? dailyContent.praise.duration : 0}
        />
      )}
    </div>
  );
}
