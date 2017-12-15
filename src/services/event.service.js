import { Subject } from './pub-sub.service';

const events = {};

export const observe = (key) => {
    if (!this.events[key]) {
        this.events[key] = new Subject();
    }
    return this.events[key];
}

export const emit = (key, value) => {
    if (!this.events[key]) {
        this.events[key] = new Subject();
    }
    this.events[key].notify(value);
}
