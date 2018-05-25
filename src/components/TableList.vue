<template>
    <div class="table-container">
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
                <el-table-column
                    prop="date"
                    label="日期">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
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


