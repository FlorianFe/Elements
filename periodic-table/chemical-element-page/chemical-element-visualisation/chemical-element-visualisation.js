
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

  static get observers()
  {
    return ['_onElementChange(element)'];
  }

  constructor()
  {
    super();
  }

  connectedCallback()
  {
    super.connectedCallback();
  }

  _onElementChange()
  {
    let electronConfiguration = this.element["electron-configuration"];
    let electronGroup = this.$["electron-group"];
    let ringGroup = this.$["ring-group"];

    let minimumRadius = 25;
    let maximumRadius = 75;

    for(let i=0; i < electronConfiguration.length; i++)
    {
      let ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");

      let radius = minimumRadius + (i+1) * (maximumRadius - minimumRadius) / (electronConfiguration.length + 1);

      ring.setAttribute("cx", "75");
      ring.setAttribute("cy", "75");
      ring.setAttribute("r", radius);
      ring.classList.add("ring");

      if(i !== electronConfiguration.length-1)
      {
        ring.setAttribute("opacity", "0.3");
      }

      ringGroup.appendChild(ring);
    }

    for(let i=0; i < electronConfiguration.length; i++)
    {
      for(let j=0; j < electronConfiguration[i]; j++)
      {
        let electron = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        let ringRadius = minimumRadius + (i+1) * (maximumRadius - minimumRadius) / (electronConfiguration.length + 1);
        let phaseShift = i * Math.PI/8;

        let cx = (Math.sin((2 * Math.PI) * (j / electronConfiguration[i]) + phaseShift) * ringRadius);
        let cy = (Math.cos((2 * Math.PI) * (j / electronConfiguration[i]) + phaseShift) * ringRadius);
        let radius = 3;

        electron.setAttribute("cx", cx);
        electron.setAttribute("cy", cy);
        electron.setAttribute("r", radius);
        electron.classList.add("electron");

        if(i !== electronConfiguration.length-1)
        {
          electron.setAttribute("opacity", "0.3");
        }

        electronGroup.appendChild(electron);
      }
    }

    electronGroup.animate(
    [
      { "transform" : "translate(75px, 75px) rotate(0deg)"},
      { "transform" : "translate(75px, 75px) rotate(360deg)"},
    ],
    {
      duration: 10000,
      iterations: Infinity
    });
  }
}

customElements.define(ChemicalElementVisualisation.is, ChemicalElementVisualisation);
