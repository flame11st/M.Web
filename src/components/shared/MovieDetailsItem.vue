<template>
    <v-card dark class="movie-details">
        <rating/>
        <div class="movie-details-item">
            <v-img class="movie-image" :src="imageSrc"/>

            <div class="text-fields">
                <span v-if="movie">
                    <h2 class="movie-title"> {{ movie.Title }} </h2>
                    <p > {{ movie.Overview }} </p>
                    <p > {{ movie.ReleaseDate }} </p>
                    <div>
                        Starring: {{ actors.map(a => a.Name).join(', ') }}
                    </div>
                    <p>Genres: {{ movie.Genres.join(', ') }}</p>
                    <p > {{ movie.Tagline }} </p>
                </span>
            </div>
        </div>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch, Prop } from 'vue-property-decorator';
import Movie from '../../objects/movie';
import Rating from './Rating.vue';
import ServiceAgent from '../../services/serviceAgent';

const serviceAgent = new ServiceAgent();

@Component({
    components: {
        Rating,
    },
})
export default class MovieDetailsItem extends Vue {
    public movie: Movie | null = null;

    public imageUrl = 'https://image.tmdb.org/t/p/w500/';

    @Prop() movieId!: string;

    async getMovie() {
        const result = await serviceAgent.GetMovie(this.movieId);

        this.movie = new Movie(result.data);
    }

    @Watch('movieId')
    onMovieIdChanged(val: string) {
        if (val !== '00000000-0000-0000-0000-000000000000') {
            this.getMovie();
        }
    }

    get imageSrc() {
        let src = '';

        if (this.movie) {
            src = this.imageUrl + this.movie.PosterPath;
        }

        return src;
    }

    get actors() {
        const result = this.movie && this.movie.Actors;

        return result;
    }
}
</script>

<style scoped>
    .movie-details {
        border: 1px solid white;
        display: grid;
        grid-template-rows: 50px 1fr;
    }

    .movie-details-item{
        padding: 0 50px 50px;
        display: grid;
        height: 100%;
        width: 100%;
        /* background-color: lightsalmon; */
        grid-template-columns: 2fr 6fr;
    }

    .movie-title {
        margin-bottom: 15px;
    }

    .text-fields {
        margin-left: 50px;
    }

    /* .movie-image {
        height: 100%;
        width: 100%;
    } */
</style>
