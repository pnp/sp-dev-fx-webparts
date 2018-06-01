import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { GraphService } from "./graph.service";

@Component({
  selector: 'hello-pnp-js-graph',
  providers: [GraphService],
  template: `
      <div>[Hello PnP JS Graph] My name is: {{ displayName }}</div>
    `
})
export class HelloPnPJSGraphComponent implements OnInit {
  public displayName: string;

  constructor(private graphService: GraphService, private cd: ChangeDetectorRef) {
  }

  public ngOnInit() {
    this.displayName = '...';

    this.graphService
      .getMe()
      .subscribe(data => {
        this.displayName = data.displayName;
        this.cd.detectChanges();
      });
  }
}
