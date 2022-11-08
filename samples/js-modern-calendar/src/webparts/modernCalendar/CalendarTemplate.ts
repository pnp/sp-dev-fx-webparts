import styles from "./CalendarTemplate.module.scss";
import { escape } from "@microsoft/sp-lodash-subset";
import { IPropertyPaneDropdownOption } from "@microsoft/sp-property-pane";

export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}
export default class CalendarTemplate {
  public static templateHtml: string = `
    <div class='spfxcalendar'></div>
    `;

  public static emptyHtml(title: string): string {
    return `<div class="${styles.EmptyCalendar}">
                <div class="${styles.container}">
                <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
                    <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
                    <span class="ms-font-xl ms-fontColor-white">${title}</span>
                    <p class="ms-font-l ms-fontColor-white">Edit this web part to continue</p>
                    <a href="https://aka.ms/spfx" class="${styles.button}">
                        <span class="${styles.label}">View More Modern Web Parts</span>
                    </a>
                    </div>
                </div>
                </div>  
            </div>
    `;
  }

  public static themeBase: string = `https://code.jquery.com/ui/1.12.1/themes/`;

  public static themeNames: Array<string> = [
    "default",
    "black-tie",
    "blitzer",
    "cupertino",
    "dark-hive",
    "dot-luv",
    "eggplant",
    "excite-bike",
    "flick",
    "hot-sneaks",
    "humanity",
    "le-frog",
    "mint-choc",
    "overcast",
    "pcpro",
    "pepper-grinder",
    "redmond",
    "smoothness",
    "south-street",
    "start",
    "sunny",
    "swanky-purse",
    "trontastic",
    "ui-darkness",
    "ui-lightness",
    "vader",
  ];

  public static theme(): IPropertyPaneDropdownOption[] {
    var themes: IPropertyPaneDropdownOption[] = [];
    CalendarTemplate.themeNames.forEach((name, index)=> {
      themes.push({
        key: CalendarTemplate.themeBase + name + "/jquery-ui.min.css",
        text: name.toLocaleUpperCase(),
      });
    });
    return themes;
  }

  public static themes: IPropertyPaneDropdownOption[] = [
    {
      key: CalendarTemplate.themeBase + "jquery-ui.theme.min.css",
      text: "Default",
    },
    {
      key: CalendarTemplate.themeBase + "ui-lightness/jquery-ui.min.css",
      text: "Light",
    },
    {
      key:
        "//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/themes/redmond/jquery-ui.min.css",
      text: "Redmond",
    },
    {
      key:
        "//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/themes/overcast/jquery-ui.min.css",
      text: "Overcast",
    },
  ];
}
