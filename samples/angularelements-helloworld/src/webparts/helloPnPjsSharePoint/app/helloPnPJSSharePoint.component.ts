import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { SharePointService } from "./sharePoint.service";

@Component({
  selector: 'hello-pnp-js-sharepoint',
  providers: [SharePointService],
  template: `
      <div>[Hello PnP JS SharePoint] Web title: {{ title }}</div>
    `
})
export class HelloPnPJSSharePointComponent implements OnInit {
  @Input()
  public siteUrl: string;
  public title: string;

  constructor(private sharePointService: SharePointService, private cd: ChangeDetectorRef) {
  }

  public ngOnInit() {
    this.title = '...';

    this.sharePointService
      .getSiteTitle()
      .subscribe(data => {
        this.title = data.Title;
        this.cd.detectChanges();
      });
  }
}
