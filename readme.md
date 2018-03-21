vue-payjp-checkout
==================

[PAY.JP Checkout Button] component for [Vue.js]

[![npm version](https://badge.fury.io/js/vue-payjp-checkout.svg)](https://badge.fury.io/js/vue-payjp-checkout)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/75340aa1653c433090a8ba96972176c2)](https://www.codacy.com/app/ngs/vue-payjp-checkout?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ngs/vue-payjp-checkout&amp;utm_campaign=Badge_Grade)
[![CircleCI](https://circleci.com/gh/ngs/vue-payjp-checkout.svg?style=svg)](https://circleci.com/gh/ngs/vue-payjp-checkout)

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
