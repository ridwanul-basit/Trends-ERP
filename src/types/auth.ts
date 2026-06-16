export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role?: string;
  permissions: string[];
  img?: string | null;
  availability?: string;
  status?: string;
};

export type AuthSession = {
  user: SessionUser;
};

export type AdminUser = SessionUser;
