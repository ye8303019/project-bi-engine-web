<template>
    <div class="app-overview">
      <el-container class="app-overview-container">
        <el-header class="app-overview-container-header">仪表盘</el-header>
        <el-main class="app-overview-container-main" style="overflow: hidden">
          <chart-demo v-for="(chartData,index) in chartDatas" :chart-id="chartData.id" :table-id="chartData.collectionId" :key="index" :chart-type="dealData(chartData).chartType" :chart-prop="dealData(chartData).data" :show-type="'overView'"></chart-demo>
        </el-main>
      </el-container>
    </div>
</template>
<script>
  import ChartDemo from './ChartDemo.vue';
  import axios from 'axios'

  export default {
    name:'Dashboard',
    components: {
      ChartDemo
    },
    created() {
      axios.get('/bi/chart/list').then((result)=>{
        let data = result.data.data;
        this.chartDatas = data;
      }).catch((err)=>{
        this.openError()
      })
    },
    data() {
      return {
        chartDatas: []
      }
    },
    methods: {
      dealData(val) {
        let opts = JSON.parse(val.options);
        return {
          data: opts,
          chartType: opts.chartType
        }
      },
      openError() {
        const h = this.$createElement;

        this.$notify({
          title: '错误提示',
          message: h('i', { style: 'color: teal'}, '网络超时，请稍后重试')
        });
      },
    }
  }
</script>
<style lang="less">
  .app-overview {
    &-container {
      height: 100%;
      background-color: #f8f8f8;

      &-header {
        text-align: center;
        font-size: 25px;
      }

      &-main {
        background-color: #fff;
        box-shadow: 0px 0px 2px #888888;
        margin: 10px;
        min-height: 200px;
      }
    }
  }
</style>
