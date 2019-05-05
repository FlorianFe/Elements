
const currentWindow = require('electron').remote.getCurrentWindow();

class PeriodicTable extends Polymer.Element
{
  static get is() { return 'periodic-table'; }

  static get properties()
  {
    return {
      _selectedPage:
      {
        type: Number,
        value: 0
      }
    }
  }

  constructor()
  {
    super();

    this._fullscreen = false;
  }

  ready()
  {
    super.ready();
  }

  connectedCallback()
  {
    super.connectedCallback();

    currentWindow.on('enter-full-screen', () =>
    {
      this._fullscreen = true;
    });

    currentWindow.on('resize', () => 
    {
      if(this._fullscreen)
      {
        this._fullscreen = false;
        this._selectedPage = 2;
        setTimeout(() => { this._selectedPage = 1 }, 0);
      }
    });

    this.$["loading-bar-container"].animate(
    [
      { "opacity" : 0.0},
      { "opacity" : 1.0}
    ],
    {
      duration: 500
    });

    Promise.all(
    [
      this._importHref(this.resolveUrl("periodic-table-content/periodic-table-content.html")),
      new Promise((resolve, reject) => {setTimeout(() => {resolve()}, 3000);})
    ])
    .then(() =>
    {
      let animation = this.$["loading-bar-container"].animate(
      [
        { "opacity" : 1.0},
        { "opacity" : 0.0}
      ],
      {
        duration: 500
      });

      animation.onfinish = () =>
      {
        this._selectedPage = 1;

        this.$["periodic-table-content-container"].animate(
        [
          { "opacity" : 0.0},
          { "opacity" : 1.0}
        ],
        {
          duration: 500
        });
      };
    });
  }

  _pickRandomElementSymbol()
  {
    let symbols =
    [
      "h", "he",
      "li", "be", "b", "c", "n", "o", "f", "ne",
      "na", "mg", "al", "si", "p", "s", "al", "ar",
      "fe", "au", "cu", "pt", "u", "ag", "zn", "ti"
    ];

    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  _importHref(href)
  {
    return new Promise((resolve, reject) =>
    {
      Polymer.Base.importHref(href, function(e) {
        resolve(e.target);
      }, reject, false);
    });
  }
}

customElements.define(PeriodicTable.is, PeriodicTable);
