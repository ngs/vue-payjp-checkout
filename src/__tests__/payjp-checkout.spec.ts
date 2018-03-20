import { shallow, Wrapper } from '@vue/test-utils';
import PayjpCheckout from '../';

describe('PayjpCheckout', () => {
  let propsData: () => object,
    _component: any,
    component: () => Wrapper<PayjpCheckout>,
    global = window as any;
  beforeEach(() => {
    delete global.onCreatedPayjpToken_45cfff31a1607c000;
    delete global.onFailedPayjpToken_3befe4a56b4e64000;
    _component = null;
    propsData = () => ({
      apiKey: 'asdfghjk',
      clientId: '1234',
      text: 'pay!',
      submitText: '"submit!',
      tokenName: 'test token',
      previousToken: 'foo',
      namePlaceholder: 'John Doe'
    });
    component = () =>
      _component ||
      (_component = shallow(PayjpCheckout, {
        propsData: propsData(),
        mocks: {
          createdCallbackName: 'onCreatedPayjpToken_45cfff31a1607c000',
          failedCallbackName: 'onFailedPayjpToken_3befe4a56b4e64000'
        }
      }));
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

  it('emits created event', () => {
    expect(component().emitted('created')).toBe(undefined);
    global.onCreatedPayjpToken_45cfff31a1607c000({ result: true });
    expect(component().emitted('created')).toEqual([[{ result: true }]]);
  });

  it('emits failed event', () => {
    expect(component().emitted('failed')).toBe(undefined);
    global.onFailedPayjpToken_3befe4a56b4e64000({ result: false });
    expect(component().emitted('failed')).toEqual([[{ result: false }]]);
  });
});
