<template>
  <div id="app">
    <analytics msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Analytics from './components/Analytics.vue'

export default {
  name: 'app',
  components: {
    Analytics
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
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

</style>
