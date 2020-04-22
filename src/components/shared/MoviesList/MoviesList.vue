<template>
    <div class="movies-list">
        <MovieListItem
            v-for="movie in movies"
            :key='movie.name'
            :movie="movie"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import MovieListItem from './MovieListItem.vue';
import MovieListDTO from '../../../objects/movieListDTO';

@Component({
    components: {
        MovieListItem,
    },
})
export default class MovieList extends Vue {
    @Prop() movies!: MovieListDTO[];
}
</script>

<style>
    .movies-list{
        width: 100%;
        max-height: Calc(100vh - 85px);
        overflow: auto;
        display: grid;
        justify-items: center;
    }
</style>
