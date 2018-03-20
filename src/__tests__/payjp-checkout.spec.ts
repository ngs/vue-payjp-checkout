import { shallow, Wrapper } from '@vue/test-utils';
import PayjpCheckout from '../';

describe('PayjpCheckout', () => {
  let propsData: () => object,
    component: () => Wrapper<PayjpCheckout>,
    global = window as any;
  beforeEach(() => {
    delete global.onCreatedPayjpToken_45cfff31a1607c000;
    delete global.onFailedPayjpToken_3befe4a56b4e64000;
    propsData = () => ({
      apiKey: 'asdfghjk',
      clientID: '1234',
      text: 'pay!',
      submitText: '"submit!',
      tokenName: 'test token',
      previousToken: 'foo',
      namePlaceholder: 'John Doe',
      createdCallbackName: 'onCreatedPayjpToken_45cfff31a1607c000',
      failedCallbackName: 'onFailedPayjpToken_3befe4a56b4e64000'
    });
    component = () =>
      shallow(PayjpCheckout, {
        propsData: propsData()
      });
  });

  it('matches snapshot', () => {
    expect(component().html()).toMatchSnapshot();
  });

  it('fills callback globally', () => {
    expect(global.onCreatedPayjpToken_45cfff31a1607c000).toBeUndefined();
    expect(global.onFailedPayjpToken_3befe4a56b4e64000).toBeUndefined();
    component();
    expect(global.onCreatedPayjpToken_45cfff31a1607c000).toBeInstanceOf(
      Function
    );
    expect(global.onFailedPayjpToken_3befe4a56b4e64000).toBeInstanceOf(
      Function
    );
    global.onCreatedPayjpToken_45cfff31a1607c000();
    expect(global.onCreatedPayjpToken_45cfff31a1607c000).toBeUndefined();
    global.onFailedPayjpToken_3befe4a56b4e64000();
    expect(global.onFailedPayjpToken_3befe4a56b4e64000).toBeUndefined();
  });
});
