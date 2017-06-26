
class LanguageSelection extends Polymer.mixinBehaviors([Polymer.AppLocalizeBehavior], Polymer.Element)
{
  static get is()
  {
    return 'language-selection';
  }

  static get properties()
  {
    return {
      selected:
      {
        type: String,
        value: "en",
        notify: true
      },
      language:
      {
        type: String,
        value: "en"
      },
      availableLanguageIso:
      {
        type: Object,
        value: [
          "en",
          "de",
          "fr",
          "pt-br"
        ]
      },
      _languageIsoToFlagMap:
      {
        type: Object,
        value:
        {
          "en": "gb",
          "de": "de",
          "fr": "fr",
          "pt-br": "br"
        }
      },
      _languageIsoToLanguageNameMap:
      {
        type: Object,
        value:
        {
          "en": "English",
          "de": "Deutsch",
          "fr": "Français",
          "pt-br": "Português"
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

    this.loadResources(this.resolveUrl('language-selection-locales.json'));
  }

  _convertLanguageIsoToFlag(languageIso)
  {
    return this._languageIsoToFlagMap[languageIso];
  }

  _getFlagPathOfLanguageIso(languageIso)
  {
    return this.importPath + 'languages/' + this._convertLanguageIsoToFlag(languageIso) + '.svg';
  }

  _convertLanguageIsoToLanguageName(languageIso)
  {
    return this._languageIsoToLanguageNameMap[languageIso];
  }
}

customElements.define(LanguageSelection.is, LanguageSelection);
