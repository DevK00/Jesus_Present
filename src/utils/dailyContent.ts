import { bibleVerses, BibleVerse } from '@/data/bibleVerses';
import { praises, Praise } from '@/data/praises';

export interface DailyContent {
  verse: BibleVerse;
  praise: Praise;
  date: string;
  nextUpdate: number;
}

/**
 * 24시간마다 갱신되는 일일 콘텐츠를 생성합니다.
 * 같은 날에는 항상 같은 콘텐츠가 반환됩니다.
 */
export function getDailyContent(): DailyContent {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // 시드 기반으로 일관된 콘텐츠 선택
  const seed = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  const verseIndex = seed % bibleVerses.length;
  const praiseIndex = seed % praises.length;
  
  return {
    verse: bibleVerses[verseIndex],
    praise: praises[praiseIndex],
    date: today.toISOString().split('T')[0],
    nextUpdate: tomorrow.getTime()
  };
}

/**
 * 다음 콘텐츠까지 남은 시간을 계산합니다.
 */
export function getTimeUntilNextUpdate(nextUpdate: number): {
  hours: number;
  minutes: number;
  seconds: number;
} {
  const now = Date.now();
  const diff = nextUpdate - now;
  
  if (diff <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { hours, minutes, seconds };
}

/**
 * 로컬 스토리지에서 마지막 방문 정보를 가져옵니다.
 */
export function getLastVisitInfo(): { lastContent: DailyContent | null; shouldUpdate: boolean } {
  if (typeof window === 'undefined') {
    return { lastContent: null, shouldUpdate: true };
  }
  
  const lastVisit = localStorage.getItem('lastVisit');
  const lastContentStr = localStorage.getItem('lastContent');
  
  if (!lastVisit || !lastContentStr) {
    return { lastContent: null, shouldUpdate: true };
  }
  
  const lastVisitTime = parseInt(lastVisit);
  const lastContent = JSON.parse(lastContentStr) as DailyContent;
  const now = Date.now();
  
  // 24시간이 지났거나 날짜가 바뀌었으면 업데이트
  const shouldUpdate = (now - lastVisitTime) > (24 * 60 * 60 * 1000) || 
                      lastContent.date !== new Date().toISOString().split('T')[0];
  
  return { lastContent: shouldUpdate ? null : lastContent, shouldUpdate };
}

/**
 * 로컬 스토리지에 방문 정보를 저장합니다.
 */
export function saveVisitInfo(content: DailyContent): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('lastVisit', Date.now().toString());
  localStorage.setItem('lastContent', JSON.stringify(content));
}
