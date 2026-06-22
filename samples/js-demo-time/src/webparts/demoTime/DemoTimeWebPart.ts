import { DisplayMode, Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { Dialog } from '@microsoft/sp-dialog';
import type { IReadonlyTheme } from '@microsoft/sp-component-base';
import styles from './DemoTimeWebPart.module.scss';
import './DemoTimeWebPart.css';
import * as strings from 'DemoTimeWebPartStrings';
import { IDemoTimeListItem } from './IDemoTimeListItem';
import DemoTimeService from './DemoTimeService';


export interface IDemoTimeWebPartProps { }

export default class DemoTimeWebPart extends BaseClientSideWebPart<IDemoTimeWebPartProps> {

  // private _isDarkTheme: boolean; // TODO: add support for dark theme
  private _isSharePoint: boolean;
  private _secondaryCommandClassName: string = '.ms-CommandBar-secondaryCommand';
  private _canvasClassName: string = '.Canvas';
  private _timeout: number = 1000;
  private _sections: HTMLCollection;
  private _currentSection: number = 0;
  private _isDemoRunning: boolean = false;
  private _demoTimeSectionComments: IDemoTimeListItem[];

  public render(): void {
    if (this.displayMode !== DisplayMode.Edit)
      return;

    this.domElement.innerHTML = `
    <section class="${styles.demoTime} ${!!this.context.sdks.microsoftTeams ? styles.teams : ''}">
      <div>
        ${!this._isSharePoint ? strings.OnlySharePointMessage
        : `👾👾👾`
      }
      </div>
    </section>`;
  }

  protected onInit(): Promise<void> {
    this._isSharePoint = !this.context.sdks.microsoftTeams;
    if (this._isSharePoint) {
      setTimeout(async() => {
        const secondaryCommand: HTMLElement | null = document.querySelector(this._secondaryCommandClassName);
        if (!secondaryCommand) {
          console.error('Secondary command bar not found');
          return;
        }

        document.querySelectorAll('.item-demo-time').forEach((el) => el.remove());

        if (this.displayMode !== DisplayMode.Edit) {
          secondaryCommand.insertAdjacentHTML('beforeend', this.getDemoTimeButtons());
          
          const demoButton: HTMLElement | null = document.querySelector('#demo-time-button');
          if (demoButton) {
            demoButton.addEventListener('click', this.onDemoTimeButtonClick.bind(this));
          }
          
          const nextButton: HTMLElement | null = document.querySelector('#demo-time-next-slide-button');
          if (nextButton) {
            nextButton.addEventListener('click', this.moveToNextSection.bind(this));
          }
          
          const previousButton: HTMLElement | null = document.querySelector('#demo-time-prev-slide-button');
          if (previousButton) {
            previousButton.addEventListener('click', this.moveToPrevtSection.bind(this));
          }
          
          const stopButton: HTMLElement | null = document.querySelector('#demo-time-stop-button');
          if (stopButton) {
            stopButton.addEventListener('click', this.stopDemo.bind(this));
          }

          this.addKeyEventListeners();

          const pageUrl = this.context.pageContext.site.serverRequestPath;
          const pageName = pageUrl.substring(pageUrl.lastIndexOf('/') + 1);
          const demoTimeService = new DemoTimeService(this.context.spHttpClient, this.context.pageContext.web.absoluteUrl, pageName);
          await demoTimeService.getDemoData().then((data) => {
            this._demoTimeSectionComments = data;
          });
        }
      }, this._timeout); // TODO: the timeout is a bit of a hack to ensure the DOM is ready. It's not ideal but it works for now
    }
    return Promise.resolve();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    // this._isDarkTheme = !!currentTheme.isInverted; // TODO: add support for dark theme
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }

  private getDemoTimeButtons(): string {
    return `
    <div class="ms-OverflowSet-item item-demo-time" role="none">
      <button id="demo-time-button" type="button" role="menuitem" name="Demo" class="ms-Button ms-Button--commandBar ms-CommandBarItem-link root-demo-time" data-is-focusable="true" tabindex="-1">
        <span class="ms-Button-flexContainer flexContainer-demo-time" data-automationid="splitbuttonprimary">
          <i data-icon-name="Play" aria-hidden="true" class="ms-Icon root-90 css-100 ms-Button-icon icon-195 icon-189" style="font-style: normal; font-family: &quot;Fluent MDL2 Hybrid Icons&quot;;"></i>
          <span class="ms-Button-textContainer textContainer-194">
            <span class="ms-Button-label label-196" id="id__23">Demo</span>
          </span>
        </span>
      </button>
    </div>
    <div class="ms-OverflowSet-item item-demo-time" role="none">
      <button id="demo-time-prev-slide-button" type="button" role="menuitem" name="Prev" class="displayNone ms-Button ms-Button--commandBar ms-CommandBarItem-link root-demo-time" data-is-focusable="true" tabindex="-1">
        <span class="ms-Button-flexContainer flexContainer-demo-time" data-automationid="splitbuttonprimary">
          <i data-icon-name="Prev" aria-hidden="true" class="ms-Icon root-90 css-100 ms-Button-icon icon-195 icon-189" style="font-style: normal; font-family: &quot;Fluent MDL2 Hybrid Icons&quot;;"></i>  
        </span>
      </button>
    </div>
    <div class="ms-OverflowSet-item item-demo-time" role="none">
      <button id="demo-time-stop-button" type="button" role="menuitem" name="Stop" class="displayNone ms-Button ms-Button--commandBar ms-CommandBarItem-link root-demo-time" data-is-focusable="true" tabindex="-1">
        <span class="ms-Button-flexContainer flexContainer-demo-time" data-automationid="splitbuttonprimary">
          <i data-icon-name="Stop" aria-hidden="true" class="ms-Icon root-90 css-100 ms-Button-icon icon-195 icon-189" style="font-style: normal; font-family: &quot;Fluent MDL2 Hybrid Icons&quot;;"></i>
        </span>
      </button>
    </div>
    <div class="ms-OverflowSet-item item-demo-time" role="none">
      <button id="demo-time-next-slide-button" type="button" role="menuitem" name="Next" class="displayNone ms-Button ms-Button--commandBar ms-CommandBarItem-link root-demo-time" data-is-focusable="true" tabindex="-1">
        <span class="ms-Button-flexContainer flexContainer-demo-time" data-automationid="splitbuttonprimary">
          <i data-icon-name="Next" aria-hidden="true" class="ms-Icon root-90 css-100 ms-Button-icon icon-195 icon-189" style="font-style: normal; font-family: &quot;Fluent MDL2 Hybrid Icons&quot;;"></i>
        </span>
      </button>
    </div>
    <div class="demo-time-comment-box displayNone fade-in">
      <span id="demo-time-comment"></span>
    </div>`;
  }

  private async onDemoTimeButtonClick(): Promise<void> {
    if (this.displayMode === DisplayMode.Edit) {
      await Dialog.alert('Demo will not work in edit mode');
      return;
    }

    this.startDemo();
  }

  private startDemo(): void {
    this._currentSection = 0;
    this._sections = document.querySelectorAll(this._canvasClassName)[0].children[0].children;

    if (this._sections.length === 0) {
      return;
    }

    this._isDemoRunning = true;

    document.querySelector('#demo-time-next-slide-button')?.classList.remove('displayNone');
    document.querySelector('#demo-time-prev-slide-button')?.classList.remove('displayNone');
    document.querySelector('#demo-time-stop-button')?.classList.remove('displayNone');
    document.querySelector('#demo-time-button')?.classList.add('displayNone');
    
    this.moveToNextSection();
  }

  private moveToNextSection(): void {
    document.querySelectorAll('.enchance').forEach((el) => el.classList.remove('enchance'));
    this._currentSection++;
    if (this._currentSection > this._sections.length - 1) {
      this._currentSection = 0;
    }
    this._sections[this._currentSection].classList.add('enchance');
    this._sections[this._currentSection].scrollIntoView({ behavior: "smooth", block: "center" });
    this.showComment();
  }

  private moveToPrevtSection(): void {
    document.querySelectorAll('.enchance').forEach((el) => el.classList.remove('enchance'));
    this._currentSection--;
    if (this._currentSection < 0) {
      this._currentSection = this._sections.length - 1;
    }
    this._sections[this._currentSection].classList.add('enchance');
    this._sections[this._currentSection].scrollIntoView({ behavior: "smooth", block: "center"  });
    this.showComment();
  }

  private showComment(): void {
    let comment: IDemoTimeListItem | undefined;
    for (const item of this._demoTimeSectionComments) {
      if (item.Section === this._currentSection) {
      comment = item;
      break;
      }
    }
    if (comment) {
      const commentElement = document.querySelector('#demo-time-comment');
      if (commentElement) {
        commentElement.innerHTML = comment.Comment;
        document.querySelector('.demo-time-comment-box')?.classList.remove('displayNone');
      }
    }
    else {
      document.querySelector('.demo-time-comment-box')?.classList.add('displayNone');
    }
  }

  private stopDemo(): void {
    document.querySelectorAll('.enchance').forEach((el) => el.classList.remove('enchance'));
    document.querySelector('#demo-time-next-slide-button')?.classList.add('displayNone');
    document.querySelector('#demo-time-prev-slide-button')?.classList.add('displayNone');
    document.querySelector('#demo-time-stop-button')?.classList.add('displayNone');
    document.querySelector('#demo-time-button')?.classList.remove('displayNone');
    this._currentSection = 0;
    this._isDemoRunning = false;
    document.querySelector('.demo-time-comment-box')?.classList.add('displayNone');
  }

  private addKeyEventListeners(): void {
    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.altKey && event.key === 'p' && !this._isDemoRunning) {
        this.startDemo();
      }
      if (event.ctrlKey && event.altKey  && event.key === 'ArrowRight' && this._isDemoRunning) {
        this.moveToNextSection();
      }
      if (event.ctrlKey && event.altKey  && event.key === 'ArrowLeft' && this._isDemoRunning) {
        this.moveToPrevtSection();
      }
      if (event.ctrlKey && event.altKey  && event.key === 's' && this._isDemoRunning) {
        this.stopDemo();
      }
    });
  }
}
