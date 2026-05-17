// ============================================================
// test.types.ts — типы для страницы прохождения теста
// ============================================================

export type QuestionType = 'SINGLE' | 'MULTIPLE' | 'TEXT';

export interface AnswerOption {
    id: number;
    text: string;
    isCorrect: boolean;
}

export interface Question {
    id: number;
    text: string;
    type: QuestionType;
    answerOptions: AnswerOption[];
    createAt: string;
}

export interface TestInfo {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
}

/** GET /api/tests/{id} */
export interface TestResponse {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    questions: Question[];
}

export interface AnswerUser {
    id: number;
    questionId: number;
    selectedAnswerId: number;
    isCorrect: boolean;
    completedAt: string;
}

/** POST /api/test-attempts/start → TestAttempt */
export interface TestAttempt {
    id: number;
    userId: number;
    testId: number;
    startedAt: string;
    completedAt: string | null;
    totalScore: number | null;
    userAnswers: AnswerUser[];
}

/** POST /api/test-attempts/{attemptId}/finish → TestAttemptFinish */
export interface TestAttemptFinish {
    totalScore: number;
    scoreThinking: number;
    scoreAffiliation: number;
    scoreFlexibility: number;
    scoreExperience: number;
}

/** POST /api/answer-users/{attemptId}/answer body */
export interface SubmitAnswerRequest {
    questionId: number;
    selectedAnswerId: number;
}
