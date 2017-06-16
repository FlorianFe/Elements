
class ChemicalElementVisualisation extends Polymer.Element
{
  static get is()
  {
    return 'chemical-element-visualisation';
  }

  static get properties()
  {
    return {
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

    let electronGroup = this.$["electron-group"];

    electronGroup.animate(
    [
      { "transform" : "translate(75px, 75px) rotate(0deg)"},
      { "transform" : "translate(75px, 75px) rotate(360deg)"},
    ],
    {
      duration: 5000,
      iterations: Infinity
    })
  }
}

customElements.define(ChemicalElementVisualisation.is, ChemicalElementVisualisation);
