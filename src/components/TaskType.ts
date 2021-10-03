export type Task = {
    id: number;
    date: string;
    title: string;
    done: boolean;
    season?: 'future' | 'recent' | 'over';
};