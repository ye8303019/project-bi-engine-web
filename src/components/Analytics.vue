<template>
  <div class="app-container">
    <el-container style="height: 100%; background-color: #f8f8f8" v-loading="loading">
      <el-aside width="200px" style="margin:10px;">
        <el-card class="box-card" style="height:100%; overflow:hide">
          <div slot="header" class="clearfix card-header">
            <span>我的数据</span>
          </div>
          <div class="text item data-container">
              <p class="list-title">维度：</p>
              <draggable v-model="orignDimensions" :options="{group:{name:'Dimensions', pull:'clone', put:false }}" class="aside-drag-container">
                <div class="list-bar" v-for="element in orignDimensions" :key="element.id">
                  <i class="el-icon-view list-label"></i>
                  {{element}}
                </div>
              </draggable>
              <p class="list-title list-title-end">度量：</p>
              <draggable v-model="orignMeasure" :options="{group:{name:'Measure',pull:'clone', put:false}}" class="aside-drag-container">
                <div class="list-bar" v-for="element in orignMeasure" :key="element.id">
                  <i class="el-icon-tickets list-label"></i>
                  {{element}}
                </div>
              </draggable>
          </div>
        </el-card>
      </el-aside>
      <el-main style="margin:10px;background:#fff; border:1px solid #eee; height:100%">
          <el-header style="height:137px;border-bottom:1px solid #eee;position: relative">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="anslytics-content-bar clearfix">
                  <span class="bar-label">
                    <i class="el-icon-location-outline"></i>维度：
                  </span>
                  <div class="drag-end-content">
                    <draggable v-model="draggedRow" :options="{group:{name:'Dimensions'}}" @end="onEnd(draggedRow,arguments[0])"  class="main-header-drag-container">
                      <span class="drag-end-label" v-for="element in draggedRow" :key="element.id">
                        {{element}}
                      </span>
                    </draggable>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="anslytics-content-bar clearfix">
                  <span class="bar-label">
                    <i class="el-icon-share"></i>度量：
                  </span>
                  <div class="drag-end-content">
                    <draggable v-model="draggedCol" :options="{group:{name:'Measure'}}" @end="onEnd(draggedCol,arguments[0])"  class="main-header-drag-container">
                      <span class="drag-end-label" v-for="element in draggedCol" :key="element.id">
                        {{element}}
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
            <el-button style="position: absolute;right: 26px;bottom: 10px;" @click="updateChartData">更新</el-button>
          </el-header>
          <el-main style="height:calc(100% - 170px)">
            <chart-demo :chart-type="chartType" :chart-prop="chartData" :show-type="'detail'" v-if="chartData"></chart-demo>
          </el-main>
      </el-main>
      <el-aside width="150px" style="margin:10px;">
        <el-card class="box-card" style="height:100%; overflow:hide;" body-style="padding:20px 10px;">
          <div slot="header" class="clearfix card-header">
            <span>我的图表</span>
          </div>
          <div class="text item data-container">
            <chart-type-list :chart-type="chartType" @update-chart-type="updateChartType"></chart-type-list>
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
      orignDimensions: [{
        name:'申请人'
      },{
        name:'省份'
      },{
        name:'专利分类'
      },{
        name:'申请日期'
      }],
      orignMeasure: [{
        name:'专利总数'
      },{
        name:'发明专利总数'
      },{
        name:'实用新型专利总数'
      },{
        name:'诉讼案件'
      }],
      draggedRow: [],
      draggedCol: [],

      //
      myArray1: [],

      //
      loading: false,

      //
      chartType: '6',

      //
      chartData: null
    }
  },
  components:{
    draggable,
    ChartTypeList,
    ChartDemo,
  },
  methods:{
    onEnd(d,e){
      let _index= e.oldIndx
      d.splice(_index,1)
  },
    updateChartData() {
      // axios.post('/bi').then((result)=>{
      //   this.chartData = {
      //     xxx: ['b'],//维度
      //     yyy: ['c', 'd'],//度量
      //     data: {
      //       b: [1,2,3,4,5,6],
      //       c: [1,2,3,4,5,6],
      //       d: [1,2,3,4,5,6]
      //     }
      //   }
      // })
      this.chartData = {
        xxx: ['b'],//维度
        yyy: ['c', 'd'],//度量
        data: {
          b: [1,2,3,4,5,6],
          c: [1,2,3,4,5,6],
          d: [1,2,3,4,5,6]
        }
      }
    },
    updateChartType(index){
      this.chartType = index;
    }
  },
  created() {
    this.loading = true;
  },
  mounted(){
    // axios.get('/bi/data/collection/')
    //     .then((response)=>{
    //       let data = response.data.data[0];
    //       this.orignDimensions = ['b'];
    //       this.orignMeasure = ['c','d'];
    //       this.loading = false;
    //       console.log(response);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    setTimeout(()=>{
      this.orignDimensions = ['b'];
      this.orignMeasure = ['c','d'];
      this.loading = false;
    },1000)
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
  .aside-drag-container {
    min-height: 20px;
  }
  .list-title-end{
    border-top: 1px dashed #ccc;
    padding-top: 20px;
    /*margin-top: 20px*/
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

    .main-header-drag-container{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
