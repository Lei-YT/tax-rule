import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import config from '../../package.json'
import typeList from '@/libs/type-list.js'
Vue.use(Vuex)
// console.log(config)

var RULE_DATA = localStorage.getItem('RULE_DATA');
var COPY_DATA = localStorage.getItem('COPY_DATA');
var MENU_DATA = localStorage.getItem('MENU_DATA');
var RULE_TEST_DATA = localStorage.getItem('RULE_TEST_DATA');

export default new Vuex.Store({
  state: {
    projectName: config.name,
    version: config.version,
    login: Cookies.get('IS_LOGIN') || '',
    token: Cookies.get('TOKEN') || '',
    userName: Cookies.get('USER_NAME') || '',
    side: (Cookies.get('SIDE') == 'true') ? true : false,
    ruleData: RULE_DATA ? JSON.parse(RULE_DATA) : [],
    typeList: typeList,
    menuList: MENU_DATA ? JSON.parse(MENU_DATA) : [
      {
        name: "message",
        title: "消息中心",
        left:true,
      }
    ],
    copyData: COPY_DATA ? JSON.parse(COPY_DATA) : [],
    ruleTestData:RULE_TEST_DATA ? JSON.parse(RULE_TEST_DATA) : [],
    funcData:[],
    funcFlatData:[],
    varData:[]
  },
  mutations: {
    login(state, data) {
      Cookies.set('IS_LOGIN', data);
      state.login = data;
    },
    token(state, data) {
      Cookies.set('TOKEN', data);
      state.token = data;
    },
    userName(state, data) {
      Cookies.set('USER_NAME', data);
      state.userName = data;
    },
    side(state, data) {
      Cookies.set('SIDE', data);
      state.side = data;
    },
    ruleData(state, data) {
      // localStorage.setItem('RULE_DATA', JSON.stringify(data))
      state.ruleData = data;
    },
    ruleTestData(state, data) {
      localStorage.setItem('RULE_TEST_DATA', JSON.stringify(data))
      state.ruleTestData = data;
    },
    copyData(state, data) {
      localStorage.setItem('COPY_DATA', JSON.stringify(data))
      state.copyData = data;
    },
    menuList(state, data) {
      localStorage.setItem('MENU_DATA', JSON.stringify(data))
      state.menuList = data;
    },
    funcData(state, data) {
      state.funcData = data;
    },
    funcFlatData(state, data) {
      state.funcFlatData = data;
    },
    varData(state, data) {
      state.varData = data;
    }
  },
  actions: {
  },
  modules: {
  }
})
