
class PeriodicTableContent extends Polymer.Element
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
      temperatureIndicator: String
    }
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
      this.$["settings-drawer"].open();
    });

    this.shadowRoot.querySelector("#settings-drawer").addEventListener("css-variable-changed", (data) =>
    {
      let key = data.detail.key;
      let value = data.detail.value;

      this.style.setProperty(key, value);
    });
  }
}

customElements.define(PeriodicTableContent.is, PeriodicTableContent);
