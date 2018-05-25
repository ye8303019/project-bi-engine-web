<template>
    <div class="chart-content" :class="{overview_chart:showType=='overView'}">
        <p class="edit-btn">
          <span @click="goToEdit(chartData)" >Edit</span>
        </p>
        <ve-line :data="chartData" :settings="chartSettings" :colors="colors" v-if="chartType == '3'"></ve-line>
        <ve-histogram :data="chartData" :settings="chartSettings" :colors="colors" v-if="chartType == '6'"></ve-histogram>
        <!-- <ve-bar :data="chartData" :settings="chartSettings" height="100%" :colors="colors"></ve-bar> -->
    </div>
</template>
<script>
    export default {
      props: {
        showType: {
          type: String,
          default: 'overView'
        },
        chartType: {
          type: String,
          default: '00'
        },
        chartProp: {
          type: Object,
          default: function () {
            return {}
          }
        },
        chartId:{
          default:'1'
        },
        tableId:{
          default:'15'
        }
      },
      watch: {
        // chartType(val) {
        //   if (val == '6') {
        //     this.chartSettings = {
        //       area: true,
        //       metrics: ['销售额-1季度','销售额-2季度' ,'占比','其他'],
        //       dimension: ['日期'],
        //       showLine: ['占比'],
        //       stack: { '单价': ['销售额-1季度', '销售额-2季度']},
        //     }
        //   } else if (val == '3') {
        //     this.chartSettings = {
        //       metrics: ['销售额-1季度','销售额-2季度'],
        //       dimension: ['日期']
        //     }
        //   }
        // },
        chartProp(val) {
          dealForChart(this.showType, this.chartType, val, this);
        }
      },
      data(){
          return {
              chartData:{},
              chartSettings:{},
              colors:['#F05C6C', '#0D89D5', '#85C9C1', '#F7D370', '#53C0FE', '#F9ABBB',
              '#9FBC34', '#79AFF3', '#9099CB', '#9CB3C3', '#FFA66A', '#00AF86'],
          }
      },
      created() {
        dealForChart(this.showType, this.chartType, this.chartProp, this);
      },
      methods:{
        goToEdit(){
          this.$router.push({name: 'Analytics', query: { chart_id: this.chartId,table_id:this.tableId }})
        }
      }
    }

    function dealForChart(showType, chartType, originData, self) {
      let chartData = originData.data;
      let columns = []
      for(let key in chartData) {
        columns.push(key);
      }
      let rows = [];

      let aa = chartData[columns[0]];
      for(let i=0; i<aa.length; i++) {
        let bb = {};
        for (let j=0;j<columns.length; j++){
          bb[columns[j]] = chartData[columns[j]][i];
        }
        rows.push(bb);
      }

      self.chartSettings = {
        dimension: originData.dimesions,
        metrics: originData.measurements
      }

      self.chartData = {
        columns,
        rows
      }
    }
</script>
<style lang="less">
  .overview_chart {
    height: auto;
    width: 31%;
    box-shadow: 0px 0px 2px #888888;
    display: inline-block;
    padding: 10px;
    margin: 10px;
    box-sizing: border-box;
  }
  .edit-btn{
    text-align: right;
    span{
      font-size: 14px;
      color: cornflowerblue;
      cursor: pointer;
    }
  }
</style>

