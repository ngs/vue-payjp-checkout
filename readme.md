vue-payjp-checkout
==================

[PAY.JP Checkout Button] component for [Vue.js]

How to use
----------

```sh
npm install --save vue-payjp-checkout
```

```js
var Vue = require('vue')
var PayjpCheckout = require('vue-payjp-checkout')
Vue.use(PayjpCheckout)
```

```html
<payjp-checkout
    api-key="pk_test_d4b1a4668323c8ce49ab7ec5"
    client-id="d3d774f50bb006c26bac19402f0140a7228f8522"
    text="ポップアップを開く"
    submit-text="テストカードで支払い"
    name-placeholder="JOHN DOE"
    v-on:created="onTokenCreated"
    v-on:failed="onTokenFailed">
</payjp-checkout>
```

Author
------

[Atushi Nagase]

License
-------

Copyright &copy; 2018 [Atushi Nagase]. All rights reserved.

[Atushi Nagase]: https://ngs.io/
[PAY.JP Checkout Button]: https://pay.jp/docs/checkout
[Vue.js]: https://vuejs.org/
