import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ITodoItem } from '../../../../models/ICommonObjects';

@Component
export default class TodoItem extends Vue {

    @Prop()
    public todoItem: ITodoItem;

    /*
      This method is attached to the checkbox click
    */
    public onComplete(): void {

        //// Approach 2: update the property PercentComplete when the checkbox is clicked
        // if (this.todoItem.PercentComplete == 1) {
        //     this.todoItem.PercentComplete = 0;
        // }
        // else {
        //     this.todoItem.PercentComplete = 1;
        // }

        this.$emit('completed', this.todoItem);
    }

    /*
     This is a system Vue.js hook. Added here only for demonstrations
    */
    public created(): void {
        console.log(this.todoItem.Title + " | " + this.todoItem.Id);
    }
}