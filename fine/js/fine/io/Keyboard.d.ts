export declare class Keyboard {
    keys: {};
    debug: boolean;
    constructor($el?: Element | Window);
    activate($el?: Element | Window): void;
    desactivate($el?: Element | Window): void;
    getKey(code: string): any;
    onKey(e: KeyboardEvent): void;
    onUpdate(): void;
    keyup(code: string): any;
    keydown(code: string): any;
    keypress(code: string): any;
    static get(): Keyboard;
}
