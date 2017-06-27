
class ChemicalElementPage extends Polymer.mixinBehaviors([Polymer.AppLocalizeBehavior], Polymer.Element)
{
  static get is()
  {
    return 'chemical-element-page';
  }

  static get properties()
  {
    return {
      symbol: String,
      element: Object,
      language: String,
      temperatureIndicator: String
    }
  }

  static get observers()
  {
    return ['_onSymbolChange(symbol)'];
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

    this.loadResources(this.resolveUrl('chemical-element-page-locales.json'));
  }

  displayTemperaturIndication(kelvin, temperatureIndicator)
  {
    let value = "-";

    if(typeof kelvin == "number")
    {
      if(temperatureIndicator === "k")
      {
        value = kelvin;
        if((""+value).length >= 6) value = ("" + value).substring(0, 6);
        value += " K";
      }

      if(temperatureIndicator === "f")
      {
        value = ((kelvin - 273) * 1.8 + 32);
        if((""+value).length >= 6) value = ("" + value).substring(0, 6);
        value += " °F";
      }

      if(temperatureIndicator === "c")
      {
        value = (kelvin - 273);
        if((""+value).length >= 6) value = ("" + value).substring(0, 6);
        value += " °C";
      }
    }

    return value;
  }

  _onSymbolChange(symbol)
  {
    let chemicalElements = require('./periodic-table/shared/chemical-elements');

    this.element = chemicalElements[this.symbol];
  }
}

customElements.define(ChemicalElementPage.is, ChemicalElementPage);
