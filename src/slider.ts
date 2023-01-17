import { html, css, customElement, observable, FASTElement } from "@microsoft/fast-element";
import {
    Slider,
    SliderOptions,
    sliderTemplate,
} from "@microsoft/fast-foundation";

const template = html<MySlider>`
  <fast-slider>
  </fast-slider>
`;

const styles = css`
  button {
    width: 240px;
    height: 180px;
    background-color: skyblue;
    color: white;
  }
`;

@customElement({
    name: "my-fast-slider",
    template,
    styles,
})
export class MySlider extends Slider {
    @observable text: string = "My Slider";
}
