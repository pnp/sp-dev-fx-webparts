import { classifyError } from './ErrorClassification';

describe('SharePoint error classification', () => {
  it('classifies access denied', () => expect(classifyError({ status: 403 }).kind).toBe('accessDenied'));
  it('classifies retryable responses', () => expect(classifyError({ status: 429 }).kind).toBe('transient'));
  it('classifies malformed content errors', () => expect(classifyError(new Error('Malformed JSON payload')).kind).toBe('malformed'));
  it('keeps unknown errors distinct', () => expect(classifyError(new Error('Something unexpected')).kind).toBe('unknown'));
});
