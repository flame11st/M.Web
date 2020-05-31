<template>
    <div class="welcome-card">
        <div class="welcome-card-content">
            <span class="header">Hello & Welcome to WatchList</span>
            <identity-buttons />
        </div>
        <!-- <v-card
        width="55%"
        height="300"
        >
            <v-card-title class="welcome-card-title">
                <span class="headline">Welcome to WatchList</span>
            </v-card-title>
            <v-card-text>
                Welcome to WatchList
            </v-card-text>
        </v-card> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import IdentityButtons from './identity/IdentityButtons.vue';

@Component({
    components: {
        IdentityButtons,
    },
})
export default class WelcomeCard extends Vue {

}
</script>

<style lang="scss">
    @use '../style/variables';

    .welcome-card {
        display: grid;
        height: Calc(100vh - 80px);
        align-items: center;
        justify-items: center;
        color: variables.$fonts-color !important;

        .welcome-card-content {
            padding: 20px;
            box-shadow: 0 0 10px variables.$additional-color;
            border-radius: 5px;
            width: 45%;
            height: 400px;
            background-color: variables.$secondary-color;
            display: grid;
            grid-template-rows: 5fr 1fr;

            .header {
                text-align: center;
                font-size: 20px;
            }
        }
    }
</style>
