export interface Praise {
  id: number;
  title: string;
  artist: string;
  duration: number;
  lyrics: PraiseLyric[];
  backgroundVideo: string;
  theme: string;
}

export interface PraiseLyric {
  time: number;
  text: string;
  highlight: boolean;
}

export const praises: Praise[] = [
  {
    id: 1,
    title: "주님의 마음",
    artist: "편곡 버전",
    duration: 180,
    backgroundVideo: "praise_001_bg.mp4",
    theme: "사랑",
    lyrics: [
      { time: 0, text: "주님의 마음 내 안에 가득", highlight: true },
      { time: 4.5, text: "주님의 사랑 내게 넘치네", highlight: false },
      { time: 9.0, text: "이 세상 모든 것보다", highlight: false },
      { time: 13.5, text: "주님만이 나의 전부", highlight: true },
      { time: 18.0, text: "주님의 마음 내 안에 가득", highlight: false },
      { time: 22.5, text: "주님의 사랑 내게 넘치네", highlight: false }
    ]
  },
  {
    id: 2,
    title: "평안의 강",
    artist: "편곡 버전",
    duration: 200,
    backgroundVideo: "praise_002_bg.mp4",
    theme: "평화",
    lyrics: [
      { time: 0, text: "평안의 강이 흘러가네", highlight: true },
      { time: 5.0, text: "내 마음 깊은 곳으로", highlight: false },
      { time: 10.0, text: "모든 걱정과 근심을", highlight: false },
      { time: 15.0, text: "주님께 맡기고", highlight: true },
      { time: 20.0, text: "평안의 강이 흘러가네", highlight: false },
      { time: 25.0, text: "내 마음 깊은 곳으로", highlight: false }
    ]
  },
  {
    id: 3,
    title: "새벽의 빛",
    artist: "편곡 버전",
    duration: 160,
    backgroundVideo: "praise_003_bg.mp4",
    theme: "희망",
    lyrics: [
      { time: 0, text: "새벽의 빛이 비치네", highlight: true },
      { time: 4.0, text: "어둠을 밝혀주시는", highlight: false },
      { time: 8.0, text: "주님의 사랑으로", highlight: false },
      { time: 12.0, text: "새로운 하루를", highlight: true },
      { time: 16.0, text: "새벽의 빛이 비치네", highlight: false },
      { time: 20.0, text: "어둠을 밝혀주시는", highlight: false }
    ]
  }
];
