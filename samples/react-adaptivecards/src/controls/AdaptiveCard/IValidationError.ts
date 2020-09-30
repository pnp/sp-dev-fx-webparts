export interface IValidationError {
  error: ValidationError;
  message: string;
}

export declare enum ValidationError {
  Hint = 0,
  ActionTypeNotAllowed = 1,
  CollectionCantBeEmpty = 2,
  Deprecated = 3,
  ElementTypeNotAllowed = 4,
  InteractivityNotAllowed = 5,
  InvalidPropertyValue = 6,
  MissingCardType = 7,
  PropertyCantBeNull = 8,
  TooManyActions = 9,
  UnknownActionType = 10,
  UnknownElementType = 11,
  UnsupportedCardVersion = 12,
  DuplicateId = 13
}
