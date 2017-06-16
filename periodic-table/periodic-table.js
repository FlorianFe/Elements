
class PeriodicTable extends Polymer.Element
{
  static get is() { return 'periodic-table'; }

  static get properties()
  {
    return {
      selectedElementSymbol: String
    }
  }

  constructor()
  {
    super();
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
        console.log(this.selectedElementSymbol);
      });
    });

    chemicalElementPages.forEach((chemicalElementPage) =>
    {
      chemicalElementPage.addEventListener("back-link-clicked", (data) =>
      {
        this.selectedElementSymbol = "0";
      });
    })
  }
}

customElements.define(PeriodicTable.is, PeriodicTable);
