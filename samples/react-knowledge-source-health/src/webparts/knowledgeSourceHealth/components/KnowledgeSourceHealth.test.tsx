import * as React from 'react';
import * as ReactDom from 'react-dom';
import { act } from 'react-dom/test-utils';

import KnowledgeSourceHealth from './KnowledgeSourceHealth';
import { DemoScanService } from '../../../services/DemoScanService';

/** Fluent UI queries this and jsdom does not implement it. */
const installMatchMedia = (): void => {
  if (!window.matchMedia) {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false
      })
    });
  }
};

describe('KnowledgeSourceHealth', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    installMatchMedia();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDom.unmountComponentAtNode(container);
    document.body.removeChild(container);
  });

  const renderComponent = async (usingDemoData: boolean): Promise<void> => {
    await act(async () => {
      ReactDom.render(
        React.createElement(KnowledgeSourceHealth, {
          scanService: new DemoScanService(),
          maxItemsPerLibrary: 300,
          staleAfterMonths: 24,
          usingDemoData,
          hasTeamsContext: false
        }),
        container
      );
    });
  };

  it('renders the heading', async () => {
    await renderComponent(true);
    expect(container.textContent).toContain('Knowledge source health');
  });

  it('warns when demo data is in use, so a reviewer cannot mistake it for real results', async () => {
    await renderComponent(true);
    expect(container.textContent).toContain('fabricated demo data');
  });

  it('does not show the demo warning when scanning a real site', async () => {
    await renderComponent(false);
    expect(container.textContent).not.toContain('fabricated demo data');
  });

  it('loads the libraries into the picker and stops showing the spinner', async () => {
    await renderComponent(true);
    expect(container.textContent).toContain('Policies (demo data)');
    expect(container.textContent).not.toContain('Loading libraries');
  });

  it('always shows the Copilot Studio items the web part cannot check', async () => {
    await renderComponent(true);
    expect(container.textContent).toContain('Confirm these in Copilot Studio');
  });
});
