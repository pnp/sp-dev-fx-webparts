import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import TodoItem from '../todo-item/Todoitem.vue';
import { ITodoProps } from './ITodoProps';
import ITodoDataProvider from '../../../../dataProviders/ITodoDataProvider';
import { DisplayMode } from '@microsoft/sp-core-library';
import { ITodoItem } from '../../../../models/ICommonObjects';

@Component({
  components: {
    'todo-item': TodoItem
  }
})
export default class Todo extends Vue implements ITodoProps {
  @Prop()
  public dataProvider: ITodoDataProvider;
  @Prop()
  public webPartDisplayMode: DisplayMode;

  public mytodos: ITodoItem[] = [];

  public todoTitle: string = '';

  public isLoading = true;
  /*
   This method is attached to the textbox whne the Enter key is hitted
  */
  public addTodo(): void {

    if (!this.todoTitle) {
      return;
    }

    if (this.dataProvider.selectedList) {

      this.dataProvider.createItem(this.todoTitle).then(
        (allItems: ITodoItem[]) => {
          if (allItems && allItems.length > 0) {
            this.mytodos = allItems;
          }
          else {
            this.mytodos = [];
          }
          this.todoTitle = '';

        });
    }
  }

  /*
   This method is triggered from the child componenets 'todo-item'
 */
  public completed(todo: ITodoItem): void {
    if (this.dataProvider.selectedList) {

      ////  Approach 1: delete item when the checkbox is clicked 
      this.dataProvider.deleteItem(todo).then(
        (allItems: ITodoItem[]) => {
          if (allItems && allItems.length > 0) {
            this.mytodos = allItems;
          }
          else {
            this.mytodos = [];
          }
          this.todoTitle = '';
        });

      ////  Approach 2: update the property PercentComplete when the checkbox is clicked 
      // this.dataProvider.updateItem(todo).then(
      //   (allItems: ITodoItem[]) => {
      //     debugger;
      //     if (allItems && allItems.length > 0) {
      //       this.mytodos = allItems;
      //       this.todoTitle = '';
      //     }
      //   });
    }
  }

  /*
   This is a system Vue.js hook. It is used here to communicate with SharePoint and get list items
  */
  public created(): void {
    if (this.dataProvider.selectedList) {

      this.dataProvider.getItems().then(
        (results: ITodoItem[]) => {
          if (results && results.length > 0) {
            this.mytodos = results;
          }
          this.isLoading = false;
        });
    }
  }

  
}