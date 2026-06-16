import type { Season } from "./season";
import type { Participant } from "./participant";

export type Round = {
  id: string;
  seasonId: string;
  name: string;
  sortOrder: number;
  startsAt: string | null;
  endsAt: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: {
    participants: number;
    questions: number;
  };
  season?: Season;
};

export type RoundParticipant = Participant & {
  selectedAt: string;
};
