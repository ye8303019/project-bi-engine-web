<template>
  <div class="app-container">
    <el-container style="height: 100%; background-color: #f8f8f8">
      <el-aside width="200px" style="margin:10px;">
        <el-card class="box-card" style="height:100%; overflow:hide">
          <div slot="header" class="clearfix card-header">
            <span>我的数据</span>
          </div>
          <div class="text item data-container">
              <p class="list-title">维度：</p>
              <draggable v-model="myArray" :options="{group:'people'}" @start="drag=fase" @end="drag=true">
                <div class="list-bar" v-for="element in myArray" :key="element.id">
                  <i class="el-icon-view list-label"></i>
                  {{element.name}}
                </div>
              </draggable>
              <p class="list-title list-title-end">度量：</p>
              <draggable v-model="myArray1" :options="{group:'people'}" @start="drag=fase" @end="drag=true">
                <div class="list-bar" v-for="element in myArray1" :key="element.id">
                  <i class="el-icon-tickets list-label"></i>
                  {{element.name}}
                </div>
              </draggable>
          </div>
        </el-card>
      </el-aside>
      <el-main style="margin:10px;background:#fff; border:1px solid #eee; height:100%">
          <el-header style="height:100px;border-bottom:1px solid #eee; margin-bottom:20px">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="anslytics-content-bar clearfix">
                  <span class="bar-label">
                    <i class="el-icon-location-outline"></i>行：
                  </span>
                  <div class="drag-end-content">
                    <draggable v-model="myArray1" :options="{group:'people'}" @start="drag=fase" @end="drag=true">
                      <span class="drag-end-label" v-for="element in myArray" :key="element.id">
                        {{element.name}}
                      </span>
                    </draggable>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="anslytics-content-bar clearfix">
                  <span class="bar-label">
                    <i class="el-icon-share"></i>列：
                  </span>
                  <div class="drag-end-content">
                    <draggable v-model="myArray1" :options="{group:'people'}" @start="drag=true" @end="drag=true">
                      <span class="drag-end-label" v-for="element in myArray1" :key="element.id">
                        {{element.name}}
                      </span>
                    </draggable>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="anslytics-content-bar clearfix">
                  <span class="bar-label">
                    <i class="el-icon-star-off"></i>标记：
                  </span>
                  <div class="drag-end-content">
                    <draggable v-model="myArray1" :options="{group:'people'}" @start="drag=true" @end="drag=true">
                      <span class="drag-end-label" v-for="element in []" :key="element.id">
                        {{element.name}}
                      </span>
                    </draggable>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="anslytics-content-bar clearfix">
                  <span class="bar-label">
                    <i class="el-icon-printer"></i>筛选器：
                  </span>
                  <div class="drag-end-content">
                    <draggable v-model="myArray1" :options="{group:'people'}" @start="drag=true" @end="drag=true">
                      <span class="drag-end-label" v-for="element in []" :key="element.id">
                        {{element.name}}
                      </span>
                    </draggable>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-header>
          <el-main style="height:calc(100% - 170px)">
            <chart-demo></chart-demo>
          </el-main>
      </el-main>
      <el-aside width="150px" style="margin:10px;">
        <el-card class="box-card" style="height:100%; overflow:hide;" body-style="padding:20px 10px;">
          <div slot="header" class="clearfix card-header">
            <span>我的图表</span>
          </div>
          <div class="text item data-container">
            <chart-type-list @update-chart-type="updateChartType"></chart-type-list>
          </div>
        </el-card>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import ChartTypeList from './ChartTypeList.vue'
import ChartDemo from './ChartDemo.vue'
import axios from 'axios'
export default {
  name: 'Analytics',
  props: {
    msg: String
  },
  data(){
    return {
      activeName: 'first',
      myArray:[{
        name:'申请人'
      },{
        name:'省份'
      },{
        name:'专利分类'
      },{
        name:'申请日期'
      }],
      myArray1:[{
        name:'专利总数'
      },{
        name:'发明专利总数'
      },{
        name:'实用新型专利总数'
      },{
        name:'诉讼案件'
      }]
    }
  },
  components:{
    draggable,
    ChartTypeList,
    ChartDemo,
  },
  methods:{
    updateChartType(){

    }
  },
  mounted(){
    axios.get('/api/user?ID=12345')
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
  
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.card-header{
  font-size: 13px;
  color: #409EFF;
  font-weight: bold;
}
.data-container{
  text-align: left;
  font-size: 13px;
  color:#666;
  .list-title{
    margin-bottom: 10px;
    font-weight: bold;
  }
  .list-title-end{
    border-top: 1px dashed #ccc;
    padding-top: 20px;
    margin-top: 20px
  }
  .list-bar{
    margin-bottom: 5px;
    cursor: pointer;
  }
  .list-label{
    font-size: 10px;
    color: #409eff;
    margin-right: 5px;
    margin-left: 10px;
  }
}
.anslytics-content-bar{
  font-size: 13px;
  text-align: left;
  margin-bottom: 15px;
  .bar-label{
    display: block;
    width: 75px;
    float: left;
    line-height: 28px;
  }
  .drag-end-label{
    height: 20px;
    font-size: 12px;
    color: #fff;
    background-color: #409eff;
    display: inline-block;
    line-height: 20px;
    padding: 0 10px;
    margin-left: 5px;
    margin-top: 4px;
    cursor: pointer;
  }
  i{
    color: #409eff;
    margin-right: 10px;
  }
  .drag-end-content{
    border: 1px dashed #ddd;
    float: left;
    width: 500px;
    height: 28px;
  }
}
</style>
