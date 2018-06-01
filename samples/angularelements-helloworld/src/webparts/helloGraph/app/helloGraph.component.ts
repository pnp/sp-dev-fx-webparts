import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { GraphService } from "./graph.service";
import { MSGraphClient } from "@microsoft/sp-client-preview";

@Component({
  selector: 'hello-graph',
  providers: [GraphService],
  template: `
      <div>[Hello Graph] My name is: {{ displayName }}</div>
    `
})
export class HelloGraphComponent implements OnInit {
  @Input()
  public client: MSGraphClient;
  public displayName: string;

  constructor(private graphService: GraphService, private cd: ChangeDetectorRef) {
  }

  public ngOnInit() {
    this.displayName = '...';

    this.graphService
      .getMe(this.client)
      .subscribe(data => {
        this.displayName = data.displayName;
        this.cd.detectChanges();
      });
  }
}
