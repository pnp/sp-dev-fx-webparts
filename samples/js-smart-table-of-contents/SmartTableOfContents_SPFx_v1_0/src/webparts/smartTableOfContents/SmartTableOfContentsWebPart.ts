import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneSlider,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import styles from './SmartTableOfContentsWebPart.module.scss';

export interface ISmartTableOfContentsWebPartProps {
  title: string;
  maxHeadingLevel: number;
  includeH1: boolean;
  sticky: boolean;
  showNumbers: boolean;
  showEmptyMessage: boolean;
  scrollOffset: number;
}

interface IHeadingItem {
  id: string;
  text: string;
  level: number;
  element: HTMLElement;
  numberPath: number[];
}

export default class SmartTableOfContentsWebPart extends BaseClientSideWebPart<ISmartTableOfContentsWebPartProps> {
  private _headings: IHeadingItem[] = [];
  private _observer?: IntersectionObserver;

  public render(): void {
    this._disconnectObserver();

    const title = this.properties.title || 'Smart Table of Contents';
    const maxHeadingLevel = this.properties.maxHeadingLevel || 3;
    const includeH1 = this.properties.includeH1 === true;
    const useFloatingDrawer = this.properties.sticky === true;
    const showNumbers = this.properties.showNumbers === true;
    const showEmptyMessage = this.properties.showEmptyMessage !== false;

    this._headings = this._getPageHeadings(includeH1, maxHeadingLevel);

    if (this._headings.length === 0) {
      this.domElement.innerHTML = `
        <section class="${styles.smartToc}">
          <div class="${styles.card}">
            <div class="${styles.title}">${this._escapeHtml(title)}</div>
            ${showEmptyMessage ? `<div class="${styles.empty}">No headings found on this page. Add Heading 2, Heading 3, or Heading 4 text styles to populate this navigation.</div>` : ''}
          </div>
        </section>`;
      return;
    }

    if (useFloatingDrawer) {
      this.domElement.innerHTML = this._renderFloatingDrawer(title, showNumbers);
      this._wireFloatingDrawer();
    } else {
      this.domElement.innerHTML = `
        <section class="${styles.smartToc}">
          <div class="${styles.card}">
            <div class="${styles.title}">${this._escapeHtml(title)}</div>
            <nav aria-label="Page table of contents">
              ${this._renderHeadingList(this._headings, showNumbers)}
            </nav>
          </div>
        </section>`;
    }

    this._watchCurrentSection();
  }

  private _renderFloatingDrawer(title: string, showNumbers: boolean): string {
    const safeTitle = this._escapeHtml(title);

    return `
      <section class="${styles.smartToc}">
        <button type="button" class="${styles.floatingButton}" data-stoc-toggle="true" aria-expanded="false" aria-label="Open ${this._escapeAttribute(title)}">
          ${safeTitle}
        </button>
        <div class="${styles.drawerOverlay}" data-stoc-overlay="true" hidden>
          <aside class="${styles.drawerPanel}" role="dialog" aria-modal="true" aria-label="${this._escapeAttribute(title)}">
            <div class="${styles.drawerHeader}">
              <div class="${styles.drawerTitle}">${safeTitle}</div>
              <button type="button" class="${styles.closeButton}" data-stoc-close="true" aria-label="Close ${this._escapeAttribute(title)}">×</button>
            </div>
            <div class="${styles.drawerBody}">
              <nav aria-label="Page table of contents">
                ${this._renderHeadingList(this._headings, showNumbers)}
              </nav>
            </div>
          </aside>
        </div>
      </section>`;
  }

