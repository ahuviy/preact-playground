import { BehaviorSubject } from './pub-sub.service';

let counter = 0;

export const processes$ = new BehaviorSubject(counter);

export const increase = () => {
    counter++;
    processes$.next(counter);
}

export const decrease = () => {
    counter--;
    if (counter < 0) {
        console.error("minus value of counter [busy indicator service]");
        counter = 0;
    }
    processes$.next(counter);
}
