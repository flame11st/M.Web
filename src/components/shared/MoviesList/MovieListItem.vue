<template>
    <v-card dark class="movie-list-item">
        <v-img class="movie-image" :src="imageSrc"/>

        <div>
            <p>{{ movie.title }}</p>
            <p>Genres: {{ movie.genres.join(', ') }}</p>
            <p>{{ movie.duration }} min</p>
            <rating :movieRating="75"/>
        </div>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import MoviListDTO from '../../../objects/movieListDTO';
import Rating from '../Rating.vue';

@Component({
    components: {
        Rating,
    },
})
export default class MovieListItem extends Vue {
    @Prop() movie!: MoviListDTO;

    public imageUrl = 'https://image.tmdb.org/t/p/w500/';

    get imageSrc() {
        let src = '';

        if (this.movie) {
            src = this.imageUrl + this.movie.posterPath;
        }

        return src;
    }
}
</script>

<style scoped>
    .movie-list-item {
        padding: 20px;
        border: 1px solid gray;
        display: grid;
        grid-template-columns: 100px 1fr;
        grid-gap: 1em;
        height: 200px;
        width: 60%;
        margin: 10px;
    }
</style>
