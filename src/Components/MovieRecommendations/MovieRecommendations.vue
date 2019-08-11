<template>
    <div class="movie-recommendations">
        <Rating/>
        <MovieDetailsItem :movieId='movieId'/>
        <BottomButtons>
            <button @click="getRecomendation">Next</button>
        </BottomButtons>
    </div>
</template>

<script>
import axios from 'axios'
import MovieDetailsItem from '../MovieDetailsItem/MovieDetailsItem.vue'
import Rating from '../Rating/Rating.vue'
import BottomButtons from '../BottomButtons/BottomButtons.vue'

export default {
    data () {
        return{
            url:"https://localhost:44321/api/movies/GetRecommendation",
            movieId:""
        }
    },
    methods: {
        getRecomendation () {
            axios.get(this.url).then(r => this.movieId = r.data);
        }
    },
    components: {
        MovieDetailsItem,
        BottomButtons,
        Rating
    },
    created () {
        this.getRecomendation();
    }
}
</script>

<style>
    .movie-recommendations {
        display: grid;
        grid-template-rows: 1fr 7fr 1.5fr;
        height: 100%;
    }
</style>
