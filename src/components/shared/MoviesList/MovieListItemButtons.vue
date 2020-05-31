<template>
    <div class="movie-list-item-buttons" :class="{'expanded' : expanded}">
        <v-speed-dial
            v-model="opened"
            :right="true"
            direction="left"
            :open-on-hover="true"
            transition="slide-x-reverse-transition"
        >
            <template v-slot:activator>
                <v-btn v-model="opened" dark fab small class="activator">
                    <v-icon v-show="opened">mdi-close</v-icon>
                    <v-icon v-show="!opened && movie.MovieRate === MovieRate.addedToWatchlist">
                        mdi-check-bold
                    </v-icon>

                    <v-icon v-show="!opened && movie.MovieRate === MovieRate.liked">
                        mdi-thumb-up
                    </v-icon>

                    <v-icon v-show="!opened && movie.MovieRate === MovieRate.notLiked">
                        mdi-thumb-down
                    </v-icon>
                </v-btn>
            </template>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn fab dark small color="red" v-on="on"
                        v-if="movie.MovieRate !== MovieRate.notLiked"
                        @click.stop="rateMovie(MovieRate.notLiked)">
                        <v-icon>mdi-thumb-down</v-icon>
                    </v-btn>
                </template>
                <span>Not like</span>
            </v-tooltip>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" fab dark small color="green"
                        v-if="movie.MovieRate !== MovieRate.liked"
                        @click.stop="rateMovie(MovieRate.liked)">
                        <v-icon>mdi-thumb-up</v-icon>
                    </v-btn>
                </template>
                <span>Like</span>
            </v-tooltip>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" fab dark small color="green"
                        v-if="movie.MovieRate !== MovieRate.addedToWatchlist"
                        @click.stop="rateMovie(MovieRate.addedToWatchlist)">
                        <v-icon>mdi-card-plus</v-icon>
                    </v-btn>
                </template>
                <span>Add to Watchlist</span>
            </v-tooltip>
        </v-speed-dial>

        <v-tooltip top>
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" fab dark small color="red" @click.stop="removeDialog = true">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
            <span>Remove</span>
        </v-tooltip>

        <v-dialog v-model="removeDialog" max-width="290">
            <v-card class="remove-dialog">
                <v-card-title class="remove-dialog-headline">Are you sure?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" text @click="rateMovie(MovieRate.notRated)">
                        Yes
                    </v-btn>
                    <v-btn text @click="removeDialog = false">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';
import Component from 'vue-class-component';
import MovieRate from '@/enums/movieRate';
import Movie from '@/objects/movie';
import ServiceAgent from '@/services/serviceAgent';

const serviceAgent = new ServiceAgent();

@Component
export default class MovieListItemButtons extends Vue {
    @Prop() movie!: Movie;

    @Prop() expanded = false;

    opened = false;

    MovieRate = MovieRate;

    removeDialog = false;

    async rateMovie(movieRate: MovieRate) {
        this.removeDialog = false;

        await serviceAgent.RateMovie(this.movie.Id, this.userId, movieRate)
            .then(() => this.$store.dispatch('setUserMovies'));
    }

    get userId() {
        const result = this.$store.getters.userId;

        return result;
    }
}
</script>

<style lang="scss">
    @use '../../../style/variables';

    .movie-list-item-buttons {
        transition: all .5s ease;
        height: 120px;
        display: grid;
        justify-items: end;
        align-items: center;

        .v-speed-dial {
            z-index: 0;

            .activator.v-btn {
                background-color: variables.$additional-color !important;
            }

            &.v-speed-dial--right {
                right: 0;
            }
        }

        &.expanded {
            margin-top: 20px;
        }
    }
</style>
