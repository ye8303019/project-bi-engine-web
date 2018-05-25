<template>
    <div class="app-overview">
      <el-container class="app-overview-container">
        <el-header class="app-overview-container-header">仪表盘</el-header>
        <el-main class="app-overview-container-main" style="overflow: hidden">
          <chart-demo></chart-demo>
          <chart-demo></chart-demo>
          <chart-demo></chart-demo>
          <chart-demo></chart-demo>
          <chart-demo></chart-demo>
          <chart-demo></chart-demo>
        </el-main>
      </el-container>
    </div>
</template>
<script>
  import ChartDemo from './ChartDemo.vue'

  export default {
    name:'Dashboard',

    components: {
      ChartDemo
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
