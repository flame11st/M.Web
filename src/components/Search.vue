<template>
    <div class="search">
        <v-card class="search-panel"
            @mouseleave="setMouseLeaved(true)"
            @mouseenter="setMouseLeaved(false)"
        >
            <v-text-field
                prepend-inner-icon="mdi-movie-search"
                class="search-input"
                v-model="searchText"
                solo
                label="Start typing to Search"
                clearable
                ref="searchInput"
            ></v-text-field>
            <v-progress-linear
                v-show="isLoading"
                indeterminate
            ></v-progress-linear>
            <v-fab-transition>
                <div v-show="items.length > 0" class="seach-finded-items">
                    <v-card
                        class="seach-finded-item"
                        v-for="(item, index) in items"
                        :key="index"
                    >
                        <v-img class="seach-finded-item-image" :src="imageUrl + item.PosterPath"/>

                        <div>
                            <h3>{{ item.Title }}</h3>
                            <p>{{ item.Year }}</p>
                            <p>{{ item.Genres.join(', ') }}</p>
                        </div>
                        <div class="buttons">
                            <buttons
                                :movieId="item.Id"
                                :movieRate="item.MovieRate"
                                :movieRateChangedCallback="rateMovie"
                            ></buttons>
                        </div>
                    </v-card>
                </div>
            </v-fab-transition>
        </v-card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import _ from 'lodash';
import ServiceAgent from '../services/serviceAgent';
import EventBus from '../services/eventBus';
import Buttons from './shared/BottomButtons.vue';
import MovieRate from '@/enums/movieRate';
import Movie from '@/objects/movie';
import MovieSearchDTO from '@/objects/movieSearchDTO';

const serviceAgent = new ServiceAgent();

@Component({
    components: {
        Buttons,
    },
})
export default class Search extends Vue {
    isLoading = false;

    isMouseLeaved = false;

    items: any = [];

    searchText = '';

    debouncedSearch: any;

    searchFocused = false;

    public imageUrl = 'https://image.tmdb.org/t/p/w500';

    mounted() {
        this.debouncedSearch = _.debounce(this.search, 500);

        this.$watch(
            () => (this.$refs.searchInput as any).isFocused,
            (val) => {
                this.searchFocused = val;
            },
        );

        window.onclick = () => {
            if (this.isMouseLeaved && !this.searchFocused) {
                this.searchText = '';
            }
        };
    }

    @Watch('searchText')
    onSearchTextChanged() {
        if (this.searchText && this.searchText !== '') {
            this.isLoading = true;
            this.debouncedSearch();
        } else {
            this.items = [];
        }
    }

    setMouseLeaved(isMouseLeaved: boolean) {
        this.isMouseLeaved = isMouseLeaved;
    }

    get userId() {
        const result = this.$store.getters.userId;

        return result;
    }

    get userMovies(): Movie[] {
        const result = this.$store.getters.userMovies;

        return result;
    }

    getSnackbarText(movieRate: MovieRate) {
        switch (movieRate) {
        case MovieRate.notLiked:
        case MovieRate.liked: {
            return `Added to 'Viewed' with rate '${MovieRate[movieRate]}'`;
        }
        case MovieRate.addedToWatchlist: {
            return 'Added to WatchList';
        }
        default: {
            return '';
        }
        }
    }

    async rateMovie(movieId: string, movieRate: MovieRate) {
        this.searchText = '';

        await serviceAgent.RateMovie(movieId, this.userId, movieRate)
            .then(() => {
                EventBus.$emit('openSnackbar', { snackbarText: this.getSnackbarText(movieRate), snackbarSuccess: true });

                setTimeout(() => {
                    this.$store.dispatch('setUserMovies');
                }, 1000);
            });
    }

    async search() {
        const self = this;
        const movies = await serviceAgent.Search(this.searchText);

        this.items = movies.data.map((m: any): MovieSearchDTO => {
            const result = new MovieSearchDTO(m);
            const intersectedMovies = self.userMovies.filter((um: MovieSearchDTO) => result.Id === um.Id);

            if (intersectedMovies.length > 0) result.MovieRate = intersectedMovies[0].MovieRate;

            return result;
        });

        this.isLoading = false;
    }
}
</script>

<style lang="scss">
    @use '../style/variables';

    .search {
        display: grid;
        justify-items: center;
        padding-top: 15px;
        height: fit-content;

        .v-snack__wrapper {
            background-color: variables.$additional-color;
            min-width: 250px;
        }

        .search-panel {
            width: 90%;
            z-index: 10;

            .seach-finded-items {
                max-height: 90vh;
                overflow: auto;

                .seach-finded-item {
                    padding: 10px;
                    display: grid;
                    grid-template-columns: 1fr 5fr 200px;

                    .buttons {
                        align-self: center;
                    }

                    p {
                        padding-top: 8px;
                        margin-bottom: 0;
                    }

                    .seach-finded-item-image {
                        width: 60px;
                        height: 90px;
                    }
                }
            }

            .v-text-field__details {
                display: none;
            }

            .v-input__slot {
                margin: 0;

                .v-input__prepend-inner {
                    padding-right: 10px;
                }
            }
        }

        @media screen and (min-width: 900px) {
            .search-panel {
                width: 80%;
            }
        }

        @media screen and (min-width: 1100px) {
            .search-panel {
                width: 60%;
            }
        }

        @media screen and (min-width: 1500px) {
            .search-panel {
                width: 50%;
            }
        }
    }
</style>
