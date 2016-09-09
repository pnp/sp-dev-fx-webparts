/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * List Angular2 component
 */

import {Component, Input} from '@angular/core';

@Component({
  selector: `list-component`,
  template:
  `<button (click)="addTodo()">Add Todo</button>
        <ul>
          <li *ngFor="let todo of todos">
            {{ todo }}
          </li>
        </ul>`
})
export default class ListComponent {
  @Input()
  private todos: string[];

  constructor() {
    console.log('*** ListComponent constructor ***');
  }

  public addTodo(): void {
    this.todos.push(`todo ${this.todos.length + 1}`);
  };
}
