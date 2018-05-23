<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      @select="handleSelect"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      font-sixe="16px"
      router="true"
      active-text-color="#ffd04b">
          <el-menu-item  style="float:right" index="Dashboard">仪表盘</el-menu-item>
          <el-menu-item  style="float:right" index="Analytics">数据分析</el-menu-item>
          <el-menu-item  style="float:right" index="DataSource">数据源</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import Analytics from './components/Analytics.vue'

export default {
  name: 'app',
  components: {
    Analytics
  },
  data(){
    return {
    }
  },
  computed:{
    activeIndex(){
      return this.$route.name
    }
  },
  methods:{
    handleSelect(key,keyPath){
      console.log(key,keyPath)
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.app-container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: fixed;
  height: 100%;
  width: 100%;
}
.clearfix:before, .clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
a{
  text-decoration: none;
}

</style>
