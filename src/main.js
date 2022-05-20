import Vue from 'vue'
import App from './App.vue'


// 引入reset.css
import "./assets/css/reset.css"
// 引入rem.js
import "./assets/js/rem.js"


new Vue({
  render: h => h(App),
}).$mount('#app')
