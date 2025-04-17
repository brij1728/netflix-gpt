export interface Lang {
  search: string;
  gptSearchPlaceholder: string;
}

export type LanguageCode = 'en' | 'hindi' | 'spanish';
export type LanguageName = 'English' | 'Hindi' | 'Spanish';

export type SupportedLanguages = {
  identifier: LanguageCode;
  languageName: LanguageName;
};
