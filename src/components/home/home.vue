<template>
  <el-container>
    <el-header height="40px">NBA中国官方网站</el-header>
    <el-container>
      <el-aside width="206px">
        <div class="user">
          <div class="img"><img src="../../../static/2.png" alt=""></div>
          <div class="msg">
            <p>您好！{{this.$route.params.txt}}</p>
            <p>注销</p>
          </div>
        </div>
        <el-row class="tac aside">
          <el-col >
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              text-color="#666"
              active-text-color="#ffd04b">
                <el-submenu v-for="item in data_list" :index="item.id" :key="item.id">
                  <template slot="title">
                    <span>{{item.title}}</span>
                  </template>
                  <el-menu-item v-for="(its,ind) in item.pickitem" :key="ind" :index="its.active" >
                    <router-link tag="span" :to="{name:its.name}">{{its.title}}</router-link>
                  </el-menu-item>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapActions,mapState } from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed:{
    ...mapState(['data_list'])
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    ...mapActions(['data'])
  },
  mounted() {
    this.data()
  }
};
</script>

<style scoped>
  .el-header{
    line-height: 40px;
    background:skyblue;
    color:#666;
  }
  .user{
    display: flex;
    font-size: 13px;
    padding-left: 10px;
  }
  .img{
    width:45px;
    padding: 10px 0;
  }
  img{
    width:45px;
  }
  .msg{
    padding: 10px 0 0 10px;
  }
  .msg p{
    color:#666;
    line-height: 1.8;
  }
</style>
