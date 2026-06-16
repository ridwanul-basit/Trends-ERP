import type { Zone } from "./zone";

export type ParticipantSource = "WEBSITE" | "DATA_ENTRY" | "SMS_DEFERRED";
export type ParticipantStatus = "ACTIVE" | "INACTIVE" | "ON_HOLD" | "DISQUALIFIED";

export type Participant = {
  id: string;
  seasonId: string;
  registrationId: string;
  name: string;
  age: number;
  className: string;
  mobile: string;
  zoneId: string;
  schoolName?: string | null;
  district?: string | null;
  guardianMobile?: string | null;
  consent: boolean;
  source: ParticipantSource;
  status: ParticipantStatus;
  createdById?: string | null;
  createdAt: string;
  updatedAt: string;
  zone?: Zone; // Joined from zone relation
};
