<template>
    <v-app>
        <div id="main">
            <div id="top-panel-component">
                <top-panel/>
            </div>

            <div id="component-placeholder">
                <router-view />
            </div>
        </div>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TopPanel from './TopPanel.vue';

@Component({
    components: {
        TopPanel,
    },
})
export default class Main extends Vue {

}
</script>

<style>
    #main {
        background-color: #141414;
        color: white;
        height: 100%;
    }

    #sidebar-component {
        grid-area: sidebar-component;
    }

    #component-placeholder {
        grid-area: component-placeholder;
        /* background-color: aqua; */
    }

    ::-webkit-scrollbar {
        width: .2rem;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent
    }

    ::-webkit-scrollbar-thumb {
        background-color: #747475;
    }

    ::-webkit-scrollbar-thumb:window-inactive {
        background-color: #747475
    }
</style>
