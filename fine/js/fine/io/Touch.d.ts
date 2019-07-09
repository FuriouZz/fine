export declare class Touch {
    _x: number;
    _y: number;
    keys: {};
    debug: boolean;
    constructor();
    activate($el: Element | Window): void;
    desactivate($el: Element | Window): void;
    readonly x: number;
    readonly y: number;
    getKey(code: number): any;
    touchstart(code: number): any;
    touchend(code: number): any;
    tap(code: number): any;
    onTouch(e: TouchEvent): void;
    onUpdate(): void;
    static get(): any;
}
