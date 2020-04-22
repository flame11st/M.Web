<template>
    <div class="search">
        <v-autocomplete
            class="search-input"
            dark
            v-model="searchText"
            :items="items"
            :loading="isLoading"
            color="white"
            hide-no-data
            hide-selected
            outlined
            item-text="Description"
            item-value="API"
            placeholder="Start typing to Search"
            append-icon="mdi-database-search"
            return-object
        ></v-autocomplete>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Search extends Vue {
    isLoading = false;

    items: any[] = [];

    searchText = '';
}
</script>

<style>
    .search {
        display: grid;
        justify-items: center;
        align-content: center;
    }

    .search-input {
        width: 60%;
    }

    .search-input .v-text-field__details {
        display: none;
    }

    .search-input .v-input__slot {
        margin: 0;
    }

    .search-input .v-icon {
        transform: none !important;
    }
</style>
