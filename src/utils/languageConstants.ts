import { Lang, LanguageCode, SupportedLanguages } from '../types/lang';

export const languageConstants: Record<LanguageCode, Lang> = {
  en: {
    search: 'Search',
    gptSearchPlaceholder: 'What would you like to watch today?',
  },
  hindi: {
    search: 'खोज',
    gptSearchPlaceholder: 'आज आप क्या देखना चाहेंगे?',
  },
  spanish: {
    search: 'buscar',
    gptSearchPlaceholder: '¿Qué te gustaría ver hoy?',
  },
};

export const supportedLanguages: SupportedLanguages[] = [
  {
    identifier: 'en',
    languageName: 'English',
  },
  {
    identifier: 'hindi',
    languageName: 'Hindi',
  },
  {
    identifier: 'spanish',
    languageName: 'Spanish',
  },
];
