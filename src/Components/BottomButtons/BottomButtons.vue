<template>
    <div class="bottom-buttons">
        <p> {{ msg }} </p>
        <slot></slot>
    </div>
</template>

<script>
export default {
    data() {
        return{
            msg: 'Bottom buttons component'
        }
    }
}
</script>

<style>
    .bottom-buttons {
        justify-self: center;
        background-color: cornflowerblue;
    }
</style>

