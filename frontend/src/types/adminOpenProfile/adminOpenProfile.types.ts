// ============================================================
// adminOpenProfile.types.ts
// ============================================================

export interface TestAttemptProfile {
    id: number;
    testName: string;
    totalScore: number;
    completedAt: string;
}

export interface UserProfileResponse {
    name: string;
    email: string;
    attempts: TestAttemptProfile[];
    totalScore: number;
    totalScoreThinking: number;
    totalScoreAffiliation: number;
    totalScoreFlexibility: number;
    totalScoreExperience: number;
}

export interface AdminOpenUserProfile {
    id: number;
    userProfileResponse: UserProfileResponse;
    privateComment: string | null;
}

export interface WriteCommentRequest {
    userId: number;
    comment: string;
}
