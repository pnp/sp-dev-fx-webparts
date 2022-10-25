
export enum LocalStorageKeys {
 chatConfigurationList = "chat_configuration_list",
}
/**
 *
 */
export const getFromLocalStorage = (key: string): string | undefined =>
   window.localStorage.getItem(`${key}${LocalStorageKeys.chatConfigurationList}`);

/**
 *
 */
export const saveToLocalStorage = (key: string,value:string): void =>
  window.localStorage.setItem(`${key}${LocalStorageKeys.chatConfigurationList}`, value);
