<template>
    <li>
        <div class="view">
            <input type="checkbox" @click="onComplete">
            <label>{{todoText}}</label> 
        </div>
    </li>
</template>

<script>
    module.exports = require('./todoitem');
</script>

<style scoped src="./todoitem.scss" lang="sass"></style>