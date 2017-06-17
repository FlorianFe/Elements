
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

  displayKelvin(kelvin)
  {
    if(typeof kelvin == "number")
    {
      return kelvin + " K";
    }

    return "-";
  }

  displayAtomicWeightIndex(atomicWeigth)
  {
    if(atomicWeigth % 1 === 0)
    {
      return "mass number";
    }

    return "atomic weigth";
  }
}

customElements.define(ChemicalElementPage.is, ChemicalElementPage);
