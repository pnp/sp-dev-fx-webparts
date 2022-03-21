declare interface IPasswordVaultWebPartStrings {
  WebPartPropertyGroupAbout: string;
  NoMasterPasswordSetLabel: string;
  PasswordLabel: string;
  MasterPasswordLabel: string;
  SetMasterPasswordLabel: string;
  ChangeMasterPasswordLabel: string;
  UsernameLabel: string;
  NoteLabel: string;
  CloseVaultLabel: string;
  SaveLabel: string;
  WrongPasswordLabel: string;
  OpenVaultLabel: string;
}

declare module 'PasswordVaultWebPartStrings' {
  const strings: IPasswordVaultWebPartStrings;
  export = strings;
}
