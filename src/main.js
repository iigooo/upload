import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vueScroll from 'vuescroll';
import baseVue from "@/assets/scripts/global/baseVue";
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(baseVue);
Vue.use(vueScroll, {
    ops: {},
});

new Vue({
    render: h => h(App),
}).$mount('#app')
