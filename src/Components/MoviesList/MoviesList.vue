<template>
    <div class="movies-list">
        <MovieListItem 
            v-for="movie in movies"
            :key='movie.name'/>
    </div>
</template>

<script>
import MovieListItem from '../MovieListItem/MovieListItem.vue'

export default {
    components: {
        MovieListItem
    },
    data() {
        return{
            movies: [
                { name: "1"},
                { name: "2"},
                { name: "3"},
                { name: "4"},
                { name: "5"},
                { name: "6"},
                { name: "7"},
                { name: "8"},
                { name: "9"},
                { name: "10"},
                { name: "11"},
                { name: "12"},
                { name: "13"},
                { name: "14"},
                { name: "15"},
            ],
            movies2: [
                { name: "1"},
                { name: "2"},
                { name: "3"},
            ],
            movies3: [
                { name: "1"},
                { name: "2"},
                { name: "3"},
                { name: "1"},
                { name: "2"},
                { name: "3"},
                { name: "1"},
                { name: "2"},
                { name: "3"},
            ]
        }
    }

}
</script>

<style>
    .movies-list{
        background-color: lawngreen;
        display: grid;
        grid-template-rows: repeat(auto-fill, minmax(60px, 1fr));
        grid-auto-rows: 60px;
        max-height: 85vh;
        grid-gap: 1em;
        overflow:auto;
    }
</style>
