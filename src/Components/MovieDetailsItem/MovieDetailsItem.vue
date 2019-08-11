<template>
    <div class="movie-details-item">
        <img class="movie-image" :src="imageSrc"/>
        <div class="text-fields">
            <p> movieId: {{ movieId }} </p>
            <span v-if="movie">
                <p > {{ movie.title }} </p>
                <p > {{ movie.overview }} </p>
                <p > {{ movie.releaseDate }} </p>
                 <p > {{ movie.tagline }} </p>
            </span>
        </div> 
    </div>
    
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            url: 'https://localhost:44321/api/movies/getmovie?id=',
            movie: null,
            imageUrl: "https://image.tmdb.org/t/p/w500/"
        }
    },
    props: ['movieId'],
    methods: {
        getMovie (id) {
            axios.get(this.url + id).then(r => {
                this.movie = r.data;
                this.bool = true;
                });
        }
    },
    watch: {
        movieId: function(val){
            this.getMovie(val);
        }
    },
    computed: {
        imageSrc: function() {
            if(this.movie)
                return this.imageUrl + this.movie.posterPath;
        }
    }
}
</script>

<style scoped>
    .movie-details-item{
        display: grid;
        height: 100%;
        width: 100%;
        background-color: lightsalmon;
        grid-template-columns: 1fr 2fr 4fr 1fr;
        grid-gap: 1em;
    }

    .movie-image {
        width:100%;
        height: 100%;
        grid-column-start: 2;
        background-color: darkslategrey;
        height: 21em;
        width: 14em;
    }
</style>

