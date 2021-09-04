<template>
    <v-app>
        <div id="main">
            <div id="top-panel-component">
                <top-panel />
            </div>

            <support />

            <!-- Commented to avoid issues on remote server -->

            <!-- <div id="top-panel-component" v-show="isLoaded">
                <top-panel v-if="isUserAuthorized"/>
            </div> -->

            <!-- <loader-top-panel v-show="!isLoaded" />

            <div v-show="isLoaded && !isMoviesLoading" class="main-content">
                <div v-if="isUserAuthorized" id="component-placeholder">
                    <router-view />
                </div>
                <div v-else id="welcome-card-component">
                    <welcome-card />
                </div>
            </div>

            <loader-my-movies v-show="!isLoaded || isMoviesLoading" />

            <v-overlay :value="showLoader">
                <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
            <v-snackbar
                v-model="snackbarOpened"
                :timeout="3000"
                top
                right
                :class="{ 'snackbar-error' : !snackbarSuccess }"
            >
                {{ snackbarText }}
            </v-snackbar> -->
        </div>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TopPanel from './TopPanel.vue';
import WelcomeCard from './WelcomeCard.vue';
import LoaderTopPanel from './LoaderTopPanel.vue';
import LoaderMyMovies from './LoaderMyMovies.vue';
import ServiceAgent from '@/services/serviceAgent';
import EventBus from '@/services/eventBus';
import Privacy from '@/components/appStore/Privacy.vue';
import Support from '@/components/appStore/Support.vue';

const serviceAgent = new ServiceAgent();

@Component({
    components: {
        TopPanel,
        WelcomeCard,
        LoaderTopPanel,
        LoaderMyMovies,
        Privacy,
        Support,
    },
})
export default class Main extends Vue {
    snackbarOpened = false;

    snackbarText = '';

    snackbarSuccess = false;

    showLoader = false;

    isMoviesLoading = false;

    get isUserAuthorized() {
        const result = this.$store.getters.isUserAuthorized;

        return result;
    }

    get isLoaded() {
        const result = this.$store.getters.isLoaded;

        return result;
    }

    created() {
        this.$store.dispatch('setIsUserAuthorized');

        EventBus.$on('openSnackbar', (data: any) => {
            this.snackbarOpened = true;
            this.snackbarText = data.snackbarText;
            this.snackbarSuccess = data.snackbarSuccess;
        });

        EventBus.$on('showLoader', (value: any) => {
            this.showLoader = value;
        });

        EventBus.$on('setMoviesLoading', (value: any) => {
            this.isMoviesLoading = value;
        });
    }
}
</script>

<style lang="scss">
    @use '../style/variables';

    #main {
        background-color: variables.$primary-color;
        color: variables.$fonts-color !important;
        height: 100%;

        .main-content {
            height: calc(100% - 80px);
        }
    }

    #sidebar-component {
        grid-area: sidebar-component;
    }

    #component-placeholder {
        grid-area: component-placeholder;
        height: 100%;
    }

    .snackbar-error {
        .v-snack__wrapper {
            background-color: #F44336 !important;
        }
    }

    .v-snack__wrapper {
        background-color: variables.$additional-color !important;
        min-width: 250px;
    }
</style>
