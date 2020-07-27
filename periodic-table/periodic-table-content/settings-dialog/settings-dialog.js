
class SettingsDialog extends Polymer.mixinBehaviors([Polymer.AppLocalizeBehavior], Polymer.Element)
{
  static get is()
  {
    return 'settings-dialog';
  }

  static get properties()
  {
    return {
      language:
      {
        type: String,
        value: "en",
        notify: true
      },
      temperatureIndicator:
      {
        type: String,
        value: "k",
        notify: true
      },
      display:
      {
        type: String,
        value: "light",
        notify: true
      },
      colors:
      {
        type: Object,
        value:
        {
          "sGroupElectron-color" : "#000",
          "pGroupElectron-color" : "#000",
          "dGroupElectron-color" : "#000",
          "fGroupElectron-color" : "#000",

          "alkaliMetalColor" : "#ff8a65",
          "alkalineEarthMetalColor" : "#ffb74d",
          "transitionMetalColor" : "#ffd54f",
          "postTransitionMetalColor" : "#dce775",
          "metalloidColor": "#aed581",
          "otherNonmetalColor": "#4db6ac",
          "halogenColor": "#4dd0e1",
          "nobleGasColor": "#4fc3f7",
          "lanthanideColor": "#9575cd",
          "actinideColor": "#f06292"
        }
      },
      availableColors:
      {
        type: Array,
        value:
        [
          "#ef5350",
          "#ec407a",
          "#ab47bc",
          "#7e57c2",
          "#5c6bc0",
          "#42a5f5",
          "#29b6f6",
          "#26c6da",
          "#26a69a",
          "#66bb6a",
          "#9ccc65",
          "#d4e157",
          "#ffee58",
          "#ffca28",
          "#ffa726",
          "#ff7043",
          "#8d6e63",
          "#bdbdbd",
          "#78909c"
        ]
      },
      primaryToBackgroundColorMap:
      {
        type: Object,
        value:
        {
          "#ef5350" : "#ef9a9a",
          "#ec407a" : "#f48fb1",
          "#ab47bc" : "#ce93d8",
          "#7e57c2" : "#b39ddb",
          "#5c6bc0" : "#9fa8da",
          "#42a5f5" : "#90caf9",
          "#29b6f6" : "#81d4fa",
          "#26c6da" : "#80deea",
          "#26a69a" : "#80cbc4",
          "#66bb6a" : "#a5d6a7",
          "#9ccc65" : "#c5e1a5",
          "#d4e157" : "#e6ee9c",
          "#ffee58" : "#fff59d",
          "#ffca28" : "#ffe082",
          "#ffa726" : "#ffcc80",
          "#ff7043" : "#ffab91",
          "#8d6e63" : "#bcaaa4",
          "#bdbdbd" : "#eeeeee",
          "#78909c" : "#b0bec5"
        }
      }
    }
  }

  constructor()
  {
    super();
  }

  connectedCallback()
  {
    super.connectedCallback();

    this.loadResources(this.resolveUrl('settings-dialog-locales.json'));

    let electronTypes = [
      "s-group-electron",
      "p-group-electron",
      "d-group-electron",
      "f-group-electron",
    ];

    let groupNames = [

      "alkali-metal",
      "alkaline-earth-metal",
      "transition-metal",
      "post-transition-metal",
      "metalloid",
      "other-nonmetal",
      "halogen",
      "noble-gas",
      "lanthanide",
      "actinide"
    ];

    const shell = require('electron').shell;
    let openInBrowserLinks = this.shadowRoot.querySelectorAll(".open-in-browser-link");
    openInBrowserLinks.forEach((openInBrowserLink) =>
    {
      openInBrowserLink.addEventListener("click", (event) =>
      {
           event.preventDefault();
           shell.openExternal(event.target.href);
      });
    });
  }

  

  open()
  {
    this.$["paper-dialog"].open();
  }
}

customElements.define(SettingsDialog.is, SettingsDialog);
