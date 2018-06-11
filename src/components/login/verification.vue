<template>
    <el-button size="small"  :disabled="isDisabled" class="size-btn" @click="phone"><slot></slot></el-button>
</template>

<script>
export default {
  props:['num','rules','name','ruleForm'],
  data() {
    return {
      arr:[1,2,3,4,5,6,7,8,9],
      isDisabled:false,
      arrs:[]
    }
  },
  methods:{
    phone(e){
      if(this.rules.length>1){
        this.rules.pop()
      }
      if(this.name=='phone'){
        this.rules.push({validator:(rule,value,callback)=>{
          if(/^1[3578]\d{9}$/g.test(value)){
            callback()
          }else{
            callback(new Error('请输入正确的手机号'))
          }
        } ,message: '请输入正确的手机号'})
      }else if(this.name=='email'){
        this.rules.push({ type: 'email', message: '请输入正确的邮箱地址' })
      }
      this.ruleForm.validate((isValid)=>{
        if(isValid){
          this.isDisabled=true
          let num=this.num*1;
          let timr=setInterval(()=>{
            num--
            if(num<0){
              e.target.innerHTML=this.arrs
              this.isDisabled=false
              clearInterval(timr)
            }else{
              e.target.innerHTML='距验证码生成'+num+'s';
            }
          },1000)
          this.arrs=[];
          for(let i=0;i<6;i++){
            let rand = Math.floor(Math.random()*4)
            this.arrs.push(this.arr[rand])
          }
          this.arrs=this.arrs.join('')
          this.$emit('data',{
            pwd:this.arrs,
            rules:this.rules
          })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
