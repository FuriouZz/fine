import { Dispatcher } from "../utils/Dispatcher";
import { Inputs } from "../inputs/Inputs";
export class System {
    constructor() {
        this.size = new Float32Array([0, 0]);
        this.pixelRatio = 1;
        this.resize = new Dispatcher();
        this.paused = true;
        this.update = new Dispatcher();
        this.render = new Dispatcher();
        this.deltaTime = 0;
        this.playTime = 0;
        this.previousTime = 0;
        this.timeScale = 1;
        this.inputs = new Inputs();
        this._RAF = this._RAF.bind(this);
        this._onResize = this._onResize.bind(this);
        this.enable();
    }
    get currentTime() {
        return window.performance.now() / 1000;
    }
    enable() {
        this._onResize();
        window.addEventListener('resize', this._onResize);
        this.paused = false;
        window.requestAnimationFrame(this._RAF);
    }
    disable() {
        window.removeEventListener('resize', this._onResize);
        this.paused = true;
    }
    _onResize() {
        this.size[0] = window.innerWidth;
        this.size[1] = window.innerHeight;
        this.pixelRatio = window.devicePixelRatio;
        this.inputs.resize(this.size[0], this.size[1]);
        this.resize.dispatch(this.size);
    }
    _RAF() {
        if (this.paused)
            return;
        const currentTime = this.currentTime;
        this.deltaTime = (currentTime - this.previousTime) * this.timeScale;
        this.previousTime = currentTime;
        this.playTime += this.deltaTime;
        this.inputs.update();
        this.update.dispatch();
        this.render.dispatch();
        window.requestAnimationFrame(this._RAF);
    }
}
