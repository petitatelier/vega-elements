import { LitElement, html, css } from "lit-element";
import { embed } from "vega-embed";

// @see https://github.com/vega/vega-embed
export class VegaEmbedElement extends LitElement {

  static get styles() {
    return css`
      :host { display: block; }
      :host([ hidden]) { display: none; }
    `;
  }

  render() {
    return html`
      <div id="canvas"></div>
    `;
  }

  static get properties() {
    return {
      // Either a URL string from which to load the Vega specification
      // or parsed JSON object with a Vega/Vega-Lite specification.
      spec: { type: Object }
    };
  }

  constructor() {
    console.debug( "vega-embed › constructor");
    super();
    this.spec = undefined;
    this.view = undefined;
  }

  async firstUpdated( changedProperties) {
    console.debug( "vega-embed › firstUpdated()", changedProperties, this.spec);
    // @see https://vega.github.io/vega/docs/api/view/)
    const vega = await embed( "#canvas", this.spec);
    this.view = vega.view;
  }
}

// Register the element with the browser
customElements.define( "vega-embed", VegaEmbedElement);