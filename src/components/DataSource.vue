<template>
  <div class="app-container">
    <el-container style="height: 100%; background-color: #f8f8f8">
      <el-aside width="250px" style="margin:10px;">
        <el-card class="box-card" style="height:100%; overflow:hide">
          <div slot="header" class="clearfix card-header">
            <span>我的数据源</span>
          </div>
          <div class="text data-list">
              <div v-for="(item, index) in dataSourceList" :key="index">
                  <span>{{item.name}}</span>
                  <p class="sub-table" v-for="(tableItem ,idx) in item.tables" :key="idx" >{{tableItem.name}}</p>
              </div>
          </div>
          <div class="data-list-footer">
              <el-button type="success" @click="dialogFormVisible = true">添加数据源</el-button>
          </div>
        </el-card>
      </el-aside>
      <el-main style="margin:10px;background:#fff; border:1px solid #eee; height:100%">
          <el-header style="height:140px;border-bottom:1px solid #eee; margin-bottom:20px">
            <el-row :gutter="20" class="sql-container">
                <p style="text-align:left; margin-bottom:10px;">
                    <span> 数据处理SQL：</span>
                </p>
                <textarea name="sqlContent" class="sql-content" v-model="dataSql"></textarea>
            </el-row>
          </el-header>
          <el-main style="height:calc(100% - 250px)">
            <table-list :table-data="tableData"></table-list>
            <el-button class="data-merge-button" @click="getSourceData(dataSql)">查询数据</el-button>
            <el-button type="success" class="data-save-button" @click="saveMergeTable">保存去分析</el-button>
          </el-main>
      </el-main>
    </el-container>
    <el-dialog title="添加数据源" :visible.sync="dialogFormVisible">
        <el-tabs v-model="activeName">
            <el-tab-pane label="API" name="first">
                <el-form>
                    <el-form-item label="API名称：" :label-width="formLabelWidth">
                        <el-input v-model="api.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="API地址：" :label-width="formLabelWidth">
                        <el-input v-model="api.url" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="EXCEL" name="second">
                <el-form>
                    <el-form-item label="EXCEL文件：" :label-width="formLabelWidth">
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            action="/bi/file"
                            :file-list="fileList"
                            :auto-upload="false">
                                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传Excel</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveDataSource">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import TableList from './TableList.vue'
import axios from 'axios'
export default {
  name: 'Analytics',
  props: {
    msg: String
  },
  data(){
    return {
        dialogFormVisible:false,
        formLabelWidth:'100px',
        activeName:'second',
        fileList: [],
        dataSourceList:[],
        dataSql:'',
        api:{
            name:'',
            url:''
        },
        tableData: []
    }
  },
  components:{
      TableList
  },
  mounted(){
      this.getDataSourceList()
  },
    methods:{
        // 文件上传
        submitUpload() {
            this.$refs.upload.submit();
        },
        // 获取DataSourceList 数据
        getDataSourceList(){
            axios.get('/bi/data/source').then((response)=>{
                this.dataSourceList=response.data.data;
            })
        },
        // 获取合并后table数据
        getSourceData(sql){
            if(!sql) return;
            axios.post('/bi/data/collection/query',{
                    query:sql
            }).then((response)=>{
                this.tableData=response.data.data;
            })
        },
        // 添加Api地址
        addApiUrl(url){
            axios.post('/bi/api',{
                    url:this.api.url,
                    name:this.api.name
            }).then((response)=>{
                this.getDataSourceList()
            })
        },
        // 保存API数据
        saveDataSource(){
            this.dialogFormVisible = false
            if(this.dialogFormVisible=='first'){
                this.addApiUrl(this.apiUrl)
            }
        },
        saveMergeTable(){
            axios.post('/bi/data/collection/',{
                query:this.dataSql,
                name:"",
                tableList:["1","3"]
            }).then((response)=>{
                let _id = response.data.data.id
                this.$router.push({ name: 'Analytics', query: { table_id: _id }})
            })
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.sql-container{
    text-align: left;
    }
.sql-content{
    width: calc(100% - 160px);
    text-align: left;
    height: 80px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px 10px;
    outline: none;
    font-size: 16px;
    line-height: 24px;
}
.data-list{
    text-align: left;
    font-size: 14px;
    background-color: #fefefe;
    border-bottom: 1px dashed #eee;
    padding-bottom: 10px;
    margin-bottom: 10px;
    span{
        font-size: 16px;
        font-weight: bold;
        color: #333;
        line-height: 24px;
    }
    p{
        padding-left: 10px;
        color: #666;
        line-height: 22px;
        font-size: 14px;
    }
}
.box-card{
    position: relative;
}
.data-list-footer{
    position: absolute;
    bottom: 60px;
    left: 60px;
}
.data-merge-button{
    position: absolute;
    top: 65px;
    right: 60px;
    height: 90px;
}
.data-save-button{
    position: absolute;
    top: 190px;
    right: 60px;
}
.upload-demo{
    text-align: left;
}
.el-upload__tip{
    float: right;
    color: #666;
}
</style>
