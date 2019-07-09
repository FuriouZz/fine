import { System } from "./System";
const TimeTasks = [];
export class Scheduler {
    static executeFrame() {
        let i = 0;
        let t;
        while (i < TimeTasks.length) {
            t = TimeTasks[i];
            if (t) {
                if (System.time > t.nextTime) {
                    t.callback();
                    if (t.period > 0) {
                        t.nextTime = System.time + t.period;
                        continue;
                    }
                }
                if (t.endTime > -1 && System.time > t.endTime) {
                    TimeTasks.splice(i, 1); // Remove timetask
                    continue;
                }
            }
            i++;
        }
    }
    static addTimeTask(callback, start, period = 0, duration = 0) {
        const time = System.getTime();
        const startTime = time + start;
        const endTime = startTime + duration;
        const task = {
            nextTime: startTime,
            endTime: period > 0 && duration == 0 ? -1 : endTime,
            period: period,
            callback: callback
        };
        TimeTasks.push(task);
        return task;
    }
    static removeTimeTask(task) {
        const index = TimeTasks.indexOf(task);
        if (index > -1)
            TimeTasks.splice(index, 1);
    }
}
