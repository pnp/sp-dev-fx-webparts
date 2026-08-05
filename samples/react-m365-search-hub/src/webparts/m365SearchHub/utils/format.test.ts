import { format } from './format';

describe('format', () => {
  it('fills placeholders in order', () => {
    expect(format('Showing {0} of {1} results', 25, 431)).toEqual('Showing 25 of 431 results');
  });

  it('lets a translation reorder the placeholders', () => {
    // German and Portuguese routinely need a different order to the English.
    expect(format('{1} von {0}', 431, 25)).toEqual('25 von 431');
  });

  it('repeats a value used more than once', () => {
    expect(format('{0} and {0}', 'this')).toEqual('this and this');
  });

  it('leaves a placeholder alone when nothing was passed for it', () => {
    expect(format('No results for {0}')).toEqual('No results for {0}');
  });

  it('returns a template with no placeholders untouched', () => {
    expect(format('Search Microsoft 365')).toEqual('Search Microsoft 365');
  });
});

describe('format, when a locale file is short a key', () => {
  it('returns nothing rather than throwing', () => {
    // strings.Whatever is undefined when a locale file does not carry the key.
    // Losing a label is acceptable; losing the web part is not.
    expect(format(undefined as unknown as string, 25)).toEqual('');
  });

  it('treats an empty template the same way', () => {
    expect(format('', 25)).toEqual('');
  });
});
