<template>
    <div class="pages">
        <router-link to="Recommendations">Recommendations</router-link>
        <router-link to="MyMovies">My movies</router-link>
    </div>
</template>

<script>
export default {
    data() {
        return{
        }
    }
}
</script>

<style scoped>
    .pages{
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1em;
        justify-items: end;
    }
</style>
