<template>
    <div class="rating">
        <v-progress-linear
            v-model="movieRating"
            :color="color"
            height="25"
            rounded
            reactive
        >
            <strong>{{ Math.ceil(movieRating) }}%</strong>
        </v-progress-linear>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class Rating extends Vue {
    @Prop() movieRating!: number;

    get color() {
        let result = 'red';

        if (this.movieRating >= 70) {
            result = 'green';
        } else if (this.movieRating >= 40) {
            result = 'yellow';
        }

        return result;
    }
}
</script>

<style>
    .rating {
        color: black !important;
        display: grid;
        align-content: center;
        width: 150px;
        justify-self: center;
        /* background-color: greenyellow; */
    }
</style>
