
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
          "sp",
          "tk",
          "pt-br",
          "hi",
          "cz",
          "ru",
          "pl"
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
          "sp": "es",
          "tk": "tr",
          "pt-br": "br",
          "hi": "in",
          "cz": "cz",
          "ru": "ru",
          "pl": "pl"
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
          "sp": "Español",
          "tk": "Türk",
          "pt-br": "Português",
          "hi": "हिन्दी",
          "cz": "čeština",
          "ru": "русский",
          "pl": "polski"
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
