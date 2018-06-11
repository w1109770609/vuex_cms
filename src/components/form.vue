<template>
  <el-form ref="form" :model="form" label-width="70px">
      <el-form-item label="用户姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="用户手机">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="员工ID">
        <el-input v-model="form.ID"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-input v-model="form.group"></el-input>
      </el-form-item>
       <el-form-item label="归属组织">
         <el-popover placement="bottom" width="400" height="400" trigger="click" @after-enter="afters">
            <el-form-item label="组织名称">
              <el-input v-model="form.inquire"></el-input>
            </el-form-item>
            <el-button @click="toFillter()(updates=form.inquire)">查询</el-button>
            <el-table v-loading="isloading" :data="toFillter()(updates)">
              <el-table-column width="80" property="date" label="序号"></el-table-column>
              <el-table-column width="140" property="name" label="组织名称"></el-table-column>
              <el-table-column width="150" property="address" label="上级组织"></el-table-column>
            </el-table>
            <el-input v-model="form.org" slot="reference" suffix-icon="el-icon-arrow-down"></el-input>
          </el-popover>
      </el-form-item>
    </el-form>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
export default {
  data() {
    return {
      form: {
        name: '',
        phone: '',
        email: '',
        ID: '',
        org: '',
        group: '',
        inquire: '',
      },
      updates: '',
      isloading:false
    };
  },
  methods:{
    afters(){
      this.isloading = true
      this.getdata(()=>{this.isloading=false});
    },
    ...mapGetters(['toFillter']),
    ...mapActions(['getdata', 'getlist']),
  },
  mounted(){
    this.$emit('form',{...this.form})
  }
};
</script>

<style scoped>
.asd .el-form-item{
  width:300px;
}
.asd .el-input{
  width:200px;
  display: inline-block
}
.el-form-item {
  display: inline-block;
}
</style>
