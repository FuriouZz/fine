import { List } from "lol/js/list";
export declare type Listener<T> = (data: T) => void;
interface ListenerObject<T> {
    once: boolean;
    fn: Listener<T>;
}
export declare class Dispatcher<T> {
    listeners: List<ListenerObject<T>>;
    on(listener: Listener<T>): void;
    once(listener: Listener<T>): void;
    off(listener: Listener<T>): void;
    dispatch(data?: T): void;
}
export {};
