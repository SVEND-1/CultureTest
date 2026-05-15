// ── Попытка теста (приходит внутри UserProfileResponse) ──────────
export interface TestAttemptProfile {
    id: number;
    testName: string;
    completedAt: string;
    totalScore: number;
}

// ── Главный ответ GET /api/users ──────────────────────────────────
export interface UserProfileResponse {
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  attempts: TestAttemptProfile[];
  totalScore: number | null;
  totalScoreThinking: number | null;
  totalScoreAffiliation: number | null;
  totalScoreFlexibility: number | null;
  totalScoreExperience: number | null;
}

// ── Состояние хука useProfile ─────────────────────────────────────
export interface ProfileState {
  data: UserProfileResponse | null;
  loading: boolean;
  error: string | null;
}
