import Vue from 'vue'
import ViewUI from 'view-design'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import Util from '@/libs/utils'
import 'flex.css'
import '@/plugins/iview.js'
import '@/plugins/axios'
import '@/assets/icons/iconfont.css'

import LazyRender from 'vue-lazy-render'
Vue.use(LazyRender)

import mixins from '@/mixins'
Vue.mixin(mixins)

import lodash from 'lodash'
Vue.prototype._ = lodash


Vue.config.productionTip = false
Vue.prototype.$log = window.console.log
// Vue.prototype.$ajaxUrl = window.apiUrl


function loopData(arr){
  _.each(arr,function(v){
    v.title = v.name
    v.name = v.routeName
    v.left = v.side
    if(v.children&&v.children.length){
      loopData(v.children)
    }
  })
}

router.beforeEach((to, from, next) => {
  Util.title(to.meta.title);
  ViewUI.LoadingBar.start();
  
  // console.log(to.name)
  
  if(to.query.token){
    //当url存在token时拦截token，获取新令牌，跳转到首页
    axios.get("/auth/menu",{
      params:{
        token:to.query.token
      }
    }).then(function(res){
        if(res.data.status==200){
          var data = res.data.data
            store.commit("token", data.token)
            axios.get("/auth/menu").then(res => {
                if (res) {
                  loopData(res.data.data)
                  store.commit("menuList", res.data.data);
                  store.commit("userName", data.username);
                  store.commit("login", "true");
                  next({ name: "Index" });
                }
              });
        }
    })

    return false
    
  }

  if (store.state.login != 'true' && to.name != 'Login') {
    // ViewUI.Notice.warning({
    //   top: 80,
    //   title: '温馨提示',
    //   desc: '请先登陆'
    // })
    next({ name: 'Login' });
  }
  next();
});

router.afterEach(() => {
  ViewUI.LoadingBar.finish();
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')