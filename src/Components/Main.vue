<template>
    <div id="main">
        <div id="top-menu-component">
            <TopMenu/>
        </div>
        <div id="pages-component">
            <pages/>
        </div>
        
        <div id="component-placeholder">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Pages from './Pages/Pages.vue'
import TopMenu from './TopMenu/TopMenu.vue'

export default {
    components: {
        Pages,
        TopMenu
    },
    data() {
        return {
        }
    },
    methods:{
        
    }
}
</script>

<style>
    #main {
        display: grid;
        grid-template-areas:
        "top-menu top-menu"
        "pages-component component-placeholder";
        grid-template-rows: 60px 1fr;
        grid-template-columns: 1fr 6fr;
        grid-gap: 1em;
        height: 97vh;
    }

    #top-menu-component{
        background-color: coral;
        grid-area: top-menu;
    }

    #pages-component {
        display: grid;
        grid-area: pages-component;
        background-color: blueviolet;
    }

    #component-placeholder {
        grid-area: component-placeholder;
        background-color: aqua;
    }

    .pages{
        align-self: center;
        background-color: chartreuse;
    }
</style>

