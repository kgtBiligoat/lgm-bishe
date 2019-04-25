<template>
    <div class="test">


        <el-form label-position="right" label-width="80px" :model="userMessage" :rules="rules" ref="elForm">
            <el-form-item 
                v-for="(item, index) in userMessage"
                v-show="index !== 'id' && index !== '__v'" 
                :prop="index"
                :key="index"
                :label="toCn(index)"
            >
                <div>
                    <el-input v-show="toCn(index)" style="width: 80%;" v-model="userMessage[index]" v-if="index !== 'sex'"></el-input>
                    <div v-else>
                        <el-radio v-model="userMessage[index]" label="man">男</el-radio>
                        <el-radio v-model="userMessage[index]" label="women">女</el-radio>                    
                    </div>                    
                </div>
            </el-form-item>  
        </el-form>
        <div class="button">
            <el-button @click="submit" type="primary">确定</el-button>            
        </div>
    </div>
</template>
<script>
export default {
    data() {
        var validateUser = (rule, value, callback) => {
            if (!value.trim()) {
                return callback(new Error('username is not allowed be empty'))
            } else if (/\d|\s/.test(value.trim())) {
                return callback(new Error('username should be alphabet'))
            }
            else {
                callback()
            }
        }
        var validatePass = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('password is not allowed be empty'))
            } else {
                callback()
            }
        }
        var validatePhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('password is not allowed be empty'))
            } else if (value.length !== 11) {
                return callback(new Error('The phone number must be 11!'))
            } else if (/[a-zA-Z]/.test(value)) {
                return callback(new Error('The phone can not have alphria'))
            } else {
                callback()
            }
        }
        var validateEmail = (rule, value, callback) => {
            var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            if (!value) {
                return callback(new Error('password is not allowed be empty'))
            } else if (!reg.test(value)) {
                return callback(new Error('The email is not exist'))
            } else {
                callback()
            }
        }
        return {
            userMessage: {},
            rules: {
                username: [
                    { validator: validateUser, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                email: [
                    { validator: validateEmail, trigger: 'blur' }
                ],
                phone: [
                    { validator: validatePhone, trigger: 'blur' }
                ]
            }  
        }
    },

    methods: {
        toCn(enName) {
            switch(enName) {
                case 'username' :
                    return '用户名:'
                case 'password' : 
                    return '密码:'
                case 'phone' :
                    return '电话:'
                case 'email' :
                    return '邮箱:'
                case 'sex': 
                    return '性别:'
                default: 
                    return ''
            }
        },
        async getUserInfo() {
            let a = await this.$store.dispatch('check')
            return a
        },
        isEmpty(formName) {
            return new Promise((resolve) => {
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                });   
            })
        },
        async submit() {
            let isEmpty =  await this.isEmpty('elForm')
            console.log(isEmpty)
            if(!isEmpty) {
                let data = await this.$store.dispatch('changeUserInfo', this.userMessage)
                if (data.status === 1) {
                    this.$message({
                        type: 'success',
                        message: '成功'
                    })
                }
            } else {
                this.$message({
                    type: 'error',
                    message: '请按要求填写'
                })           
            }
            
        }  
    },
    mounted() {
        let a = this.getUserInfo().then((val) => { 
             this.$data.userMessage = { ...this.$store.state.UserMsg }
        })
    } 
}
</script>
<style  scoped>
.test {
    position: relative;
    top: -50px;
    padding-top: 150px;
    background: url(../assets/bg.jpg) no-repeat;
    background-size: cover;
    height: 700px;
}
.el-form {
    margin-left: 12%;    
    color: red !important;
}

.button {
    margin-left: 47%;
    position: relative;
    top: -50px;
}
</style>
