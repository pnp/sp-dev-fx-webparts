import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ILanguage {
  code: string;
  name: string;
}

export class LanguageService {
  private context: WebPartContext;
  
  // Standard languages
  private availableLanguages: ILanguage[] = [
    { code: 'en-US', name: 'English' },
    { code: 'fr-FR', name: 'French' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'de-DE', name: 'German' },
    { code: 'it-IT', name: 'Italian' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'zh-CN', name: 'Chinese (Simplified)' },
    { code: 'ru-RU', name: 'Russian' },
    { code: 'pt-BR', name: 'Portuguese (Brazil)' },
    { code: 'nl-NL', name: 'Dutch' },
    { code: 'ar-SA', name: 'Arabic' },
    { code: 'ko-KR', name: 'Korean' },
    { code: 'sv-SE', name: 'Swedish' },
    { code: 'pl-PL', name: 'Polish' },
    { code: 'tr-TR', name: 'Turkish' },
  ];
  
  constructor(context: WebPartContext) {
    this.context = context;
  }
  
  /**
   * Get all available languages
   */
  public getAvailableLanguages(): ILanguage[] {
    return this.availableLanguages;
  }
  
  /**
   * Get the current user's language
   */
  public getCurrentLanguage(): string {
    // First try to get from local storage (if user has set a preference)
    const storedLanguage = localStorage.getItem('preferredLanguage');
    if (storedLanguage) {
      // Verify it's a valid language code
      const isValidLanguage = this.availableLanguages.some(lang => lang.code === storedLanguage);
      if (isValidLanguage) {
        return storedLanguage;
      }
    }
    
    // Then try to get the SharePoint user language preference if possible
    try {
      if (this.context.pageContext && 
          this.context.pageContext.cultureInfo && 
          this.context.pageContext.cultureInfo.currentUICultureName) {
        
        const userLanguage = this.context.pageContext.cultureInfo.currentUICultureName;
        
        // Check if this language is in our available languages
        const languageExists = this.availableLanguages.some(lang => lang.code === userLanguage);
        
        if (languageExists) {
          return userLanguage;
        }
        
        // If not, try to find a close match (e.g., 'en' for 'en-GB')
        const languagePrefix = userLanguage.split('-')[0];
        const similarLanguage = this.availableLanguages.find(lang => 
          lang.code.startsWith(languagePrefix + '-')
        );
        
        if (similarLanguage) {
          return similarLanguage.code;
        }
      }
    } catch (error) {
      console.warn('Error getting SharePoint user language:', error);
    }
    
    // Default to browser language
    let browserLanguage = navigator.language || 'en-US';
    
    // Check if browser language is available
    const browserLanguageExists = this.availableLanguages.some(lang => lang.code === browserLanguage);
    
    if (browserLanguageExists) {
      return browserLanguage;
    }
    
    // If not, try to find a close match for browser language
    const browserLanguagePrefix = browserLanguage.split('-')[0];
    const similarBrowserLanguage = this.availableLanguages.find(lang => 
      lang.code.startsWith(browserLanguagePrefix + '-')
    );
    
    if (similarBrowserLanguage) {
      return similarBrowserLanguage.code;
    }
    
    // Fall back to English if all else fails
    return 'en-US';
  }
  
  /**
   * Get language name from code
   */
  public getLanguageName(languageCode: string): string {
    const language = this.availableLanguages.find(lang => lang.code === languageCode);
    return language ? language.name : languageCode;
  }
  
  /**
   * Set the current language preference
   */
  public setCurrentLanguage(languageCode: string): void {
    // Verify it's a valid language code
    const isValidLanguage = this.availableLanguages.some(lang => lang.code === languageCode);
    
    if (isValidLanguage) {
      localStorage.setItem('preferredLanguage', languageCode);
    }
  }
}