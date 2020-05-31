<template>
    <v-card class="movie-list-item" :class="{ 'expanded' : isItemExpanded }" @click="itemClickHandler">
        <div class="movie-list-item-fields">
            <img class="movie-image" :src="imageSrc"/>

            <div class="movie-list-item-text-fields">
                <p class="movie-list-item-title">{{ movie.Title }}</p>

                <p v-show="isItemExpanded">{{ movie.Tagline }}</p>

                <p>{{ movie.Year }}</p>

                <p>{{ movie.Genres.join(', ') }}</p>

                <p :class="{ 'ma-0' : !isItemExpanded }">
                    {{ movie.MovieType === MovieType.tv ? `${movie.AverageTimeOfEpisode} min / episode` : `${movie.Duration} min` }}
                </p>

                <p v-show="isItemExpanded && movie.MovieType === MovieType.tv">
                    {{ `${movie.SeasonsCount} season${movie.SeasonsCount > 1 ? 's' : ''}` }}
                </p>

                 <p v-show="isItemExpanded && movie.Directors.length">
                    {{ `Director${movie.Directors.length > 1 ? 's' : ''}: ` + movie.Directors.map(a => a.Name).join(', ') }}
                </p>

                <p v-show="isItemExpanded && movie.Actors.length">
                    Starring: {{ movie.Actors.map(a => a.Name).join(', ') }}
                </p>

                <p v-show="isItemExpanded && movie.Countries.length">
                    Countries: {{ movie.Countries.join(', ') }}
                </p>
            </div>
            <MovieListItemButtons :movie="movie" :expanded="isItemExpanded" />
        </div>

        <div class="movie-list-item-rating">
            <rating :movieRating="movie.Rating" :scores="movie.Scores" />
            <span v-show="isItemExpanded">{{ movie.Scores ? `Scores: ${movie.Scores}` : 'Not rated yet'}}</span>
        </div>

        <div class="movie-list-item-overview">
            {{ movie.Overview }}
        </div>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Movie from '@/objects/movie';
import Rating from '../Rating.vue';
import MovieListItemButtons from './MovieListItemButtons.vue';
import MovieRate from '@/enums/movieRate';
import ServiceAgent from '@/services/serviceAgent';
import MovieType from '@/enums/movieType';

const serviceAgent = new ServiceAgent();

@Component({
    components: {
        Rating,
        MovieListItemButtons,
    },
})
export default class MovieListItem extends Vue {
    @Prop() movie!: Movie;

    MovieType = MovieType;

    imageUrl = 'https://image.tmdb.org/t/p/w500/';

    isItemExpanded = false;

    get imageSrc() {
        let src = '';

        if (this.movie) {
            src = this.imageUrl + this.movie.PosterPath;
        }

        return src;
    }

    async itemClickHandler(event: any) {
        this.isItemExpanded = !this.isItemExpanded;
        let timeout = 0;
        const area = document.getElementsByClassName('my-movies-list')[0] as HTMLElement;
        const targetElement = event.currentTarget as HTMLElement;
        const itemsCount = targetElement.parentElement?.children.length;

        if (itemsCount && targetElement.clientHeight * itemsCount < area.clientHeight) {
            timeout = 200;
        }

        const options = {
            duration: 500,
            offset: 0,
            container: area,
        };

        setTimeout(() => {
            this.$vuetify.goTo(targetElement, options);
        }, timeout);
    }
}
</script>

<style lang="scss">
    @use '../../../style/variables';

    .movie-list-item {
        transition: all .5s ease;
        display: flex;
        flex-direction: column;
        padding: 15px;
        width: 55%;
        max-height: 150px;
        overflow: hidden;

        .movie-list-item-fields {
            grid-gap: 1em;
            display: flex;
            grid-auto-flow: row;

            .movie-list-item-text-fields p{
                margin-bottom: 6px;
            }

            .movie-list-item-text-fields {
                height: 120px;
                width: 100%;
                padding-left: 20px;
            }

            .movie-list-item-title {
                color: variables.$additional-color;
                font-size: 20px;
                font-weight: bold;
            }

            .movie-image {
                height: 120px;
                transition: all .5s ease;
                border-radius: 4px;
            }
        }

        .movie-list-item-rating {
            display: grid;
            align-items: center;
            grid-auto-flow: column;
            grid-template-columns: 200px 1fr;
            height: 55px;

            .rating {
                display: grid;
                justify-self: start;
                transition: all .5s ease;
                width: 80px;
            }

            span {
                padding-left: 20px;
            }
        }

        .movie-list-item-overview {
            text-overflow: ellipsis;
            max-height: 100%;
            overflow: hidden;
        }

        &.expanded {
            max-height: Calc(100vh - 105px);
            grid-template-columns: 1fr;
            height: fit-content;

            .movie-list-item-fields {
                grid-template-columns: 200px 1fr 40px;

                .movie-list-item-text-fields {
                    height: 300px;

                    p {
                        margin-bottom: 8px;
                    }
                }

                .movie-image {
                    height: 300px;
                    border-radius: 4px;
                }
            }

            .movie-list-item-rating {
                .rating {
                    width: 200px;
                }
            }
        }

        &.v-card {
            background-color: variables.$secondary-color !important;
            color: variables.$fonts-color;
        }
    }
</style>
