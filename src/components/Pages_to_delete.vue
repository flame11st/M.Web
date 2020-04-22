<template>
    <div class="pages">
        <v-list dark class="pa-0">
            <v-list-item ripple>
                <v-list-item-content>
                    <router-link to="Recommendations">Recommendations</router-link>
                </v-list-item-content>
            </v-list-item>
            <v-list-item ripple>
                <v-list-item-content>
                    <router-link to="MyMovies">My movies</router-link>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Pages extends Vue {

}
</script>

<style scoped>
    .pages {
        border: 1px solid white;
        align-self: center;
        /* background-color: chartreuse; */
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1em;
        justify-items: end;
    }

    .pages .v-list {
        background: transparent;
    }

    a {
        text-decoration: none;
        color: white !important;
    }
</style>
