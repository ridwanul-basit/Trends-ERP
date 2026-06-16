export type Zone = {
  id: string;
  name: string;
  code: string;
  divisionName: string;
  auditionDate: string | null;
  isRegistrationOpen: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  participantCount?: number;
};