  private _wireFloatingDrawer(): void {
    const toggleButton = this.domElement.querySelector('[data-stoc-toggle]') as HTMLButtonElement | null;
    const overlay = this.domElement.querySelector('[data-stoc-overlay]') as HTMLElement | null;
    const closeButton = this.domElement.querySelector('[data-stoc-close]') as HTMLButtonElement | null;
    const links = Array.prototype.slice.call(this.domElement.querySelectorAll('[data-toc-target]')) as HTMLAnchorElement[];

    if (!toggleButton || !overlay) {
      return;
    }

    const openDrawer = (): void => {
      overlay.hidden = false;
      toggleButton.setAttribute('aria-expanded', 'true');
      const firstLink = overlay.querySelector('[data-toc-target]') as HTMLAnchorElement | null;
      if (firstLink) {
        firstLink.focus();
      }
    };

    const closeDrawer = (): void => {
      overlay.hidden = true;
      toggleButton.setAttribute('aria-expanded', 'false');
      toggleButton.focus();
    };

    toggleButton.addEventListener('click', () => {
      if (overlay.hidden) {
        openDrawer();
      } else {
        closeDrawer();
      }
    });

    if (closeButton) {
      closeButton.addEventListener('click', closeDrawer);
    }

    overlay.addEventListener('click', (event: MouseEvent) => {
      if (event.target === overlay) {
        closeDrawer();
      }
    });

    links.forEach((link: HTMLAnchorElement) => {
      link.addEventListener('click', () => {
        window.setTimeout(() => {
          if (!overlay.hidden) {
            overlay.hidden = true;
            toggleButton.setAttribute('aria-expanded', 'false');
          }
        }, 50);
      });
    });

    this.domElement.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !overlay.hidden) {
        closeDrawer();
      }
    });
  }

  private _getPageHeadings(includeH1: boolean, maxHeadingLevel: number): IHeadingItem[] {
    const minLevel = includeH1 ? 1 : 2;
    const selectorParts: string[] = [];

    for (let level = minLevel; level <= maxHeadingLevel; level++) {
      selectorParts.push(`h${level}`);
    }

    const selector = selectorParts.join(',');

    const textBoxRoots = Array.prototype.slice.call(
      document.querySelectorAll('[data-automation-id="textBox"]')
    ) as HTMLElement[];

    const searchRoots = textBoxRoots.length > 0
      ? textBoxRoots
      : Array.prototype.slice.call(document.querySelectorAll('[data-automation-id="CanvasZone"], main, body')) as HTMLElement[];

    const rawHeadings = searchRoots.reduce((items: HTMLElement[], root: HTMLElement) => {
      const found = Array.prototype.slice.call(root.querySelectorAll(selector)) as HTMLElement[];
      return items.concat(found);
    }, []);

    const headings = rawHeadings.filter((heading: HTMLElement) => {
      const text = (heading.textContent || '').trim();

      if (!text) {
        return false;
      }

      if (this.domElement.contains(heading)) {
        return false;
      }

      if (heading.closest('[data-sp-feature-tag*="SmartTableOfContents"]')) {
        return false;
      }

      if (heading.closest('[data-automation-id="TitleText"]')) {
        return false;
      }

      if (heading.closest('[data-automation-id="TitleTextId"]')) {
        return false;
      }

      if (heading.closest('[data-automation-id="pageTitleInput"]')) {
        return false;
      }

      if (heading.closest('[data-automation-id="PageHeader"]')) {
        return false;
      }

      if (heading.closest('[data-automation-id="pageHeader"]')) {
        return false;
      }

      if (heading.closest('[aria-hidden="true"]')) {
        return false;
      }

      if (heading.closest('[role="toolbar"]')) {
        return false;
      }

      return true;
    });

    const counters: number[] = [0, 0, 0, 0, 0, 0];

    return headings.map((heading: HTMLElement): IHeadingItem => {
      const level = this._getHeadingLevel(heading);
      const text = (heading.textContent || '').trim();

      if (!heading.id) {
        heading.id = this._makeSafeId(text);
      }

      counters[level - 1]++;
      for (let i = level; i < counters.length; i++) {
        counters[i] = 0;
      }

      const numberPath = counters.slice(0, level).filter(n => n > 0);

      return {
        id: heading.id,
        text,
        level,
        element: heading,
        numberPath
      };
    });
  }

  private _renderHeadingList(headings: IHeadingItem[], showNumbers: boolean): string {
    let html = '';
    let currentLevel = 0;

    headings.forEach((heading: IHeadingItem) => {
      const normalizedLevel = Math.max(1, heading.level);

      while (currentLevel < normalizedLevel) {
        html += `<ul class="${currentLevel === 0 ? styles.rootList : styles.childList}">`;
        currentLevel++;
      }

      while (currentLevel > normalizedLevel) {
        html += '</ul>';
        currentLevel--;
      }

      const numberText = showNumbers ? `<span class="${styles.number}">${heading.numberPath.join('.')}</span>` : '';

      html += `
        <li class="${styles.item} ${styles['level' + normalizedLevel as keyof typeof styles]}">
          <a class="${styles.link}" href="#${this._escapeAttribute(heading.id)}" data-toc-target="${this._escapeAttribute(heading.id)}">
            ${numberText}<span>${this._escapeHtml(heading.text)}</span>
          </a>
        </li>`;
    });

    while (currentLevel > 0) {
      html += '</ul>';
      currentLevel--;
    }

    return html;
  }

  private _watchCurrentSection(): void {
    if (!('IntersectionObserver' in window)) {
      return;
    }

    const links = Array.prototype.slice.call(this.domElement.querySelectorAll('[data-toc-target]')) as HTMLAnchorElement[];
    const linkMap: { [id: string]: HTMLAnchorElement } = {};

    links.forEach((link: HTMLAnchorElement) => {
      const targetId = link.getAttribute('data-toc-target');
      if (targetId) {
        linkMap[targetId] = link;
      }
    });

    this._observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

      if (!visible || !visible.target || !visible.target.id) {
        return;
      }

      links.forEach(link => link.classList.remove(styles.active));
      const activeLink = linkMap[visible.target.id];

      if (activeLink) {
        activeLink.classList.add(styles.active);
      }
    }, {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: [0, 1]
    });

    this._headings.forEach(heading => this._observer!.observe(heading.element));
  }

  private _disconnectObserver(): void {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = undefined;
    }
  }

  private _getHeadingLevel(element: HTMLElement): number {
    const match = element.tagName.match(/^H([1-6])$/i);
    return match ? parseInt(match[1], 10) : 2;
  }

  private _makeSafeId(text: string): string {
    const base = text
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 80) || 'section';

    let id = base;
    let counter = 2;

    while (document.getElementById(id)) {
      id = `${base}-${counter}`;
      counter++;
    }

    return id;
  }

  private _escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  private _escapeAttribute(value: string): string {
    return this._escapeHtml(value).replace(/`/g, '&#096;');
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onDispose(): void {
    this._disconnectObserver();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Configure Smart Table of Contents'
          },
          groups: [
            {
              groupName: 'Display',
              groupFields: [
                PropertyPaneTextField('title', {
                  label: 'Title'
                }),
                PropertyPaneDropdown('maxHeadingLevel', {
                  label: 'Maximum heading depth',
                  options: [
                    { key: 2, text: 'Heading 2' },
                    { key: 3, text: 'Heading 3' },
                    { key: 4, text: 'Heading 4' }
                  ]
                }),
                PropertyPaneCheckbox('includeH1', {
                  text: 'Include Heading 1'
                }),
                PropertyPaneToggle('showNumbers', {
                  label: 'Show section numbers',
                  onText: 'Yes',
                  offText: 'No'
                }),
                PropertyPaneToggle('sticky', {
                  label: 'Floating drawer navigation v1.1',
                  onText: 'Drawer',
                  offText: 'Inline'
                }),
                PropertyPaneSlider('scrollOffset', {
                  label: 'Scroll offset in pixels',
                  min: 0,
                  max: 180,
                  step: 10
                }),
                PropertyPaneToggle('showEmptyMessage', {
                  label: 'Show message when no headings are found',
                  onText: 'Yes',
                  offText: 'No'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
