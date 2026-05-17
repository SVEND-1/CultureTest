export interface QuestionForm {
    id: number;
    text: string;
    category: QuestionType;
    answers: Answer[];
    correctAnswerIndex: number | null;
}

export interface Answer {
    id: number;
    text: string;
}

export type QuestionType =
    | 'THINKING'
    | 'AFFILIATION'
    | 'FLEXIBILITY'
    | 'EXPERIENCE';

export interface CreateTestForm {
    name: string;
    description: string;
    questions: QuestionForm[];
}

export interface TestResponse {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
}

export interface AnswerOptionRequest {
    text: string;
    isCorrect: boolean;
}

export interface CreateQuestionRequest {
    text: string;
    type: QuestionType;
    answerOptions: AnswerOptionRequest[];
}