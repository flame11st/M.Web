<template>
    <div class="movie-recommendations">
        <MovieDetailsItem class="movie-details-component" :movieId='movieId'/>
        <BottomButtons
            class="bottom-buttons"
            :movieId="movieId"
        >
            <v-btn @click="getRecomendation">Next</v-btn>
        </BottomButtons>

        <v-overlay :value="pendingLoad">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import BottomButtons from './shared/BottomButtons.vue';
import ServiceAgent from '../services/serviceAgent';
import MovieRate from '../enums/movieRate';

const serviceAgent = new ServiceAgent();

@Component({
    components: {
        BottomButtons,
    },
})
export default class MovieRecommendations extends Vue {
    public movieId = '';

    public pendingLoad = false;

    public MovieRate!: MovieRate;

    get userId() {
        const result = this.$store.getters.userId;

        return result;
    }

    // getRecomendation() {
    //     this.pendingLoad = true;

    //     serviceAgent.GetRecommendationForUser(this.userId).then((r) => {
    //         this.movieId = r.data;

    //         setTimeout(() => {
    //             this.pendingLoad = false;
    //         }, 500);
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // }

    // created() {
    //     this.getRecomendation();
    // }
}
</script>

<style>
    .movie-recommendations {
        display: grid;
        height: 100%;
        grid-template-areas:
        ". . . "
        ". movie-details . "
        ". bottom-buttons . ";
        grid-template-rows: 1fr 4fr 1fr;
        grid-template-columns: 1fr 7fr 1fr;
    }

    .bottom-buttons{
        grid-area: bottom-buttons;
    }

    .movie-details-component {
        grid-area: movie-details;
    }
</style>
