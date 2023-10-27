declare interface IPasswordVaultWebPartStrings {
  WebPartPropertyGroupAbout: string;
  NoMasterPasswordSetLabel: string;
  PasswordLabel: string;
  MasterPasswordLabel: string;
  SetMasterPasswordLabel: string;
  RepeatMasterPasswordLabel: string;
  ChangeMasterPasswordLabel: string;
  UsernameLabel: string;
  NoteLabel: string;
  CloseVaultLabel: string;
  SaveLabel: string;
  WrongPasswordLabel: string;
  OpenVaultLabel: string;
  UsernameCopiedLabel: string;
  PasswordCopiedLabel: string;
  DontLoseMasterpasswordLabel: string;
  AddNewModuleLabel: string;
  DeleteModuleLabel: string;
  MoveUpLabel: string;
  MoveDownLabel: string;
  PasswordModuleLabel: string;
  UsernameModuleLabel: string;
  NoteModuleLabel: string;
  ChangeMasterPasswordButtonText: string;
  ChangeMasterPasswordDialogTitle: string;
  CancelLabel: string;
}

declare module 'PasswordVaultWebPartStrings' {
  const strings: IPasswordVaultWebPartStrings;
  export = strings;
}
