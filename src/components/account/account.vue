<template>
  <el-container direction="vertical">
    <el-form size="small" :rules="rules" ref="form" :model="form" label-width="80px">
      <el-form-item label="用户姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="用户手机">
        <el-input v-model="form.phone"></el-input>
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
            <el-table @row-click="rowClick" v-loading="isloading" :data="toFillter()(updates)">
              <el-table-column width="80" property="date" label="序号"></el-table-column>
              <el-table-column width="140" property="name" label="组织名称"></el-table-column>
              <el-table-column width="150" property="address" label="上级组织"></el-table-column>
            </el-table>
            <el-input v-model="form.org" slot="reference" suffix-icon="el-icon-arrow-down"></el-input>
          </el-popover>
      </el-form-item>
      <el-button size="small" type="info" @click="findList">查询</el-button>
      <el-button size="mini" type="danger" @click="addTables">添加</el-button>
    </el-form>
    <template>
      <template>
        <el-table :data="tables.length==0?table:tables" height="300" v-loading="isloadings" size="small" border style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="name" label="姓名" width="150"></el-table-column>
          <el-table-column prop="ID" label="员工ID" width="120"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
          <el-table-column prop="email" label="邮箱" :show-overflow-tooltip='true' width="140"></el-table-column>
          <el-table-column prop="org" label="归属组织" width="150"></el-table-column>
          <el-table-column prop="group" label="权限" width="140"></el-table-column>
          <el-table-column prop="forg" label="上级组织" width="140"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" @click="deletes(scope.row.ID)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row class="row">
          <el-pagination  @current-change="currentChange" background layout="prev, pager, next" :total="this.tableData.length/this.pageSize*10"></el-pagination>
        </el-row>
      </template>
    </template>
    <el-dialog title="基本信息" :visible.sync="dialogFormVisible">
      <el-form class="asd" :rules="rules" ref="dialog" :model="dialog" size="small" label-position="left"  >
        <el-form-item label="员工姓名" prop="name">
          <el-input auto-complete="off" v-model="dialog.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input auto-complete="off" v-model="dialog.email"></el-input>
        </el-form-item>
        <el-form-item label="上级组织" >
          <el-input auto-complete="off" v-model="dialog.forg"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" >
          <el-input auto-complete="off" v-model="dialog.phone"></el-input>
        </el-form-item>
        <el-form-item label="权限" >
          <el-input auto-complete="off" v-model="dialog.group"></el-input>
        </el-form-item>
        <el-form-item label="归属组织">
         <el-popover placement="bottom" width="400" height="400" trigger="click" @after-enter="afters">
            <el-form-item label="组织名称">
              <el-input v-model="form.inquire"></el-input>
            </el-form-item>
            <el-button @click="toFillter()(updates=form.inquire)">查询</el-button>
            <el-table @row-click="rowClicks" v-loading="isloading" :data="toFillter()(updates)">
              <el-table-column width="80" property="date" label="序号"></el-table-column>
              <el-table-column width="140" property="name" label="组织名称"></el-table-column>
              <el-table-column width="150" property="address" label="上级组织"></el-table-column>
            </el-table>
            <el-input v-model="dialog.org" slot="reference" suffix-icon="el-icon-arrow-down"></el-input>
          </el-popover>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="sure('dialog')">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      updates: '',
      dialogFormVisible: false,
      tableFlag:false,
      grid: [],
      pageSize: 7,
      page: 1,
      len:'',
      row: '',
      isloading:false,
      isloadings:true,
      tables:[],
      dialog: {
        name: '',
        email: '',
        org: '',
        forg: '',
        phone: '',
        group: '',
      },
      forms: {
        name: '',
        address: '',
        date: ''
      },
      form: {
        name: '',
        phone: '',
        email: '',
        ID: '',
        org: '',
        group: '',
        inquire: '',
      },
      rules:{
        name:[
          {required:true,message:'请输入姓名',trigger:'blur'},
          {type:'string',message:'请输入正确姓名',trigger:'change'}
        ],
        email:[
          {required:true,message:'请输入邮箱',trigger:'blur'},
          {type:'email',message:'请输入正确格式邮箱',trigger:'change'}
        ]
      }
    }
  },
  computed: {
    table() {
      let res = this.tableData.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
      return res;
    },
    ...mapState(['grid_data','tableData'])
  },
  methods: {
    addTables() {
      this.dialogFormVisible = true;
      this.tableFlag = true
      this.dialog = {
        name: '',
        email: '',
        org: '',
        forg: '',
        phone: '',
        group: '',
      }
    },
    sure() {
      this.$refs.dialog.validate((valid)=>{
        if(valid){
          if(this.tableFlag){
            this.$store.commit('add',{...this.dialog})
            this.tableFlag = false;
            this.dialogFormVisible = false;
          }else{
            this.$refs.dialog.validate((valid)=>{
              if(valid){
                this.dialogFormVisible = false;
              }
            })
            for (let i in this.dialog) {
              this.row[i] = this.dialog[i];
            }
          }
          this.dialogFormVisible = false;
        }
      })
    },
    findList(){
      this.tables = this.filterTable()({...this.form})
    },
    rowClick(row){
      console.log(row)
      this.form.org = row.name
    },
    rowClicks(row){
      this.dialog.org = row.name
    },
    deletes(ID){
      this.$confirm('是否永久删除此人?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.$store.commit('deletes',ID)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
      })
    },
    handleClick(row) {
      this.dialogFormVisible = true;
      for (let i in this.dialog) {
        this.dialog[i] = row[i];
      }
      this.dialog.name = row.name;
      this.row = row;
    },
    afters(){
      this.isloading = true
      this.getdata(()=>{this.isloading=false});
    },
    currentChange(page) {
      this.page = page;
    },

    ...mapGetters(['toFillter','filterTable']),
    ...mapActions(['getdata', 'getlist'])
  },
  mounted() {
    this.getlist(()=>{this.isloadings=false});
  }
};
</script>
<style scoped src="./account.css">
</style>
