<template>
    <div class="my-movies">
        <div class="my-movies-buttons">
            <div class="my-movies-buttons-icon">
                <v-icon :class="{ 'watchlist-selected' : isWatchlist}">mdi-filmstrip</v-icon>
            </div>
            <div class="my-movies-buttons-items">
                <v-btn text class="pa-0"
                    @click="isWatchlist = true"
                    :class="{ 'selected' : isWatchlist}">
                    Watchlist
                </v-btn>
                <v-btn text class="pa-0"
                    @click="isWatchlist = false"
                    :class="{ 'selected' : !isWatchlist}">
                    Viewed
                </v-btn>
            </div>
        </div>

        <div class="my-movies-list">
            <div class="my-movies-list-filter" v-show="userMovies.length > 0">
                <v-btn dark fab small @click="filterOpened = !filterOpened">
                        <v-icon v-show="filterOpened">mdi-close</v-icon>
                        <v-icon v-show="!filterOpened">mdi-filter-menu</v-icon>
                </v-btn>

                <v-slide-x-transition>
                    <div class="my-movies-list-filter-selectors" v-show="filterOpened">
                        <div class="my-movies-list-filter-section">
                            <span>Type:</span>
                            <v-switch class="ma-0"
                                v-model="moviesOnlyFilter"
                                label="Movies"
                            ></v-switch>

                            <v-switch class="ma-0"
                                v-model="tvOnlyFilter"
                                label="TV Show"
                            ></v-switch>
                        </div>
                        <div class="my-movies-list-filter-section">
                            <span v-show="!isWatchlist">Rate:</span>
                            <v-switch class="ma-0"
                                v-show="!isWatchlist"
                                v-model="likedOnly"
                                label="Liked"
                            ></v-switch>

                            <v-switch class="ma-0"
                                v-show="!isWatchlist"
                                v-model="notLikedOnly"
                                label="Not liked"
                            ></v-switch>
                        </div>
                    </div>
                </v-slide-x-transition>
            </div>

            <MoviesList :movies="watchlistMovies" v-show="isWatchlist"/>
            <MoviesList :movies="viewedMovies" v-show="!isWatchlist" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import MoviesList from './shared/MoviesList/MoviesList.vue';
import ServiceAgent from '../services/serviceAgent';
import Movie from '../objects/movie';
import MovieRate from '../enums/movieRate';
import MovieType from '@/enums/movieType';
import EventBus from '@/services/eventBus';

const serviceAgent = new ServiceAgent();

@Component({
    components: {
        MoviesList,
    },
})
export default class MyMovies extends Vue {
    isWatchlist = true;

    MovieRate = MovieRate;

    filterOpened = false;

    moviesOnlyFilter = false;

    tvOnlyFilter = false;

    likedOnly = false;

    notLikedOnly = false;

    get viewedMovies() {
        let result = this.userMovies
            .filter((movie: Movie) => movie.MovieRate !== MovieRate.addedToWatchlist);

        if (this.moviesOnlyFilter && !this.tvOnlyFilter) {
            result = result.filter((m: Movie) => m.MovieType === MovieType.movie);
        } else if (!this.moviesOnlyFilter && this.tvOnlyFilter) {
            result = result.filter((m: Movie) => m.MovieType === MovieType.tv);
        }

        if (this.likedOnly && !this.notLikedOnly) {
            result = result.filter((m: Movie) => m.MovieRate === MovieRate.liked);
        } else if (!this.likedOnly && this.notLikedOnly) {
            result = result.filter((m: Movie) => m.MovieRate === MovieRate.notLiked);
        }

        return result;
    }

    get watchlistMovies() {
        let result = this.userMovies
            .filter((dto: Movie) => dto.MovieRate === MovieRate.addedToWatchlist);

        if (this.moviesOnlyFilter && !this.tvOnlyFilter) {
            result = result.filter((m: Movie) => m.MovieType === MovieType.movie);
        } else if (!this.moviesOnlyFilter && this.tvOnlyFilter) {
            result = result.filter((m: Movie) => m.MovieType === MovieType.tv);
        }

        return result;
    }

    get userId() {
        const result = this.$store.getters.userId;

        return result;
    }

    get userMovies() {
        const result = this.$store.getters.userMovies;

        return result;
    }

    @Watch('isWatchlist')
    onIsWatchlistChanged() {
        const self = this;
        EventBus.$emit('showLoader', true);

        setTimeout(() => {
            EventBus.$emit('showLoader', false);
        }, 500);
    }

    async mounted() {
        this.$store.dispatch('setUserMovies');
    }
}
</script>

<style lang="scss">
    @use '../style/variables';

    .my-movies {
        display: grid;
        grid-template-columns: 1fr 8fr;
        height: 100%;
        align-items: center;
        padding-top: 10px;

        .my-movies-list {
            display: grid;
            justify-items: center;
            align-self: start;
            overflow: auto;

            .my-movies-list-filter {
                position: absolute;
                left: 15px;
                width: 25%;

                button {
                    align-self: center;
                    justify-self: center;
                    background-color: variables.$secondary-color !important;
                }

                .my-movies-list-filter-selectors {
                    .my-movies-list-filter-section {
                        margin-top: 15px;
                    }

                    .v-input__control {
                        .v-input__slot {
                            margin: 0;

                            .v-input--switch__track,
                            .v-input--switch__thumb,
                            .v-input--selection-controls__ripple {
                                &.accent--text{
                                    color: variables.$additional-color !important;
                                }

                                color: variables.$secondary-color !important;
                            }

                            .v-label {
                                color: variables.$fonts-color;
                            }
                        }
                        .v-messages {
                            display: none;
                        }
                    }
                }
            }
        }
    }

    .my-movies-buttons {
        width: 100%;
        display: grid;
        justify-items: center;
        grid-template-columns: 1fr 4fr;

        .my-movies-buttons-icon {
            .v-icon {
                color: variables.$additional-color !important;
                margin-top: 45px;
                transition: margin 1s;

                &.watchlist-selected {
                    margin-top: 5px;
                    transition: margin 1s;
                }
            }
        }

        .my-movies-buttons-items {
            width: 100%;
            display: grid;
            grid-template-rows: 40px 40px;
            justify-items: start;

            button {
                font-size: 17px;
                letter-spacing: 0.5px;
                color: variables.$fonts-color !important;
                transition: color 2s;
                text-transform: none;

                &.selected {
                    color: variables.$additional-color !important;
                    transition: color 2s;
                }
            }
        }
    }
</style>
