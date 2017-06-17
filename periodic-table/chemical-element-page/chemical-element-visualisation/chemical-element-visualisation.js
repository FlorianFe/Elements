
class ChemicalElementVisualisation extends Polymer.Element
{
  static get is()
  {
    return 'chemical-element-visualisation';
  }

  static get properties()
  {
    return {
      element: Object,
      size:
      {
        type: Number,
        value: 500
      }
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

    let minimumRadius = this.size / 6;
    let maximumRadius = this.size / 2;

    for(let i=0; i < electronConfiguration.length; i++)
    {
      let ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");

      let radius = minimumRadius + (i+1) * (maximumRadius - minimumRadius) / (electronConfiguration.length + 1);

      ring.setAttribute("cx", this.size / 2);
      ring.setAttribute("cy", this.size / 2);
      ring.setAttribute("r", radius);
      ring.classList.add("ring");
      ring.classList.add("added-dynamically");

      if(i !== electronConfiguration.length - 1)
      {
        ring.setAttribute("opacity", "0.3");
      }

      ringGroup.appendChild(ring);
    }

    let outerShell = electronConfiguration[electronConfiguration.length - 1];
    let secondOuterShell = electronConfiguration[electronConfiguration.length - 2];

    let electrons = [];
    let electronBackgrounds = [];

    for(let i=0; i < electronConfiguration.length; i++)
    {
      let configuration = electronConfiguration[i];
      let totalValenceElectrons = configuration.s + configuration.p + configuration.d + configuration.f;

      for(let j=0; j < totalValenceElectrons; j++)
      {
        let electron = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        let electronBackground = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        let ringRadius = minimumRadius + (i+1) * (maximumRadius - minimumRadius) / (electronConfiguration.length + 1);
        let phaseShift = i * Math.PI/8;

        let cx = (Math.sin((2 * Math.PI) * (j / totalValenceElectrons) + phaseShift) * ringRadius);
        let cy = (Math.cos((2 * Math.PI) * (j / totalValenceElectrons) + phaseShift) * ringRadius);
        let radius = this.size / 50;

        electron.setAttribute("cx", cx);
        electron.setAttribute("cy", cy);
        electron.setAttribute("r", radius);
        electron.setAttribute("opacity", "0.3");
        electron.classList.add("electron");
        electron.classList.add("added-dynamically");

        electronBackground.setAttribute("cx", cx);
        electronBackground.setAttribute("cy", cy);
        electronBackground.setAttribute("r", radius + this.size / 75);
        electronBackground.classList.add("electron-background");
        electronBackground.classList.add("added-dynamically");

        if(j >= configuration.s)
        {
          if(j >= configuration.p + configuration.s)
          {
            if(j >= configuration.d + configuration.p + configuration.s)
            {
              electron.classList.add("f-group");

              if(secondOuterShell.d <= 1 && electronConfiguration.length - i == 3)
                electron.setAttribute("opacity", "1");
            }
            else
            {
              electron.classList.add("d-group");

              if(outerShell.p <= 0 && electronConfiguration.length - i == 2)
                electron.setAttribute("opacity", "1");
            }
          }
          else
          {
            electron.classList.add("p-group");
          }
        }
        else
        {
          electron.classList.add("s-group");
        }

        if(i === electronConfiguration.length - 1)
        {
          electron.setAttribute("opacity", "1");
        }

        electronBackgrounds.push(electronBackground);
        electrons.push(electron);
      }
    }

    electronBackgrounds.forEach((electronBackground) => electronGroup.appendChild(electronBackground));
    electrons.forEach((electron) => electronGroup.appendChild(electron));

    electronGroup.animate(
    [
      { "transform" : "translate(" + (this.size / 2) + "px, " + (this.size / 2) + "px) rotate(0deg)"},
      { "transform" : "translate(" + (this.size / 2) + "px, " + (this.size / 2) + "px) rotate(360deg)"}
    ],
    {
      duration: 10000,
      iterations: Infinity
    });
  }

  divide(divident, divisor)
  {
    return (divident / divisor);
  }
}

customElements.define(ChemicalElementVisualisation.is, ChemicalElementVisualisation);
