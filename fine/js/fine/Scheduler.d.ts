export interface ITimeTask {
    nextTime: number;
    endTime: number;
    period: number;
    callback: () => void;
}
export declare class Scheduler {
    static executeFrame(): void;
    static addTimeTask(callback: () => void, start: number, period?: number, duration?: number): {
        nextTime: number;
        endTime: number;
        period: number;
        callback: () => void;
    };
    static removeTimeTask(task: any): void;
}
