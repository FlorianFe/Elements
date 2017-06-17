
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

  ready()
  {
    super.ready();

    let chemicalElements = require('./periodic-table/shared/chemical-elements');

    this.element = chemicalElements[this.symbol];
  }

  connectedCallback()
  {
    super.connectedCallback();
  }
}

customElements.define(ChemicalElementPage.is, ChemicalElementPage);
