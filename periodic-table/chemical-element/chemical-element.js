
class ChemicalElement extends Polymer.Element
{
  static get is()
  {
    return 'chemical-element';
  }

  static get properties()
  {
    return {
      symbol: String,
      element: Object
    }
  }

  constructor()
  {
    super();
  }

  connectedCallback()
  {
    super.connectedCallback();

    let chemicalElements = require('./periodic-table/shared/chemical-elements');

    this.element = chemicalElements[this.symbol];

    this.$["paper-card"].addEventListener("click", () =>
    {
      this.dispatchEvent(new CustomEvent('chemical-element-selected', {detail: {symbol: this.symbol}}));
    });
  }
}

customElements.define(ChemicalElement.is, ChemicalElement);
