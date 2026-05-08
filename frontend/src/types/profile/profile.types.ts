// ── Попытка теста (приходит внутри UserProfileResponse) ──────────
export interface TestAttemptProfile {
  testId: number;
  testTitle: string;
  completedAt: string; // ISO-дата
  score: number;
}

// ── Главный ответ GET /api/users ──────────────────────────────────
export interface UserProfileResponse {
  name: string;
  email: string;
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
