export type Question = {
  id: string;
  roundId: string;
  questionText: string;
  answerText: string;
  normalizedAnswer: string;
  sortOrder: number;
  points: number;
  createdAt: string;
  updatedAt: string;
};

export type LeaderboardEntry = {
  rank: number;
  roundParticipantId: string;
  participantId: string;
  registrationId: string;
  name: string;
  mobile: string;
  zoneId: string;
  zoneName: string;
  status: string;
  score: number;
  correctCount: number;
  answeredCount: number;
  lastAnsweredAt: string | null;
};
