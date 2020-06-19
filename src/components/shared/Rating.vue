<template>
    <div class="rating">
        <v-progress-linear
            value="movieRating"
            :color="color"
            height="25"
            rounded
            reactive
        >
            <strong v-if="scores !== 0">{{ Math.ceil(movieRating) }}%</strong>
            <strong v-else> - / - </strong>
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

    @Prop() scores!: number;

    get color() {
        let result = 'red';

        if (this.movieRating >= 70) {
            result = 'green';
        } else if (this.movieRating >= 40) {
            result = 'yellow';
        } else if (this.scores === 0) {
            result = '';
        }

        return result;
    }
}
</script>

<style lang="scss">
    @use '../../style/variables';

    .rating {
        color: black !important;
        display: grid;
        align-content: center;
        width: 100%;
        justify-self: center;
        /* background-color: greenyellow; */
        .v-progress-linear__background {
            background-color: variables.$additional-color;
        }

        .v-progress-linear__content {
            background-color: variables.$additional-color;
            opacity: .3;
        }
    }
</style>
