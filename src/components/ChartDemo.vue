<template>
    <div class="chart-content">
        <!-- <ve-line :data="chartData" :settings="chartSettings" height="100%" :colors="colors"></ve-line> -->
        <ve-histogram :data="chartData" :settings="chartSettings" height="100%" :colors="colors"></ve-histogram>
        <!-- <ve-bar :data="chartData" :settings="chartSettings" height="100%" :colors="colors"></ve-bar> -->
    </div>
</template>
<script>
    export default {
        data(){
            return {
                chartData:{},
                chartSettings:{},
                colors:['#F05C6C', '#0D89D5', '#85C9C1', '#F7D370', '#53C0FE', '#F9ABBB',
                '#9FBC34', '#79AFF3', '#9099CB', '#9CB3C3', '#FFA66A', '#00AF86'],
            }
        },
        created() {
            this.chartData = {
                columns: ['日期', '销售额-1季度', '销售额-2季度', '占比', '其他'],
                rows: [
                    { '日期': '1月1日', '销售额-1季度': 1523, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
                    { '日期': '1月2日', '销售额-1季度': 1223, '销售额-2季度': 1523, '占比': 0.345, '其他': 100 },
                    { '日期': '1月3日', '销售额-1季度': 2123, '销售额-2季度': 1523, '占比': 0.7, '其他': 100 },
                    { '日期': '1月4日', '销售额-1季度': 4123, '销售额-2季度': 1523, '占比': 0.31, '其他': 100 },
                    { '日期': '1月5日', '销售额-1季度': 3123, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
                    { '日期': '1月6日', '销售额-1季度': 7123, '销售额-2季度': 1523, '占比': 0.65, '其他': 100 }
                ]
            }
            this.chartSettings = {
                area: true,
                metrics: ['销售额-1季度','销售额-2季度' ,'占比','其他'],
                dimension: ['日期'],
                showLine: ['占比'],
                stack: { '单价': ['销售额-1季度', '销售额-2季度']},
            }
        },
    }
</script>
<style>
.chart-content{
    height: 100%;
    width: 100%;
}
</style>

