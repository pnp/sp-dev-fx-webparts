import * as Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class TodoItem extends Vue {
    @Prop
    public todoText: string;

    public onComplete(): void {
        this.$emit('completed', this.todoText);
    }
}