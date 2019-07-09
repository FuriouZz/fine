export declare class Mouse {
    _x: number;
    _y: number;
    _movementX: number;
    _movementY: number;
    keys: {};
    debug: boolean;
    constructor();
    activate($el: Element | Window): void;
    desactivate($el: Element | Window): void;
    readonly x: number;
    readonly y: number;
    readonly movementX: number;
    readonly movementY: number;
    getKey(code: number): any;
    mouseup(code: number): any;
    mousedown(code: number): any;
    mousepress(code: number): any;
    onMouse(e: MouseEvent): void;
    onUpdate(): void;
    static get(): any;
}
