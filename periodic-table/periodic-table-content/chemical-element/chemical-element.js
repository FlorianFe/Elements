
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
      element: Object,
      selectedSymbol: String
    }
  }

  static get observers()
  {
    return ['_updateSelectedClass(selectedSymbol)'];
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

    this._updateSelectedClass();
  }

  _updateSelectedClass()
  {
    if(this.selectedSymbol === this.symbol)
    {
      this.$["paper-card"].classList.add("selected");
    }
    else
    {
      this.$["paper-card"].classList.remove("selected");
    }
  }
}

customElements.define(ChemicalElement.is, ChemicalElement);
