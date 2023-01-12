import { Card } from '../card/card.view';
import './sliderCard.style.css';

export interface Parameter {
    min: number;
    max: number;
}

export class SliderCard extends Card {
    public render(title: string, parameter: Parameter) {
        const content = `<div class="slider_wrap">
        <div class="slider_text"><span>${parameter.min}</span>
        <span>&#8660;</span>
        <span>${parameter.max}</span>
        </div>
        <div class="range_container">
    <div class="sliders_control">
       <input id="fromSlider" type="range" value="10" min="0" max="100"/>
       <input id="toSlider" type="range" value="30" min="0" max="100"/>
    </div>
</div>
        </div>`;
        super.renderCard(title, content);
    }
}