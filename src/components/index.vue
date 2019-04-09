<template>
    <div class="login" >
        <div class="title">
            <span>自定义表单组件生成系统</span>
        </div>
        <div class="login-input__group">
            <el-input placeholder="please input username" v-model="username">
                <template slot="prepend">用户名</template>
            </el-input>
            <el-input placeholder="please input pasdword" v-model="password" show-password>
                <template slot="prepend">密码</template>
            </el-input>            
        </div>
        <el-row>
            <el-button plain type="primary" style="margin-right: 50px;" @click="signIn">登录</el-button>
            <el-button plain type="primary" @click="signUp" >注册</el-button>
        </el-row>

        <sign-up v-show="isSignUpShow" :isSignUpShow.sync="isSignUpShow"></sign-up>

    </div>
</template>

<script >
import SignUp from './SignUp/signUp.vue'
export default {
    data() {
        return {
            username: '',
            password: '',
            isSignUpShow: false,
        };
    },
    components: { SignUp },
    methods: {
        signUp() {
            this.$data.isSignUpShow = true;
        },
        async signIn() {
            // let param = {
            //     ...this.$data
            // }
            // let data = await this.$store.dispatch('signIn', param)
            // if(data.status === 1) {                
            //     this.$message({
            //         message: data.msg,
            //         type: 'success'
            //     });
            //     setTimeout(() => {
            //         this.$router.push('/users')
            //     }, 1000)
            // } else {
            //     this.$message({
            //         message: data.msg,
            //         type: 'error'
            //     });            
            // }
            this.$router.push('/main')
        },
        change(e) {
            console.log(e)
        }
    }


}
</script>

<style>
.title {
    font-size: 50px;
    margin-bottom: 30px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.login{
    background: url(assets/timg.jpeg);
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;


}    
.login-input__group {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 100px;
    justify-content: space-between;
    margin-bottom: 20px;
            
}  
.el-input {
    width: 400px;
} 
</style>