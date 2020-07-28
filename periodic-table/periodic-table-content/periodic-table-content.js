
const SIZE_X = 18;
const SIZE_Y = 9;


const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

class PeriodicTableContent extends Polymer.mixinBehaviors([Polymer.IronA11yKeysBehavior], Polymer.Element)
{
  static get is()
  {
    return 'periodic-table-content';
  }

  static get properties()
  {
    return {
      selectedElementSymbol:
      {
        type: String,
        value: "h"
      },
      language: String,
      temperatureIndicator: String,
      display:
      {
        type: String,
        notify: true
      },
      keyEventTarget: 
      {
        type: Object,
        value: function() {
          return document.body;
        }
      }
    }
  }

  get keyBindings() 
  {
    return {
      'left': '_leftPressed',
      'right': '_rightPressed',
      'up': '_upPressed',
      'down': '_downPressed',
      'a': '_leftPressed',
      'd': '_rightPressed',
      'w': '_upPressed',
      's': '_downPressed',
    }
  }

  _leftPressed(){ this._changeSelectedElementByPosition(-1, 0); }
  _rightPressed(){ this._changeSelectedElementByPosition(1, 0); }
  _upPressed(){ this._changeSelectedElementByPosition(0, -1); }
  _downPressed(){ this._changeSelectedElementByPosition(0, 1); }

  ready()
  {
    super.ready();

    this.positionToElementSymbol = require('./periodic-table/periodic-table-content/element-grid/element-grid');
    this.elementSymbolToPosition = {};

    for(let x=0; x<SIZE_X; x++)
    for(let y=0; y<SIZE_Y; y++)
    {
      const symbol = this.positionToElementSymbol[y][x];
      if(symbol !== "-")
      {
        this.elementSymbolToPosition[symbol] = { x: x, y: y };
      }
    }

    console.log(this.elementSymbolToPosition);
  }

  connectedCallback()
  {
    super.connectedCallback();

    let chemicalElements = this.shadowRoot.querySelectorAll('chemical-element');
    let chemicalElementPages = this.shadowRoot.querySelectorAll('chemical-element-page');

    chemicalElements.forEach((chemicalElement) =>
    {
      chemicalElement.addEventListener("chemical-element-selected", (data) =>
      {
        this.selectedElementSymbol = data.detail.symbol;
      });
    });

    chemicalElementPages.forEach((chemicalElementPage) =>
    {
      chemicalElementPage.addEventListener("back-link-clicked", (data) =>
      {
        this.selectedElementSymbol = "0";
      });
    })

    this.shadowRoot.querySelector("#settings-icon").addEventListener("click", () =>
    {
      this.$["settings-dialog"].open();
    });

    this.shadowRoot.querySelector("#settings-dialog").addEventListener("css-variable-changed", (data) =>
    {
      let key = data.detail.key;
      let value = data.detail.value;

      this.style.setProperty(key, value);
    });
  }

  _changeSelectedElementByPosition(deltaX, deltaY)
  {
    const position = this.elementSymbolToPosition[this.selectedElementSymbol];

    const nextPosition = { 
      x: clamp(position.x + deltaX, 0, SIZE_X - 1),
      y: clamp(position.y + deltaY , 0, SIZE_Y - 1)
    };

    console.log(nextPosition);

    const horizontalBridges = [
      { left: 'h', right: 'he' },
      { left: 'be', right: 'b' },
      { left: 'mg', right: 'al' },

      { left: 'he', right: 'li' },
      { left: 'ne', right: 'na' },
      { left: 'ar', right: 'k' },
      { left: 'kr', right: 'rb' },
      { left: 'xe', right: 'cs' },
      { left: 'rn', right: 'fr' },

      { left: 'ba', right: 'la' },
      { left: 'lu', right: 'hf' },
      { left: 'ra', right: 'ac' }
    ];

    if(deltaX === 1)
    {
      for(let i=0; i<horizontalBridges.length; i++) 
      {
        if(this.selectedElementSymbol === horizontalBridges[i].left)
        {
          this.selectedElementSymbol =horizontalBridges[i].right;
          return;
        }
      }
    }

    if(deltaX === -1)
    {
      for(let i=0; i<horizontalBridges.length; i++) 
      {
        if(this.selectedElementSymbol === horizontalBridges[i].right)
        {
          this.selectedElementSymbol =horizontalBridges[i].left;
          return;
        }
      }
    }

    if(this.selectedElementSymbol === 'y' && deltaX === 0 && deltaY === 1)
    {
      this.selectedElementSymbol = 'la';
      return;
    }

    if(this.positionToElementSymbol[nextPosition.y][nextPosition.x] !== "-")
    {
      console.log(this.positionToElementSymbol[nextPosition.y][nextPosition.x]);
      this.selectedElementSymbol = this.positionToElementSymbol[nextPosition.y][nextPosition.x];
    }
    else
    {
      const afterNextPosition = { 
        x: clamp(nextPosition.x + deltaX, 0, SIZE_X - 1),
        y: clamp(nextPosition.y + deltaY , 0, SIZE_Y - 1)
      };

      if(this.positionToElementSymbol[afterNextPosition.y][afterNextPosition.x] !== "-")
      {
        console.log(this.positionToElementSymbol[afterNextPosition.y][afterNextPosition.x]);
        this.selectedElementSymbol = this.positionToElementSymbol[afterNextPosition.y][afterNextPosition.x];
      }
    }
  }
}

customElements.define(PeriodicTableContent.is, PeriodicTableContent);
