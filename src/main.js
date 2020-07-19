import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { store } from './store/index'
import Clipboard from 'v-clipboard'

Vue.config.productionTip = false
Vue.use(Clipboard)

new Vue({
  vuetify,
  store,
  render: h => h(App),
  methods: {
    broadcastKeyEvent: function(e){
      if (e.code.toLowerCase() == 'slash') {
        this.$root.$emit('searchFocus');
      }
    }
  },
  created: function() {
    window.addEventListener('keyup', this.broadcastKeyEvent);
  },
  destroyed: function() {
    window.removeEventListener('keyup', this.broadcastKeyEvent);
  },
}).$mount('#app')
