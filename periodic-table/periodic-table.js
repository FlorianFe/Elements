
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
      },
      display:
      {
        type: String,
        observer(newValue, oldValue) {
          this._updateCSSVariables();
        }
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
      new Promise((resolve, reject) => {setTimeout(() => {resolve()}, 2500);})
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

  _updateCSSVariables()
  {
    if(this.display == 'light')
    {
      document.documentElement.style.setProperty('--primary-color', '#888');
      document.documentElement.style.setProperty('--secondary-color', '#000');
      document.documentElement.style.setProperty('--background-color', '#fff');
    }

    if(this.display == 'dark')
    {
      document.documentElement.style.setProperty('--primary-color', '#eee');
      document.documentElement.style.setProperty('--secondary-color', '#fff');
      document.documentElement.style.setProperty('--background-color', '#333');
    }
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
