<template>
    <div>
        <menu-bar style="margin-bottom: 50px;"></menu-bar>
        <main-bar></main-bar>
    </div>
</template>
<script >
import menuBar from './menu.vue'
import mainBar from './main.vue'
export default {
    components: { menuBar, mainBar }
}
</script>
<style scoped>
</style>
