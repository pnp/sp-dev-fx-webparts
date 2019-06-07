export interface INumberTextFieldProps {
  label: string;
  placeholder: string;
  value: number;
  onChanged: (newValue: string) => void;
}

export interface INumberTextFieldState {
  value: string;
}
