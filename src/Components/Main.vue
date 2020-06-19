<template>
    <v-app>
        <div id="main">
            <div id="top-panel-component">
                <top-panel v-if="isUserAuthorized"/>
            </div>

            <div v-if="isUserAuthorized" id="component-placeholder">
                <router-view />
            </div>
            <div v-else id="welcome-card-component">
                <welcome-card />
            </div>
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
            </v-snackbar>
        </div>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TopPanel from './TopPanel.vue';
import WelcomeCard from './WelcomeCard.vue';
import ServiceAgent from '@/services/serviceAgent';
import EventBus from '@/services/eventBus';

const serviceAgent = new ServiceAgent();

@Component({
    components: {
        TopPanel,
        WelcomeCard,
    },
})
export default class Main extends Vue {
    snackbarOpened = false;

    snackbarText = '';

    snackbarSuccess = false;

    showLoader = false;

    get isUserAuthorized() {
        const result = this.$store.getters.isUserAuthorized;

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

    .snackbar-error {
        .v-snack__wrapper {
            background-color: #F44336;
        }
    }

    .v-snack__wrapper {
        background-color: variables.$additional-color;
        min-width: 250px;
    }
</style>
