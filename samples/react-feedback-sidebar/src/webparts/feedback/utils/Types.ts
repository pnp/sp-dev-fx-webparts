import { EAccordionStyle } from "../components/accordion/Accordion.styles";

export type FeedbackProps = {
  data: FeedbackWrapperProps["data"];
};

export type FeedbackWrapperProps = {
  data: FeedbackConfig[];
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  open: boolean;
};

export type FeedbackConfig = {
  title: string;
  position: number;
};

export type SpArea = {
  title: string;
  enabled: boolean;
  position: string;
  id: number;
};

export type FeedbackSection = {
  title: string;
  enabled: boolean;
  position: string;
  databaseKey: string;
};

export type SpSection = {
  title: string;
  area: number;
  enabled: boolean;
  position: string;
  databaseKey: string;
};

export type FeedbackButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  styleType: keyof typeof EButtonStyle;
  className?: string;
  position?: keyof typeof EPositionIcon;
  disabled?: boolean;
};

export enum EButtonStyle {
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary",
  disabled = "disabled",
}
export enum EPositionIcon {
  left = "left",
  right = "right",
}

export enum ETemplateSectionFeedback {
  main = "main",
  section = "section",
}

export type FeedbackFormProps = {
  sectionTitle: string;
  title: string;
  template?: keyof typeof ETemplateSectionFeedback;
};

export enum EState {
  initial = "initial",
  loading = "loading",
  success = "success",
  failure = "failure",
}

export type FeedbackPayload = {
  section: string;
  rating: number;
  comment: string;
  upn: string;
};

export type TextareaProps = {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  value: React.TextareaHTMLAttributes<HTMLTextAreaElement>["value"];
  placeholder: React.TextareaHTMLAttributes<HTMLTextAreaElement>["placeholder"];
  className?: string;
};

export type RateProps = {
  onRate: React.ChangeEventHandler<HTMLInputElement>;
  rate: number;
  rateLenght: number;
  name: string;
  className?: string;
};

export type AccordionProps = {
  headText: string;
  expanded?: boolean;
  children?: JSX.Element[] | JSX.Element | undefined;
  style?: keyof typeof EAccordionStyle;
  className?: string;
};
