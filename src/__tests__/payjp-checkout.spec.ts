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

  describe('callback name', () => {
    beforeEach(() => {
      component = () =>
        shallow(PayjpCheckout, {
          propsData: propsData()
        });
    });
    it('generates callback name randomly', () => {
      const attrs1 = component()
        .find('script')
        .attributes();
      const attrs2 = component()
        .find('script')
        .attributes();
      expect(attrs1['data-on-created']).toMatch(
        /^onCreatedPayjpToken_[0-9a-f]+$/
      );
      expect(attrs1['data-on-failed']).toMatch(/^onFailedPayjpToken_[0-9a-f]+/);
      expect(attrs1['data-on-created']).not.toEqual(attrs2['data-on-created']);
      expect(attrs1['data-on-failed']).not.toEqual(attrs2['data-on-failed']);
    });
  });
});
