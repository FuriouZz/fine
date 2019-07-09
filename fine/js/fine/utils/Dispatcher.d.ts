export declare type IDispatcherListener<T> = (data?: T) => void;
export interface IDispatcherListenerItem<T> {
    fn: IDispatcherListener<T>;
    once: boolean;
}
export declare class Dispatcher<T> {
    listeners: Array<IDispatcherListenerItem<T>>;
    on(listener: IDispatcherListener<T>): void;
    once(listener: IDispatcherListener<T>): void;
    off(listener: IDispatcherListener<T>): void;
    dispatch(data?: T): void;
}
