export interface Test {
    id: number;
    title: string;
    description: string;
    questions: number;
    completed: boolean;
    tag: string;
}

export interface DigitalPillar {
    icon: string;
    title: string;
    description: string;
    color: string;
}