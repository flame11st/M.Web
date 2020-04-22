<template>
    <div class="top-menu" dark>
        <user-info />
        <search />
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

}
</script>

<style>
    .top-menu {
        display: grid;
        grid-template-columns: 1fr 8fr;
        grid-gap: 1em;
        height: 80px;
        /* border-bottom: 1px solid white; */
        box-shadow: 0px -5px 15px #a6a5a5;
    }
</style>
