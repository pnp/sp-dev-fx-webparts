import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'hello-world',
  templateUrl:"helloWorld.component.html"
})
export class HelloWorldComponent implements OnInit {
  @Input()
  public message: string;

  public ngOnInit() { }
}