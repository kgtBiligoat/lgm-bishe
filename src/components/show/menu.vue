<template>
    <div class="menu"> 
        <el-menu :default-active="activeIndex" class="el-menu-demo menu" mode="horizontal" @select="handleSelect" style="display: flex;justify-content: center;">
            <el-menu-item index="1">个人管理</el-menu-item>
            <el-menu-item index="2">表单创建</el-menu-item>
            <el-menu-item index="3">表单展示</el-menu-item>
            <el-menu-item index="4" @click="logout">登出</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      async logout() {
        let data = await this.$store.dispatch('logout')
        console.log(data)
        if(data.data.status === 1) {
            this.$router.push('/')
        }
      }
    }
  }
</script>
<style scoped>
.menu {
    height: 100%;
    width: 100%;
}
</style>
