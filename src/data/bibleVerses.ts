export interface BibleVerse {
  id: number;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  category: string[];
  backgroundImage: string;
}

export const bibleVerses: BibleVerse[] = [
  {
    id: 1,
    book: "요한복음",
    chapter: 3,
    verse: 16,
    text: "하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라",
    category: ["사랑", "구원"],
    backgroundImage: "love_theme.jpg"
  },
  {
    id: 2,
    book: "시편",
    chapter: 23,
    verse: 1,
    text: "여호와는 나의 목자시니 내게 부족함이 없으리로다",
    category: ["평화", "안전"],
    backgroundImage: "peace_theme.jpg"
  },
  {
    id: 3,
    book: "이사야",
    chapter: 40,
    verse: 31,
    text: "오직 여호와를 앙망하는 자는 새 힘을 얻으리니 독수리가 날개를 치며 올라감 같을 것이요 달음박질하여도 곤비하지 아니하며 걸어가도 피곤하지 아니하리로다",
    category: ["희망", "힘"],
    backgroundImage: "hope_theme.jpg"
  },
  {
    id: 4,
    book: "마태복음",
    chapter: 11,
    verse: 28,
    text: "수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라",
    category: ["위로", "휴식"],
    backgroundImage: "comfort_theme.jpg"
  },
  {
    id: 5,
    book: "로마서",
    chapter: 8,
    verse: 28,
    text: "우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라",
    category: ["신뢰", "선"],
    backgroundImage: "trust_theme.jpg"
  },
  {
    id: 6,
    book: "빌립보서",
    chapter: 4,
    verse: 13,
    text: "내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라",
    category: ["능력", "자신감"],
    backgroundImage: "strength_theme.jpg"
  },
  {
    id: 7,
    book: "요한일서",
    chapter: 4,
    verse: 19,
    text: "우리가 사랑함은 그가 먼저 우리를 사랑하셨음이라",
    category: ["사랑", "감사"],
    backgroundImage: "gratitude_theme.jpg"
  },
  {
    id: 8,
    book: "시편",
    chapter: 46,
    verse: 1,
    text: "하나님은 우리의 피난처시요 힘이시니 환난 중에 만날 수 있는 도움이시라",
    category: ["보호", "힘"],
    backgroundImage: "protection_theme.jpg"
  }
];
