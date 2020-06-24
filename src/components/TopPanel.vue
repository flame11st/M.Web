<template>
    <div class="top-panel">
        <div class="top-panel-left-block">
            <a href="/">
                <img alt="logo" src="../assets/W-logo.png">
            </a>
        </div>
        <search v-show="userId"/>
        <user-info class="user-info-component" :class="{ 'movies-loading' : isMoviesLoading }"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import UserInfo from './UserInfo.vue';
import Search from './Search.vue';
import EventBus from '@/services/eventBus';

@Component({
    components: {
        UserInfo,
        Search,
    },
})
export default class TopMenu extends Vue {
    isMoviesLoading = false;

    get userId() {
        const result = this.$store.getters.userId;

        return result;
    }

    mounted() {
        EventBus.$on('setMoviesLoading', (value: any) => {
            this.isMoviesLoading = value;
        });
    }
}
</script>

<style lang="scss">
    @use '../style/variables';

    .top-panel {
        display: grid;
        grid-template-columns: 1fr;
        height: 80px;
        box-shadow: 0px 0px 6px #a6a5a5;

        .top-panel-left-block {
            display: none;
            grid-template-columns: 3fr 2fr;
            max-width: 100%;

            img {
                margin-top: 5px;
                margin-left: 10px;
                height: 70px;
            }
        }

        .user-info-component {
            position: absolute;
            left: 120px;
            top: 16px;
        }
    }

    @media screen and (min-width: 900px) {
        .top-panel {
            grid-template-columns: 1fr 8fr;

            .top-panel-left-block {
                display: grid;
            }
        }
    }

    @media screen and (max-width: 899px) {
        .top-panel .user-info-component {
            right: 10px;
            left: auto;
            top: 86px;

            .avatar .v-avatar {
                height: 40px !important;
                min-width: 40px !important;
                width: 40px !important;
            }

            &.movies-loading {
                display: none;
            }
        }

        .v-tooltip__content.menuable__content__active {
            display: none !important;
        }
    }
</style>
