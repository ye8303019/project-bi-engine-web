<template>
    <div class="table-container">
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
                <el-table-column
                    v-for="(item, index) in tableKey "
                    :key="index"
                    :prop="item"
                    :label="item">
                </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default{
        name:'TableList',
        props:{
            tableData:{
                default:[]
            }
        },
        data(){
            return {
            }
        },
        mounted(){

        },
        computed:{
            tableKey(){
                let _tableKey=[]
                for(var key in this.tableData[0]){
                    _tableKey.push(key)
                }
                return _tableKey
            }
        }
    }
</script>
<style lang="less">
.el-main{
    padding-bottom: 20px;
}
.table-container{
    text-align: left;
}
</style>


