<template>
    <div class="chart-type-container">
        <span 
            class="image-icon" 
            :class="{'selected-image-icon':item.type==selectedType.type}"
            v-for="(item,index) in chartTypeList" 
            :click="updateChartType(item)"
            :key="index">
            <img :src="item.src" width="28" height="28">
        </span>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                chartTypeList:[
                    {
                        src:require("../assets/1.svg"),
                        type:"table1"
                    },{
                        src:require("../assets/2.svg"),
                        type:"table"
                    },{
                        src:require("../assets/3.svg"),
                        type:"table"
                    },{
                        src:require("../assets/4.svg"),
                        type:"table"
                    },{
                        src:require("../assets/5.svg"),
                        type:"table"
                    },{
                        src:require("../assets/6.svg"),
                        type:"table"
                    },{
                        src:require("../assets/7.svg"),
                        type:"table"
                    },{
                        src:require("../assets/8.svg"),
                        type:"table"
                    },{
                        src:require("../assets/9.svg"),
                        type:"table"
                    },{
                        src:require("../assets/10.svg"),
                        type:"table"
                    },{
                        src:require("../assets/11.svg"),
                        type:"table"
                    },{
                        src:require("../assets/12.svg"),
                        type:"table"
                    },{
                        src:require("../assets/13.svg"),
                        type:"table"
                    },{
                        src:require("../assets/14.svg"),
                        type:"table"
                    },{
                        src:require("../assets/15.svg"),
                        type:"table"
                    }
                ],
                selectedType:{
                    src:require("../assets/15.svg"),
                    type:"table1"
                }
            }
        },
        methods:{
            updateChartType(data){
                this.selectedType=data;
                this.$emit('update-chart-type',data)
            }
        }
    }
</script>
<style lang="less">
.image-icon{
  display: inline-block;
  background: #eee;
  margin: 3px;
  margin-bottom: 10px;
  width: 34px;
  height: 34px;
  cursor: pointer;
  border: 1px solid #eee;
  img{
      margin: 4px 0 0 4px
  }
}
.selected-image-icon{
    border-color: #409eff;
    background: #ddd;
}
</style>

