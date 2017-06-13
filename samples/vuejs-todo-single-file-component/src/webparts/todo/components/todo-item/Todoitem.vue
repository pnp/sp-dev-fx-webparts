<template>
    <li>
        <div class="view">
            <input type="checkbox" @click="onComplete">
            <label>{{todoText}}</label> 
        </div>
    </li>
</template>

<script>
    module.exports = require('./TodoItem');
</script>

<style scoped src="./todoitem.scss" lang="scss"></style>