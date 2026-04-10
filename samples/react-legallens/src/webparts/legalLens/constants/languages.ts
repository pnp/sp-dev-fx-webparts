export interface ILang {
  code: string;
  name: string;
  label: string;
  inputPlaceholder: string;
  examples: string[];
}

export const LANGS: ILang[] = [
  {
    code: 'en',
    name: 'English',
    label: 'English',
    inputPlaceholder: 'Type your question...',
    examples: [
      'What is the liability cap?',
      'When does this contract expire?',
      'What are the termination conditions?'
    ]
  },
  {
    code: 'de',
    name: 'German',
    label: 'Deutsch',
    inputPlaceholder: 'Stellen Sie Ihre Frage...',
    examples: [
      'Was ist die Haftungsgrenze?',
      'Wann läuft dieser Vertrag ab?',
      'Was sind die Kündigungsbedingungen?'
    ]
  },
  {
    code: 'es',
    name: 'Spanish',
    label: 'Español',
    inputPlaceholder: 'Haz tu pregunta...',
    examples: [
      '¿Cuál es el límite de responsabilidad?',
      '¿Cuándo expira este contrato?',
      '¿Cuáles son las condiciones de terminación?'
    ]
  }
];