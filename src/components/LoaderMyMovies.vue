<template>
    <div class="loader-my-movies">
        <div class="loader-my-movies-button">
            <v-skeleton-loader
                height="35"
                width="100"
                type="heading"
            >
            </v-skeleton-loader>

            <v-skeleton-loader
                height="48"
                width="100"
                type="heading"
            >
            </v-skeleton-loader>
        </div>
        <div class="loader-my-movies-list">
            <v-skeleton-loader class="loader-my-movies-list-item" type="image" />
            <v-skeleton-loader class="loader-my-movies-list-item" type="image" />
            <v-skeleton-loader class="loader-my-movies-list-item" type="image" />
            <v-skeleton-loader class="loader-my-movies-list-item" type="image" />
            <v-skeleton-loader class="loader-my-movies-list-item" type="image" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import IdentityButtons from './identity/IdentityButtons.vue';

@Component
export default class LoaderMyMovies extends Vue {

}
</script>

<style lang="scss">
    .loader-my-movies {
        display: grid;
        grid-template-columns: 1fr;
        height: 100%;
        max-height: Calc(100vh - 100px);

        .loader-my-movies-button {
            align-self: center;
            display: none;

            .v-skeleton-loader__heading {
                width: 100% !important;
            }
        }

        .loader-my-movies-list {
            width: 100%;
            display: grid;
            justify-items: center;
            max-height: Calc(100vh - 100px);
            overflow: auto;

            .loader-my-movies-list-item {
                width: 90%;
                margin-top: 10px;
                height: 120px;
            }
        }
    }

    @media screen and (min-width: 900px) {
        .loader-my-movies {
            grid-template-columns: 1fr 8fr;

            .loader-my-movies-button {
                display: block;
            }

            .loader-my-movies-list {
                .loader-my-movies-list-item {
                    height: 150px;
                     width: 80%;
                }
            }
        }
    }


    @media screen and (min-width: 1100px) {
        .loader-my-movies {
            .loader-my-movies-list {
                .loader-my-movies-list-item {
                    width: 60%;
                }
            }
        }
    }

    @media screen and (min-width: 1500px) {
        .loader-my-movies {
            .loader-my-movies-list {
                .loader-my-movies-list-item {
                    width: 50%;
                }
            }
        }
    }
</style>
