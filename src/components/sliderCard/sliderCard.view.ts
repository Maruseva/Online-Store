import { Card } from '../card/card.view';
import './sliderCard.style.css';

export interface Parameter {
    min: number;
    max: number;
}

export class SliderCard extends Card {
    public render(title: string, parameter: Parameter) {
        const { min, max } = parameter;

        const content = `<div class="slider_wrap">
        <div class="slider_text"><span>${min}</span>
        <span>&#8660;</span>
        <span>${max}</span>
        </div>
        <div class="range_container">
    <div class="sliders_control">
       <input id="fromSlider" type="range" min="${min}" max="${max}"/>
       <input id="toSlider" type="range" min="${min}" max="${max}"/>
    </div>
</div>
        </div>`;
        super.renderCard(title, content);
    }
}
