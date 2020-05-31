<template>
    <div class="movies-list">
        <transition-group name="list" class="movie-list-transition">
            <movie-list-item
                v-for="movie in movies"
                :key="movie.Id"
                :movie="movie"
            />
        </transition-group>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import MovieListItem from './MovieListItem.vue';
import Movie from '@/objects/movie';

@Component({
    components: {
        MovieListItem,
    },
})
export default class MovieList extends Vue {
    @Prop() movies!: Movie[];
}
</script>

<style lang="scss">
    .movies-list {
        width: 100%;
        max-height: Calc(100vh - 100px);
        align-self: start;

        .movie-list-transition {
            display: grid;
            justify-items: center;
            width: 100%;
            row-gap: 10px;
        }
    }

    .list-enter-active, .list-leave-active {
        transition: all 0.5s;
    }

    .list-enter, .list-leave-to {
        opacity: 0;
        transform: scale(0); //translateX(300px);
    }
</style>
