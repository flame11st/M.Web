<template>
    <div class="bottom-buttons">
        <div class="m-controls">
            <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-icon
                            v-on="on"
                            @click="rateMovie(true)"
                            dark
                        >mdi-thumb-up-outline</v-icon>
                    </template>
                <span>Like</span>
            </v-tooltip>

            <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-icon
                            v-on="on"
                            @click="rateMovie(false)"
                            dark
                        >mdi-thumb-down-outline</v-icon>
                    </template>
                <span>Not like</span>
            </v-tooltip>

            <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-icon
                            v-on="on"
                            @click="addToWatchlist()"
                            dark
                         >mdi-card-plus-outline</v-icon>
                    </template>
                <span>Add to watchlist</span>
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

    async rateMovie(isLiked: boolean) {
        await serviceAgent.RateMovie(this.movieId, this.userId, isLiked);
    }

    async addToWatchlist() {
        await serviceAgent.AddToWatchlist(this.userId, this.movieId);
    }

    get userId() {
        const result = this.$store.state.userId;

        return result;
    }

    // @Watch('movieRate')
    // onMovieRateChanged() {
    // }
}
</script>

<style>
    .bottom-buttons {
        display: grid;
        padding: 20px;
        border: 1px solid white;
        justify-self: center;
        justify-content: center;
        /* background-color: cornflowerblue; */
    }

    .m-controls {
        padding-bottom: 10px;
    }

    .m-controls i{
        padding: 0 10px;
        font-size: 30px !important;
    }
</style>
