<template>
    <div class="rating">
        <p> {{ msg }} </p>
    </div>
</template>

<script>
export default {
    data() {
        return{
            msg: 'Rating component'
        }
    }
}
</script>

<style>
    .rating {
        justify-self: center;
        background-color: greenyellow;
    }
</style>

