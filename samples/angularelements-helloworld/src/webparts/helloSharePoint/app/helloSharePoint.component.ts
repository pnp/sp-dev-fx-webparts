import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { SharePointService } from "./sharePoint.service";

@Component({
  selector: 'hello-sharepoint',
  providers: [SharePointService],
  template: `
      <div>[Hello SharePoint] Web title: {{ title }}</div>
    `
})
export class HelloSharePointComponent implements OnInit {
  @Input()
  public siteUrl: string;
  public title: string;

  constructor(private sharePointService: SharePointService, private cd: ChangeDetectorRef) {
  }

  public ngOnInit() {
    this.title = '...';

    this.sharePointService
      .getSiteTitle(this.siteUrl)
      .subscribe(data => {
        this.title = data.Title;
        this.cd.detectChanges();
      });
  }
}
