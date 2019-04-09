<template>
    <el-dialog title="注册" :before-close="closeDialog" :visible.sync="isShow" status-icon>
        <el-form label-width="100px" :model="form" ref="elForm" :rules="rules">
            <el-form-item label="用户名:" prop="username" required>
                <el-input v-model="form.username" placeholder="please write your username"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password" required>
                <el-input v-model="form.password" placeholder="please write your password" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="checkPassword" required>
                <el-input v-model="form.checkPassword" placeholder="please check your password" show-password></el-input>
            </el-form-item>
            <el-form-item label="email:" prop="email" required>
                <el-input v-model="form.email" placeholder="please write your email"></el-input>
            </el-form-item>
            <el-form-item label="电话:" prop="phone" required>
                <el-input v-model="form.phone" placeholder="please write your phone"></el-input>
            </el-form-item>
            <el-form-item label="性别:">
                <el-radio v-model="form.sex" label="man"></el-radio>
                <el-radio v-model="form.sex" label="women"></el-radio>
            </el-form-item>
        </el-form>

        <el-row style="margin-left: 200px;">
            <el-button plain style="margin-right: 75px;" @click="reset('elForm')">重置</el-button>
            <el-button plain type="primary" @click="submit">确认</el-button>            
        </el-row>

    </el-dialog>
</template>
<script >
export default  {
    data() {
        var validateUser = (rule, value, callback) => {
            if (!value.trim()) {
                return callback(new Error('用户名不能为空'))
            } else if (/\d|\s/.test(value.trim())) {
                return callback(new Error('用户名应该为字母'))
            }
            else {
                callback()
            }
        }
        var validatePass = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('密码不能为空'))
            } else {
                callback()
            }
        }
        var validateCheck = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('密码不能为空'))
            } else if (this.form.password !== value) {
                return callback(new Error('两次密码不一致'))
            } else {
                callback()
            }
        }
        var validatePhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机号不能为空'))
            } else if (value.length !== 11) {
                return callback(new Error('手机号必须为11位'))
            } else if (/[a-zA-Z]/.test(value)) {
                return callback(new Error('手机号不能存在字母'))
            } else {
                callback()
            }
        }
        var validateEmail = (rule, value, callback) => {
            var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            if (!value) {
                return callback(new Error('Email不能为空'))
            } else if (!reg.test(value)) {
                return callback(new Error('Email不存在'))
            } else {
                callback()
            }
        }

        return {
            isShow: false,
            form: {
                username: '',
                password: '',
                checkPassword: '',
                email: '',
                sex: 'man',
                phone: ''
            },      
            rules: {
                username: [
                    { validator: validateUser, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPassword: [
                    { validator: validateCheck, trigger: 'blur' }
                ],
                email: [
                    { validator: validateEmail, trigger: 'blur' }
                ],
                phone: [
                    { validator: validatePhone, trigger: 'blur' }
                ]
            }     
        };
    },
    props: [ 'isSignUpShow' ],
    methods: {
        closeDialog() {
            this.isShow = false;
            this.$emit('update:isSignUpShow', this.isShow);
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
            if(!isEmpty) {
                console.log('提交')
                let data = await this.$store.dispatch('signUp', this.form)
                if(data.status === 0) {
                    this.$message({
                        type: 'warning',
                        message: data.msg
                    })                
                } else if(data.status === -1) {
                    this.$message({
                        type: 'error',
                        message: data.msg
                    })
                } else {
                    this.$message({
                        message: data.msg,
                        type: 'success'
                    });
                    this.closeDialog()
                    this.$router.push('/users')
                }
            } else {
                this.$message({
                    type: 'error',
                    message: '请按要求填写'
                })           
            }
        },

        reset(formName) {
            this.$refs[formName].resetFields();
        }
    },
    watch: {
        isSignUpShow() {
            this.isShow = this.isSignUpShow;
        }
    }
}
</script> 