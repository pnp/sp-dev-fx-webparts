import { IFormDefinition } from '../../../shared/models/IFormDefinition';
import { runOnce } from '../../../shared/runOnce';
import { buildSubmissionPayload, validateFormValues } from './formSubmission';

const definition: IFormDefinition = {
  schemaVersion: 1,
  title: 'Request',
  targetListTitle: 'Requests',
  published: true,
  fields: [
    { id: '1', internalName: 'Subject', label: 'Subject', type: 'text', required: true },
    { id: '2', internalName: 'Details', label: 'Details', type: 'multiline', required: false },
    { id: '3', internalName: 'Amount', label: 'Amount', type: 'number', required: true },
    { id: '4', internalName: 'Priority', label: 'Priority', type: 'choice', required: true, options: ['High', 'Low'] },
    { id: '5', internalName: 'DueDate', label: 'Due date', type: 'date', required: true },
    { id: '6', internalName: 'Approved', label: 'Approved', type: 'yesno', required: true }
  ]
};

describe('V6/B8 renderer validation and submission', () => {
  it('blocks missing and invalid required, choice, number, and date values', () => {
    const errors = validateFormValues(definition, {
      Subject: ' ', Amount: 'not a number', Priority: 'Urgent', DueDate: '2026-02-30', Approved: false
    });

    expect(errors).toEqual(expect.objectContaining({
      Subject: 'Subject is required.',
      Amount: 'Amount must be a number.',
      Priority: 'Choose a valid priority option.',
      DueDate: 'Due date must be a valid date.'
    }));
    expect(() => buildSubmissionPayload(definition, {})).toThrow('Form values are invalid.');
  });

  it('builds one checked SharePoint item payload for all six field types', () => {
    expect(buildSubmissionPayload(definition, {
      Subject: ' Request ', Details: ' More ', Amount: '12.5', Priority: 'High', DueDate: '2026-08-28', Approved: false
    })).toEqual({
      Subject: 'Request', Details: 'More', Amount: 12.5, Priority: 'High', DueDate: '2026-08-28T00:00:00Z', Approved: false
    });
  });

  it('prevents a second submission while the first is pending', async () => {
    const pending = { current: false };
    let finish: (() => void) | undefined;
    const action = jest.fn(() => new Promise<void>(resolve => { finish = resolve; }));

    const first = runOnce(pending, action);
    const second = runOnce(pending, action);
    expect(await second).toBeUndefined();
    expect(action).toHaveBeenCalledTimes(1);
    finish?.();
    await first;
  });

  it('clears the pending flag when the action throws synchronously', async () => {
    const pending = { current: false };

    await expect(runOnce(pending, () => { throw new Error('failed'); })).rejects.toThrow('failed');
    expect(pending.current).toBe(false);
  });
});
