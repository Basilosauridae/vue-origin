import Vue from 'vue'
import App from './App.vue'
import vueResource from 'vue-resource'

Vue.use(vueResource)
Vue.config.productionTip = false 


// 创建vm
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this //安装全局事件总线（App和Item.vue）
  }
}).$mount('#app')
 