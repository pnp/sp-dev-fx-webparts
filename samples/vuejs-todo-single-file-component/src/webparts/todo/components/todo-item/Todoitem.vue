<template>
    <li>
        <div class="view">
            <!-- Approach 1: delete item when the checkbox is clicked -->
            <!-- <input id="" type="checkbox" @click="onComplete" /> -->

             <!-- Approach 2: update the property PercentComplete when the checkbox is clicked -->
            <span v-if="todoItem.PercentComplete === 1">
               <input type="checkbox" @click="onComplete" checked />
            </span>
           <span v-else>
               <input type="checkbox" @click="onComplete" />
            </span>
            <label v-bind:class="[ todoItem.PercentComplete == 1 ? 'completed':'' ]" >
                {{todoItem.Title}}</label> 
           <label> | {{todoItem.PercentComplete * 100}} % </label>
        </div>
    </li>
</template>
<script>
module.exports = require("./TodoItem");
</script>

<style scoped src="./todoitem.scss" lang="scss"></style>