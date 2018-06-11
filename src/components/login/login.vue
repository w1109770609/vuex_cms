<template>
  <div class="box">
    <div class="form">
      <div class="tit">
        <span @click="code" :class="[flag?'show':'']" >扫二维码</span>
        <span @click="account" :class="[!flag?'show':'']">账号登录</span>
      </div>
      <div class="tab">
        <transition>
          <component :is="comp"></component>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Code from './code.vue';
import Account from './account.vue';
export default {
  data() {
    return {
      flag:false,
      comp:Code
    }
  },
  components:{
    Code,
    Account
  },
  methods:{
    code(){
      this.flag=false
      this.comp=Code
    },
    account(){
      this.flag=true
      this.comp=Account
    }
  }
}
</script>

<style scoped src="./login.css">
</style>
