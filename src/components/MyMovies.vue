<template>
    <div class="my-movies">
        <div class="my-movies-buttons">
            <v-list dark class="pa-0">
                <v-list-item ripple>
                    <v-list-item-content @click="selectMovieRate(MovieRate.addedToWatchlist)">
                        Watchlist
                    </v-list-item-content>
                </v-list-item>
                <v-list-item ripple>
                    <v-list-item-content @click="selectMovieRate(MovieRate.liked)">
                        Liked
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </div>
        <MoviesList :movies="moviesToShow"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MoviesList from './shared/MoviesList/MoviesList.vue';
import ServiceAgent from '../services/serviceAgent';
import MovieListDTO from '../objects/movieListDTO';
import MovieRate from '../enums/movieRate';

const serviceAgent = new ServiceAgent();

@Component({
    components: {
        MoviesList,
    },
})
export default class MyMovies extends Vue {
    movieListData: MovieListDTO[] = new Array<MovieListDTO>(1);

    selectedMovieRate = MovieRate.addedToWatchlist;

    MovieRate = MovieRate;

    get userId() {
        const result = this.$store.state.userId;

        return result;
    }

    get moviesToShow() {
        const result = this.movieListData
            .filter((dto: MovieListDTO) => dto.movieRate === this.selectedMovieRate);

        return result;
    }

    selectMovieRate(movieRate: MovieRate) {
        this.selectedMovieRate = movieRate;
    }

    async mounted() {
        this.movieListData = (await serviceAgent.GetUserMovies(this.userId)).data;
    }
}
</script>

<style>
    .my-movies{
        display: grid;
        grid-template-columns: 1fr 8fr;
        height: 100%;
        grid-gap: 1em;
        align-items: center;
        padding-top: 5px;
    }

    .my-movies-buttons {
        border: 1px solid white;
        width: 100%;
        display: grid;
        justify-items: center;
    }

    .my-movies-buttons .v-list {
        background: transparent;
        width: 100%;
        padding: 0;
    }

    .my-movies-buttons .v-list-item {
        width: 100%;
    }

    .my-movies-buttons .v-list-item :hover{
        background-color: gray;
    }
</style>
