<template>
    <div class="my-movies">
        <MyMoviesPages/>
        <MoviesList/>
    </div>
</template>

<script>
import MyMoviesPages from './MyMoviesPages/MyMoviesPages.vue'
import MoviesList from '../MoviesList/MoviesList.vue'


export default {
    components: {
        MyMoviesPages,
        MoviesList
    }
}
</script>

<style>
    .my-movies{
        display: grid;
        grid-template-columns: 1fr 6fr;
        height: 100%;
        grid-gap: 1em;
    }
</style>
