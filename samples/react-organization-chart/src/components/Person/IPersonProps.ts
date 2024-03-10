import { PersonaSize } from "@fluentui/react/lib/Persona";
export interface IPersonProps {
  userEmail: string;
  text: string;
  secondaryText: string;
  tertiaryText?: string;
  pictureUrl?:string;
  size?: PersonaSize;
}
