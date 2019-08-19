import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'hello-world',
  template: `
      <div>{{ message }}</div>
    `
})
export class HelloWorldComponent implements OnInit {
  @Input()
  public message: string;

  public ngOnInit() { }
}