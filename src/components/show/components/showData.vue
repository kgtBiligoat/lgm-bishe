<template>
<div>
    <div class="text">
            <el-steps :active="active" finish-status="success">
                <el-step v-for="i in steps" :key="i"></el-step>
            </el-steps>  
            <get-form style="margin-top: 100px;width: 100%;height: 100%;" @change="change"></get-form>     
    </div>    
</div>
</template>
<script >
import getForm from '@/components/show/getForm'
export default {
    name: 'test',
    components: { getForm },
    data() {
        return {
            active: 0,
            steps: this.$store.state.UserMsg.nodes
        }
    },
    methods: {
        change() {
            this.next()
        },
        next() {
            if (this.active++ > this.$store.state.UserMsg.number) this.active = 0;
        }
    }
}
</script>
<style scoped>
.text {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-content: center;
    align-items: center;
}
.el-steps {
    width: 70%;
}
</style>