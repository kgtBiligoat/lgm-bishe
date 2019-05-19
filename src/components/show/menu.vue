<template>
    <div class="menu"> 
        <el-menu :default-active="activeIndex" class="el-menu-demo menu" mode="horizontal" @select="handleSelect" style="display: flex;justify-content: center;">
            <el-menu-item index="1">个人管理</el-menu-item>
            <el-menu-item index="2">流程管理</el-menu-item>
            <el-menu-item index="3">我的流程</el-menu-item>
            <el-menu-item index="4">登出</el-menu-item>
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
        if (key === '1') {
          this.$router.push('/main/users')
        }
        else if (key === '2') {
          this.$router.push('/main/setForm')
        }
        else if (key === '3') {
          if(this.$store.state.UserMsg.nodes.length === 0) {
            alert('无流程无法进入')
            this.activeIndex = 2
          }
          else {
            this.$router.push('/main/getForm')
          }
          
        }
        else {
          this.logout()
        }
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
