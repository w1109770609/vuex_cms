<template>
  <div class="login" >
    <el-form :model="val" label-position="top" ref="ruleForm">
      <el-form-item label="账号" prop="user" :rules="rules">
        <el-input class="ipt" v-model="val.user"></el-input>
      </el-form-item>
      <el-form-item>
        <Verification :rules="rules" :ruleForm="ruleForm" num="5" name="phone" v-on:data="data">{{val.phoneMsg}}</Verification>
        <Verification :rules="rules" :ruleForm="ruleForm" num="5"  name="email" v-on:data="data">{{val.emailMsg}}</Verification>
      </el-form-item>
      <el-form-item label="动态密码">
        <el-input class="ipt" v-model="yzm"></el-input>
      </el-form-item>
    </el-form>
      <p><el-button type="primary" class="btn" size="medium" @click="login">登录</el-button></p>
  </div>
</template>
<script>
import Verification from './verification';
export default {
  data() {
    return {
      val:{
        user:'',
        phoneMsg:'手机获取动态',
        emailMsg:'邮箱获取动态'
      },
      login_pwd:'',
      yzm:'',
      ruleForm:'',
      rules:[
        { required: true, message: '请输入账户信息' }
      ]
    }
  },
  components:{ Verification },
  mounted(){
    this.ruleForm=this.$refs.ruleForm
  },
  methods:{
    login(){
      if(this.val.user!=''){
        if(this.yzm===this.login_pwd){
          sessionStorage.setItem('login',1)
          this.$router.push({
            name:'home',
            params:{
              txt:this.val.user
            }
          })
        }else{
           this.$message({
            type: 'info',
            message: '密码输入错误'
          })
        }
      }else{
        this.$message({
          type: 'info',
          message: '输入内容'
        })
      }

    },
    data(data){
      this.rules = data.rules
      this.login_pwd = data.pwd
    }
  }
}
</script>

<style scoped>
  .login{
    padding-left: 30px;
  }
  .size-btn{
    margin: 10px 5px 0 0 ;
  }
  .ipt{
    width:200px;
    height:40px;
  }
  .btn{
    width:200px;
    height:40px
  }
  .el-form-item{
    margin-bottom:10px;
  }
  p{
    line-height: 0
  }
</style>
