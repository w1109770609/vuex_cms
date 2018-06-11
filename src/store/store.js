import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { instance as http } from '../until/http'
Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    data_list: [],
    grid_data:[],
    tableData:[],
    select_item:[],
    get_tree:[]
  },
  mutations: {
    deletes(state, payload) {
      let tableData = [...state.tableData]
      tableData.map((item,index)=>{
        if(item.ID === payload){
          tableData.splice(index,1)
        }
      })
      state.tableData = tableData
    },
    add(state, payload){
      state.tableData.push(payload)
    },
    datas(state, payload) {
      state.data_list = payload;
    },
    getdatas(state, payload) {
      state.grid_data = payload;
    },
    getTable(state, payload){
      state.tableData = payload
    },
    trees(state,payload){
      state.get_tree = payload
    }
  },
  actions: {
    tree({commit}){
      http.get('/data/tree.json').then(res=>{
        commit('trees',res.data)
      })
    },
    data({commit}) {
      http.get('/data/data.json').then(res => {
        commit('datas', res.data);
      })
    },
    getdata({commit,state},cb){
      if(state.grid_data.length>0){
        cb()
      }
      http.get('/data/gridData.json').then(res => {
        setTimeout(() => {
          commit('getdatas', res.data);
          cb ();
        }, 2000);
      })
    },
    getlist({state,commit},cb){
      http.get('/data/table.json').then(res => {
        setTimeout(() => {
          commit('getTable', res.data);
          cb()
        }, 2000);
      })
    }
  },
  getters: {
    toFillter(state) {
        return (filter) => {
          if (filter) {
            let res = state.grid_data.filter(item => {
              return item.name.indexOf(filter)>-1 ||item.address.indexOf(filter) > -1
            })
            return res
          } else {
            return state.grid_data
          }
        }
    },
    filterTable(state){
      return (filter,page) => {
        let { name, phone, email, ID, org } = filter;
        if (name != '' || phone != '' || email != '' || ID != '' || org != ''){
          let res = state.tableData.filter(item => {
            return item.name.indexOf(name) > -1 && item.phone.indexOf(phone) > -1 && item.email.indexOf(email) > -1 && item.org.indexOf(org) > -1 && item.ID.toString().indexOf(ID.toString()) > -1;
          })
          // res.slice((page.page - 1) * page.pageSize, page.page * page.pageSize);
          return res
        }else{
          return []
        }
      }
    }
  },
  modules: {},
});
export default store
