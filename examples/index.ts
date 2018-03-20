import Vue from 'vue/dist/vue.esm.js';
import PayjpCheckout from '../src/index';
Vue.use(PayjpCheckout);
new Vue({
  el: '#app',
  data() {
    return {
      tokenId: null
    };
  },
  methods: {
    onTokenCreated(token) {
      this.tokenId = token.id;
    },
    onTokenFailed(e) {
      console.error(e);
    }
  }
});
