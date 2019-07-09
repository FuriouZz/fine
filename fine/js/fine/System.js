import { Scheduler } from "./Scheduler";
import { Dispatcher } from "./utils/Dispatcher";
let _INITED = false;
export class System {
    static init() {
        if (_INITED)
            return;
        _INITED = true;
        window.requestAnimationFrame(System.onRequestAnimationFrame);
        window.addEventListener('resize', System.onResize);
    }
    static getTime() {
        return window.performance.now() / 1000;
    }
    static onRequestAnimationFrame() {
        window.requestAnimationFrame(System.onRequestAnimationFrame);
        const time = System.getTime();
        System.delta = time - System.time;
        System.time = time;
        Scheduler.executeFrame();
        System.render.dispatch();
    }
    static onResize() {
        System.resize.dispatch();
    }
}
System.time = 0;
System.delta = 0;
System.resize = new Dispatcher();
System.render = new Dispatcher();
