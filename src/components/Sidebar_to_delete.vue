<template>
    <div class="sidebar">
        <top-menu class="top-menu-component" />
        <pages class="pages-component" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Pages from './Pages_to_delete.vue';

@Component({
    components: {
        Pages,
    },
})
export default class Sidebar extends Vue {

}
</script>

<style scoped>
.sidebar {
    display: grid;
    grid-template-rows: 1fr;
    height: 100%;
}

.top-menu-component {
    width: 12.5%;
    position: absolute;
}

/* .pages-component {

} */

</style>
