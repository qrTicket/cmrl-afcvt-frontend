import { trigger, animate, transition, style } from "@angular/animations";

export const fadeInAnimation = trigger("fadeInAnimation", [
    transition(":enter", [
        style({ opacity: 0 }),
        animate("1s", style({ opacity: 1, left:'-400px' }))
    ])
]);
