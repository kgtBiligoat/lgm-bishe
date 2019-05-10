<template>
<div>
    <div class="right">
        <div id="mountNode" ></div>   
        <div class="test">
            <el-form>
                <el-form-item label="节点选择：" label-width="150px">
                    <el-select v-model="value" placeholder="请选择节点" style="width: 200px;" @change="select">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>   
                    </el-select>    
                </el-form-item>    
                <el-form-item label="节点名称：" label-width="150px" >
                    <el-input v-model="inputValue" style="width: 200px;" @change="change"></el-input>
                </el-form-item>
                <el-form-item style="margin-left: 100px;">
                    <el-button @click="add">新增节点</el-button>
                    <el-button @click="delet">删除节点</el-button>
                </el-form-item>
            </el-form>    
        </div> 
    </div>   
    <div class="down">
        <el-button>确定</el-button>
    </div> 

</div>


</template>
<script >
import G6 from '@antv/g6'
import Grid from '@antv/g6/build/grid'
export default {
    data() {
        return {   
            inputValue: '',     
            value: '',
            number: 0,
            options: [
                {
                    label: '开始',
                    value: 'node0'
                }
            ],
            graph: {},
            data: {
                nodes: [{
                    id: 'node0',
                    x: 100,
                    y: 50,
                    label: '开始',
                    shape: 'ellipse'
                }],
                edges: []             
            }
        }
    },
    computed: {
        getNumber() {

            return Number(this.value.split('')[4])
        }
    },
    methods: {
        select() {
            this.inputValue = this.options[this.getNumber].label        
            this.$emit('select', this.value)  
        },
        change() {
            this.data.nodes[this.getNumber].label = this.inputValue
            this.graph.render()  
        },
        add() {
            if(this.number > 14){
                this.$message({
                        type: 'warning',
                        message: '节点数上线'
                })
                return
            }
            if(this.data.nodes[this.number].x + 100 > 800) {
                this.data.nodes.push({
                    id: 'node' + (this.number + 1),
                    x: 100,
                    y: this.data.nodes[this.number].y + 100,   
                    label: '新建节点' + (this.number + 1)          
                })   
            }
            else {
                this.data.nodes.push({
                    id: 'node' + (this.number + 1),
                    x: this.data.nodes[this.number].x + 100,
                    y: this.data.nodes[this.number].y,     
                    label: '新建节点' + (this.number + 1)
                })                
            }

            this.data.edges.push({
                source: 'node' + this.number,
                target: 'node' + (this.number + 1)
            })
            this.options.push({
                value: 'node' + (this.number + 1),
                label: '新建节点' + (this.number + 1)
            })
            this.graph.render()            
            this.number = this.number + 1
            console.log(this.number)
        },
        delet() {
            var temp
            console.log(this.data.nodes, this.options, this.data.edges)
            this.data.nodes.forEach((i, index) => {
                if(i.id === this.value) {
                    temp = index

                }
            })                    
            this.data.nodes.splice(temp, 1)

            this.options.forEach((i, index) => {
                if(i.id === this.value) {
                    temp = index

                }               
            })
            this.options.splice(temp, 1)

            this.data.edges.forEach((i, index) => {
                if(i.source === this.value) {
                    temp = index
                }                   
            })
            if(temp === this.data.edges.length) {
                console.log(temp, this.data.edges.length)
                this.data.edges.pop()
            }    
            else {

                this.data.edges.splice(temp-1, 2)
                this.data.edges.splice(temp, 0, {
                    source: this.options[temp - 1].value,
                    target: this.options[temp].value
                })
            }

            setTimeout(() => {
                this.graph.render()
            }, 1)
            this.number --
  
        }
    },
    mounted() {
        const minimap = new Grid();
        this.graph = new G6.Graph({
            plugins: [ minimap ],
            container: 'mountNode',
            width: 900,
            height: 200
        });
        this.graph.data(this.data);
        this.graph.render();
    }
}
</script>
<style scoped>
.down {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
.el-form {
    margin-top: 10px;
}
.right {
    display: flex;
}
.test {
    width: 30%;
    height: 200px;
    border: 1px solid black;
    border-left: 0px;
}
#mountNode {
    border: 1px solid black;
    width: 70%;
    height: 200px;
}
</style>