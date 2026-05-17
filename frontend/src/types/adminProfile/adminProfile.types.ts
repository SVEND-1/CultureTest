// ============================================================
// adminProfile.types.ts
// ============================================================

export interface AdminInfo {
    name: string;
    email: string;
    role: string;
}

export interface AdminTest {
    id: number;
    title: string;
    description: string;
    questionsCount: number;
    isActive: boolean;
}

export interface TestAttemptAdmin {
    id: number;
    userName: string;
    userId: number;
    testId: number;
    completedAt: string;
    totalScore: number;
}

export interface AdminProfileResponse {
    attempts: TestAttemptAdmin[];
    tests: AdminTest[];
}

/** POST /api/admin/ai */
export interface UserAI {
    id: number;
    name: string;
    totalScore: string;
    recommendation: string;
}
