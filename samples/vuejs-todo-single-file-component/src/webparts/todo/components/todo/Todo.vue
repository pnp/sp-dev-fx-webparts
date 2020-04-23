<template>
    <div>
        <div v-if="webPartDisplayMode === 1">
            <span v-if="dataProvider.selectedList!= null">
                <div id="new-todo">
                    <input type="text" @keyup.enter="addTodo" v-model="todoTitle" placeholder="what needs to be done?">
                </div>
                <ul>
                <todo-item v-for="item in mytodos" :key="item.Id"
                    :todoText="item.Title"
                    :todoId="item.Id"
                    :todoItem="item"
                    v-on:completed="completed">
                    </todo-item>
                </ul>
              </span>
              <span v-else>
                 <div class="notification">
                    <div class="notificationIcon">
                    <i class="ms-Icon ms-Icon--ErrorBadge notificationIcon" aria-hidden="true"></i>
                    <span class="notificationHeader">
                       WebPart is not configured
                    </span>
                    </div>
                 </div>
             </span>
        </div>
        <div v-if="webPartDisplayMode === 2">
           <div class="notification">
            <div class="notificationIcon">
              <i class="ms-Icon ms-Icon--ErrorBadge notificationIcon" aria-hidden="true"></i>
              <span class="notificationHeader">
                Edit Mode
              </span>
            </div>
            <div class="notificationDescription">
              <span v-if="dataProvider.selectedList!= null">
                Selected List: {{dataProvider.selectedList.Title}}
              </span>
              <span v-else>
                WebPart is not configured. Please select Task list.
             </span>
            </div>
           </div>
        </div>        
    </div>
</template>

<script>
    module.exports = require("./Todo");
</script>

<style scoped src="./todo.scss" lang="scss"></style>