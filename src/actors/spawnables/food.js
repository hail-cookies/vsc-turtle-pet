import { Spawnable } from "../spawnable.js";
import { Events } from "../../events/events.js";

export class Food extends Spawnable {
    icons = ['🥬', '🥕', '🌿', '🍀', '🌺', '🍓', '🌹'];

    onSpawn(data) {
        this.element.textContent = this.icons[Math.floor(Math.random() * this.icons.length)];

        // add food and enter classes before showing so we get a drop-in animation
        this.element.classList.add('food', 'enter');
        this.element.offsetHeight; // force reflow before show
        super.onSpawn(data);

        // match the positioning of the turtle: anchor to the bottom with a percentage
        this.posY = this.floorHeight;
        this.element.style.top = 'auto';
        this.element.style.bottom = '12%';

        // add shadow
        this.element.style.setProperty('--shadow-size', (this.element.offsetWidth * 1.2) + 'px');

        // animate in
        setTimeout(() => this.element.classList.remove('enter'), 350);

        Events.trigger('dinnerIsServed', { food: this });
    }
}