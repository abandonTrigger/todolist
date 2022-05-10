import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this // 安装全局事件总线，$bus就是当前应用的vm
    // 全局事件总线 一种组件间通信的方式，适用于任意组件间通信。
  }
}).$mount('#app')
