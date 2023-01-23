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
        <div class="slider_text"><span id="${title.toLowerCase()}_text_min">${min}</span>
        <span>&#8660;</span>
        <span id="${title.toLowerCase()}_text_max">${max}</span>
        </div>
        <div class="range_container">
    <div class="sliders_control">
       <input id="fromSlider" class="${title.toLowerCase()}_min" type="range" min="${min}" max="${max}" value="${min}"/>
       <input id="toSlider" class="${title.toLowerCase()}_max" type="range" min="${min}" max="${max}" value="${max}"/>
    </div>
</div>
        </div>`;
        super.renderCard(title, content);
    }
}
