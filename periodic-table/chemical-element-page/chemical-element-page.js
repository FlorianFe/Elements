
class ChemicalElementPage extends Polymer.Element
{
  static get is()
  {
    return 'chemical-element-page';
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
  }
}

customElements.define(ChemicalElementPage.is, ChemicalElementPage);
