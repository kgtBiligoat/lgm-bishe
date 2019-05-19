<template>
    <div class="b">
    <Form ref="formValidate" class="b-a" :label-width="100" :model="formData" @submit.native.prevent>
        <renders v-for="(element,index) in template_form" :key="index" :index="index" :ele="element.ele" :obj="element.obj || {}" :data="formData" @handleChangeVal="val => handleChangeVal(val,element)" @changeVisibility="changeVisibility" :value="formData[element.obj.name]" :sortableItem="template_form">
        </renders>
        <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">下一步</Button>
        <!-- <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button> -->
        </FormItem>
    </Form>    
    </div>

</template>
<script>
export default {
  data() {
    return {
      template_form: [],
      formData: {},
      number: 1,
    }
  },
  methods: {
    // 控件回填数据
    handleChangeVal(val, element) {
      this.$set(this.formData, element.obj.name, val);
      // this.formData[element.obj.name] = val;
    },
    handleReset() {
      this.template_form = JSON.parse(localStorage.getItem('node1') || '[]');
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          
          // window.localStorage.setItem('template', JSON.stringify(this.template_form));
          this.$Message.success('Success!');
          let node = localStorage.key(this.number+1)
          console.log(node)          
          this.template_form = JSON.parse(localStorage.getItem(node) || '[]');
          this.number++;
          this.$emit('change', this.number)
        } else {
          this.$Message.error('Fail!');
        }     
      //  var node = 
      //    console.log(node,'22', localStorage.key(1))
      //   console.log(111111)     
      })
    },
    // 更改当前渲染字段是否显示
    changeVisibility(index, visibility) {
      this.$set(this.template_form[index].obj, 'visibility', visibility);
    }
  },
  created() {
    this.template_form = JSON.parse(localStorage.getItem('node0') || '[]');
    for (let i in this.template_form) {
      this.$set(this.formData, this.template_form[i].obj.name, this.template_form[i].obj.value);
    }
  }
}
</script>

<style scoped>
.b {
    display: flex;
    justify-content: center;
}
.b-a {
    width: 70%;
    height: 100%;   
    padding-top: 50px;
    padding-right: 50px;
}
</style>

