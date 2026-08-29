import { toUserMessage } from './ErrorService';

describe('V7 SharePoint error messages', () => {
  it.each([
    [400, 'rejected'],
    [403, 'permission'],
    [404, 'not be found'],
    [429, 'busy']
  ])('maps HTTP %i to a safe actionable message', (status, text) => {
    const error = { isHttpRequestError: true, status, statusText: 'technical detail' };
    const message = toUserMessage(error);

    expect(message).toContain(text);
    expect(message).not.toContain('technical detail');
  });
});
