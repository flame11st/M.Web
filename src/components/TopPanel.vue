<template>
    <div class="top-menu">
        <div class="left-block">
            <img alt="logo" src="../assets/W-logo.png">
        </div>
        <search v-show="userId"/>
        <user-info class="user-info-component"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import UserInfo from './UserInfo.vue';
import Search from './Search.vue';

@Component({
    components: {
        UserInfo,
        Search,
    },
})
export default class TopMenu extends Vue {
    get userId() {
        const result = this.$store.getters.userId;

        return result;
    }
}
</script>

<style lang="scss">
    .top-menu {
        display: grid;
        grid-template-columns: 1fr 8fr;
        height: 80px;
        box-shadow: 0px 0px 6px #a6a5a5;

        .left-block {
            display: grid;
            grid-template-columns: 3fr 2fr;
            max-width: 100%;

            > img {
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
</style>
