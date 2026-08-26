import { createCompatibilityResolver, getCompatibilityMatrix } from './WebPartCompatibilityRegistry';

const graphDocumentedIds: ReadonlyArray<readonly [string, string]> = [
  ['e377ea37-9047-43b9-8cdb-a761be2f8e09', 'Bing maps'],
  ['0f087d7f-520e-42b7-89c0-496aaf979d58', 'Button'],
  ['df8e44e7-edd5-46d5-90da-aca1539313b8', 'Call to action'],
  ['2161a1c6-db61-4731-b97c-3cdb303f7cbb', 'Divider'],
  ['b7dd04e1-19ce-4b24-9132-b60a1c2b910d', 'File viewer'],
  ['d1d91016-032f-456d-98a4-721247c305e8', 'Image'],
  ['af8be689-990e-492a-81f7-ba3e4cd3ed9c', 'Image gallery'],
  ['6410b3b6-d440-4663-8744-378976dc041e', 'Link preview'],
  ['e84a8ca2-f63c-4fb9-bc0b-d8eef5ccb22b', 'Org chart'],
  ['7f718435-ee4d-431c-bdbf-9c4ff326f46e', 'People'],
  ['c70391ea-0b10-4ee9-b2b4-006d3fcad0cd', 'Quick links'],
  ['8654b779-4886-46d4-8ffb-b5ed960ee986', 'Spacer'],
  ['544dd15b-cf3c-441b-96da-004d5a8cea1d', 'YouTube']
];

describe('web part identifiers', () => {
  const resolve = createCompatibilityResolver();

  it.each(graphDocumentedIds)('maps %s to %s', (id, title) => {
    expect(resolve(id).title).toBe(title);
  });

  it('keys every entry by its own id', () => {
    getCompatibilityMatrix().forEach((entry) => {
      expect(resolve(entry.id).id).toBe(entry.id);
    });
  });

  it('matches identifiers case-insensitively', () => {
    expect(resolve('D1D91016-032F-456D-98A4-721247C305E8').title).toBe('Image');
  });
});

describe('compatibility classification', () => {
  const resolve = createCompatibilityResolver();

  it('treats web parts bound to source-site data as unsupported', () => {
    const boundToSource = [
      'daf0b71c-6de8-4ef7-b511-faae7c388708',
      'f92bf067-bc19-489e-a556-7fe95f508720',
      '20745d7d-8581-4a6c-bf26-68279bc123fc',
      'a5df8fdf-b508-4b66-98a6-d83bc2597f63',
      'eb95c819-ab8f-4689-bd03-0c2d65d47b1f',
      'cf91cf5d-ac23-4a7a-9dbc-cd9ea2a4e859'
    ];

    boundToSource.forEach((id) => expect(resolve(id).compatibility).toBe('Unsupported'));
  });

  it('treats self-contained presentational web parts as fully supported', () => {
    ['2161a1c6-db61-4731-b97c-3cdb303f7cbb', '8654b779-4886-46d4-8ffb-b5ed960ee986']
      .forEach((id) => expect(resolve(id).compatibility).toBe('FullySupported'));
  });

  it('classifies an unknown web part as unsupported rather than guessing', () => {
    const unknown = resolve('00000000-0000-0000-0000-000000000000');

    expect(unknown.compatibility).toBe('Unsupported');
    expect(unknown.title).toBe('Unknown web part');
  });

  it('gives every entry a note explaining what happens to it', () => {
    getCompatibilityMatrix().forEach((entry) => {
      expect(entry.notes.trim()).not.toBe('');
      expect(entry.notes.trim().endsWith('.')).toBe(true);
    });
  });
});

describe('overrides', () => {
  it('lets a tenant reclassify a built-in web part', () => {
    const resolve = createCompatibilityResolver([{
      id: 'f92bf067-bc19-489e-a556-7fe95f508720',
      title: 'List (provisioned separately)',
      compatibility: 'PartiallySupported',
      notes: 'Our destination sites are provisioned with the same lists.'
    }]);

    expect(resolve('f92bf067-bc19-489e-a556-7fe95f508720').compatibility).toBe('PartiallySupported');
  });

  it('does not list a built-in entry twice when it is overridden', () => {
    const matrix = getCompatibilityMatrix([{
      id: 'D1D91016-032F-456D-98A4-721247C305E8',
      title: 'Image (custom)',
      compatibility: 'FullySupported',
      notes: 'Overridden.'
    }]);

    const images = matrix.filter((entry) => entry.id.toLowerCase() === 'd1d91016-032f-456d-98a4-721247c305e8');
    expect(images).toHaveLength(1);
    expect(images[0].title).toBe('Image (custom)');
  });
});
