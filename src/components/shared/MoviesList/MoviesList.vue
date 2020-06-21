<template>
    <div class="movies-list">
        <transition-group name="list" class="movie-list-transition">
            <movie-list-item
                v-for="movie in movies"
                :key="movie.Id"
                :movie="movie"
            />
        </transition-group>

        <div class="empty-movies">
            <v-card class="empty-movies-card" v-if="!movies.length">
                <p>Your watchlist is empty.</p>
                <p>You can click on search field and find any Movie or TV Show.</p>
            </v-card>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import MovieListItem from './MovieListItem.vue';
import Movie from '@/objects/movie';

@Component({
    components: {
        MovieListItem,
    },
})
export default class MovieList extends Vue {
    @Prop() movies!: Movie[];
}
</script>

<style lang="scss">
    @use '../../../style/variables';

    .movies-list {
        width: 100%;
        max-height: Calc(100vh - 100px);
        align-self: start;

        .movie-list-transition {
            display: grid;
            justify-items: center;
            width: 100%;
            row-gap: 10px;
        }
    }

    @media screen and (max-width: 900px) {
        .movies-list {
            max-height: Calc(100vh - 155px);
        }
    }

    .empty-movies {
        display: grid;
        width: 100%;
        justify-items: center;

        .empty-movies-card {
            width: 90%;
            height: 130px;
            justify-self: center;
            padding: 20px;
            font-size: 18px;

            &.v-card {
                background-color: variables.$secondary-color !important;
                color: variables.$fonts-color;
            }
        }
    }


    @media screen and (min-width: 900px) {
        .empty-movies .empty-movies-card {
            width: 80%;
        }
    }

    @media screen and (min-width: 1100px) {
        .empty-movies .empty-movies-card {
            width: 60%;
        }
    }

    @media screen and (min-width: 1500px) {
        .empty-movies .empty-movies-card {
            width: 50%;
        }
    }

    .list-enter-active, .list-leave-active {
        transition: all 0.5s;
    }

    .list-enter, .list-leave-to {
        opacity: 0;
        transform: scale(0); //translateX(300px);
    }
</style>
