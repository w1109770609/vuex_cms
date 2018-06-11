<template>
  <div class="app">
      <div><router-link tag="p" to="/home/rename">发起更名流程工单</router-link></div>
      <div><router-link tag="p" to="/home/rename">发起客户流程工单</router-link></div>
      <div><router-link tag="p" to="/home/rename">工程维护单</router-link></div>
      <div><router-link tag="p" to="/home/rename">其他类型工单</router-link></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.app{
  display:flex;
  flex-wrap: wrap;
}
.app>div{
  width:33%;
  height:170px;
  color:#666;
  text-align: center;
  line-height: 170px;
  padding: 0 5px;
  margin: 5px 0;
}
div p{
  height: 100%;
  background: #eee;
  cursor: pointer;
}
</style>
