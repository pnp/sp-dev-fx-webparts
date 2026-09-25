/** @jest-environment jsdom */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IFieldDefinition } from '../../../shared/models/IFieldDefinition';
import { FormField } from './FormField';

describe('V8 renderer field accessibility', () => {
  it.each<IFieldDefinition>([
    { id: 'text', internalName: 'Text', label: 'Text label', type: 'text', required: true },
    { id: 'multiline', internalName: 'Multiline', label: 'Multiline label', type: 'multiline', required: true },
    { id: 'number', internalName: 'Number', label: 'Number label', type: 'number', required: true },
    { id: 'choice', internalName: 'Choice', label: 'Choice label', type: 'choice', required: true, options: ['One'] },
    { id: 'date', internalName: 'Date', label: 'Date label', type: 'date', required: true },
    { id: 'yesno', internalName: 'YesNo', label: 'Yes or no label', type: 'yesno', required: true }
  ])('renders an associated name and announced validation for $type', field => {
    const root = document.createElement('div');
    document.body.appendChild(root);
    ReactDOM.render(
      <FormField field={field} value="" error={`${field.label} is required.`} onChange={() => undefined} />,
      root
    );

    const control = document.getElementById(`flex-forms-${field.id}`);
    const label = document.getElementById(control?.getAttribute('aria-labelledby') ?? '');
    expect(label?.textContent).toContain(field.label);
    expect(control?.getAttribute('aria-invalid')).toBe('true');
    expect(root.querySelector('[role="alert"]')?.textContent).toContain(`${field.label} is required.`);

    ReactDOM.unmountComponentAtNode(root);
    root.remove();
  });
});
