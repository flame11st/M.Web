<template>
    <div class="loader-top-panel">
        <div class="loader-top-panel-left-block">
            <v-skeleton-loader
                height="48"
                width="60"
                type="image"
            >
            </v-skeleton-loader>
        </div>
        <div class="loader-top-panel-search">
            <v-skeleton-loader
                height="48"
                type="image"
            >
            </v-skeleton-loader>
        </div>
        <div class="loader-user-info-component">
            <v-skeleton-loader
                type="avatar"
                height="48"
            >
            </v-skeleton-loader>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import IdentityButtons from './identity/IdentityButtons.vue';

@Component
export default class LoaderTopPanel extends Vue {

}
</script>

<style lang="scss">
    .loader-top-panel {
        display: grid;
        grid-template-columns: 1fr;
        height: 80px;
        box-shadow: 0px 0px 6px #a6a5a5;
        align-items: center;

        .loader-top-panel-left-block {
            display: none;
        }

        .loader-user-info-component {
            position: absolute;
            left: 120px;
            top: 16px;
            display: none;
        }

        .loader-top-panel-search {
            width: 90%;
            height: 48px;
            justify-self: center;
        }
    }

    @media screen and (min-width: 900px) {
        .loader-top-panel {
            grid-template-columns: 1fr 8fr;

            .loader-top-panel-left-block {
                display: grid;
                height: 48px;
                width: 65px;
                padding-left: 20px;
            }

            .loader-user-info-component {
                display: block;
            }

            .loader-top-panel-search {
                width: 80%;
            }
        }
    }


    @media screen and (min-width: 1100px) {
        .loader-top-panel {
            .loader-top-panel-search {
                width: 60%;
            }
        }
    }

    @media screen and (min-width: 1500px) {
        .loader-top-panel {
            .loader-top-panel-search {
                width: 50%;
            }
        }
    }
</style>
