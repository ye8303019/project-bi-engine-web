<template>
    <div class="chart-content" :class="{overview_chart:showType=='overView'}">
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
        // this.chartSettings = {
        //   area: true,
        //   metrics: ['销售额-1季度','销售额-2季度' ,'占比','其他'],
        //   dimension: ['日期'],
        //   showLine: ['占比'],
        //   stack: { '单价': ['销售额-1季度', '销售额-2季度']},
        // };
        // this.chartData = {
        //   columns: ['日期', '销售额-1季度', '销售额-2季度', '占比', '其他'],
        //   rows: [
        //     { '日期': '1月1日', '销售额-1季度': 1523, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
        //     { '日期': '1月2日', '销售额-1季度': 1223, '销售额-2季度': 1523, '占比': 0.345, '其他': 100 },
        //     { '日期': '1月3日', '销售额-1季度': 2123, '销售额-2季度': 1523, '占比': 0.7, '其他': 100 },
        //     { '日期': '1月4日', '销售额-1季度': 4123, '销售额-2季度': 1523, '占比': 0.31, '其他': 100 },
        //     { '日期': '1月5日', '销售额-1季度': 3123, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
        //     { '日期': '1月6日', '销售额-1季度': 7123, '销售额-2季度': 1523, '占比': 0.65, '其他': 100 }
        //   ]
        // };

        dealForChart(this.showType, this.chartType, this.chartProp, this);
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
</style>

