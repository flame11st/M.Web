<template>
    <v-app>
        <div id="main">
            <div id="top-panel-component">
                <top-panel/>
            </div>

            <div v-if="userId" id="component-placeholder">
                <router-view />
            </div>
            <div v-else id="welcome-card-component">
                <welcome-card />
            </div>
            <v-overlay :value="showLoader">
                <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
        </div>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TopPanel from './TopPanel.vue';
import WelcomeCard from './WelcomeCard.vue';
import ServiceAgent from '@/services/serviceAgent';


const serviceAgent = new ServiceAgent();

@Component({
    components: {
        TopPanel,
        WelcomeCard,
    },
})
export default class Main extends Vue {
    get userId() {
        const result = this.$store.getters.userId;

        return result;
    }

    get showLoader() {
        const result = this.$store.getters.showLoader;

        return result;
    }
}
</script>

<style lang="scss">
    @use '../style/variables';

    #main {
        background-color: variables.$primary-color;
        color: variables.$fonts-color !important;
        height: 100%;
    }

    #sidebar-component {
        grid-area: sidebar-component;
    }

    #component-placeholder {
        grid-area: component-placeholder;
        height: calc(100% - 80px);
    }
</style>
