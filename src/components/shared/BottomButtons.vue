<template>
    <div class="bottom-buttons">
        <div class="m-controls">
            <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-icon
                            v-on="on"
                            @click="changeMovieRate(MovieRate.addedToWatchlist)"
                         >
                    {{`mdi-card-plus${movieRate === MovieRate.addedToWatchlist ? '' : '-outline'}`}}
                         </v-icon>
                    </template>
                <span>Add to watchlist</span>
            </v-tooltip>

            <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-icon
                            v-on="on"
                            @click="changeMovieRate(MovieRate.liked)"
                        >
                        {{`mdi-thumb-up${movieRate === MovieRate.liked ? '' : '-outline'}`}}
                        </v-icon>
                    </template>
                <span>Like</span>
            </v-tooltip>

            <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-icon
                            v-on="on"
                            @click="changeMovieRate(MovieRate.notLiked)"
                        >
                        {{`mdi-thumb-down${movieRate === MovieRate.notLiked ? '' : '-outline'}`}}
                        </v-icon>
                    </template>
                <span>Not like</span>
            </v-tooltip>
        </div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import MovieRate from '../../enums/movieRate';
import ServiceAgent from '../../services/serviceAgent';

const serviceAgent = new ServiceAgent();

@Component
export default class BottomButtons extends Vue {
    @Prop() movieId!: string;

    @Prop() movieRate!: MovieRate;

    @Prop() movieRateChangedCallback: any;

    MovieRate = MovieRate;

    changeMovieRate(movieRate: MovieRate) {
        let rate = movieRate;

        if (this.movieRate === movieRate) {
            rate = MovieRate.notRated;
        }

        this.movieRateChangedCallback(this.movieId, rate);
    }
}
</script>

<style lang="scss">
    @use '../../style/variables';

    .bottom-buttons {
        display: grid;

        .v-icon{
            color: variables.$secondary-color;
        }
    }

    .m-controls {
        display: grid;

        button {
            font-size: 30px !important;
            margin: 2px;
        }
    }
</style>
