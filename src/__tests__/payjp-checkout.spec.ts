import { shallow, Wrapper } from '@vue/test-utils';
import PayjpCheckout from '../';
import Vue from 'vue';

describe('PayjpCheckout', () => {
  let propsData: () => object,
    _component: any,
    component: () => Wrapper<PayjpCheckout>,
    mockRandom: (...values: number[]) => () => number,
    global = window as any;
  beforeEach(() => {
    delete global.onCreatedPayjpToken_8ac7230489e80000;
    delete global.onFailedPayjpToken_8ac7230489e80000;
    mockRandom = (...values: number[]) => {
      let i = 0;
      return () => values[i++];
    };
    _component = null;
    propsData = () => ({
      apiKey: 'asdfghjk',
      clientId: '1234',
      text: 'pay!',
      submitText: '"submit!',
      tokenName: 'test token',
      namePlaceholder: 'John Doe'
    });
    component = () =>
      _component ||
      (_component = shallow(PayjpCheckout, {
        propsData: propsData(),
        mocks: { random: mockRandom(0.1, 0.1) }
      }));
  });

  it('matches snapshot', () => {
    expect(component().html()).toMatchSnapshot();
  });

  it('fills callback globally', () => {
    expect(global.onCreatedPayjpToken_8ac7230489e80000).toBeUndefined();
    expect(global.onFailedPayjpToken_8ac7230489e80000).toBeUndefined();
    component();
    expect(global.onCreatedPayjpToken_8ac7230489e80000).toBeInstanceOf(
      Function
    );
    expect(global.onFailedPayjpToken_8ac7230489e80000).toBeInstanceOf(Function);
    global.onCreatedPayjpToken_8ac7230489e80000();
    expect(global.onCreatedPayjpToken_8ac7230489e80000).toBeUndefined();
    global.onFailedPayjpToken_8ac7230489e80000();
    expect(global.onFailedPayjpToken_8ac7230489e80000).toBeUndefined();
  });

  it('emits created event', () => {
    expect(component().emitted('created')).toBe(undefined);
    expect(global.onCreatedPayjpToken_8ac7230489e80000({ result: true })).toBe(
      false
    );
    expect(component().emitted('created')).toEqual([[{ result: true }]]);
  });

  it('emits failed event', () => {
    expect(component().emitted('failed')).toBe(undefined);
    expect(global.onFailedPayjpToken_8ac7230489e80000({ result: false })).toBe(
      false
    );
    expect(component().emitted('failed')).toEqual([[{ result: false }]]);
  });

  it('returns true if contained in form', () => {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const el = component().vm.$el;
    form.appendChild(el);
    el.appendChild(input);
    expect(global.onCreatedPayjpToken_8ac7230489e80000({ result: true })).toBe(
      true
    );
    expect(global.onFailedPayjpToken_8ac7230489e80000({ result: true })).toBe(
      true
    );
  });

  describe('callback name', () => {
    beforeEach(() => {
      component = () =>
        shallow(PayjpCheckout, {
          propsData: propsData(),
          mocks: { random: mockRandom(0.1, 0.1, 0.2, 0.2) }
        });
    });
    it('generates callback name randomly', () => {
      const attrs1 = component()
        .find('script')
        .attributes();
      const attrs2 = component()
        .find('script')
        .attributes();
      expect(attrs1['data-on-created']).toEqual(
        'onCreatedPayjpToken_8ac7230489e80000'
      );
      expect(attrs1['data-on-failed']).toEqual(
        'onFailedPayjpToken_8ac7230489e80000'
      );
      expect(attrs2['data-on-created']).toEqual(
        'onCreatedPayjpToken_1158e460913d00000'
      );
      expect(attrs2['data-on-failed']).toEqual(
        'onFailedPayjpToken_1158e460913d00000'
      );
    });
  });

  describe('callback name without mocking', () => {
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
      expect(attrs1['data-on-failed']).toMatch(
        /^onFailedPayjpToken_[0-9a-f]+$/
      );
      expect(attrs2['data-on-created']).toMatch(
        /^onCreatedPayjpToken_[0-9a-f]+$/
      );
      expect(attrs2['data-on-failed']).toMatch(
        /^onFailedPayjpToken_[0-9a-f]+$/
      );
      expect(attrs1['data-on-created']).not.toEqual(attrs2['data-on-created']);
      expect(attrs1['data-on-failed']).not.toEqual(attrs2['data-on-failed']);
    });
  });

  describe('install', () => {
    it('adds payjp-checkout component', () => {
      const mockVue = { component: jest.fn() };
      (PayjpCheckout as any).install(mockVue);
      expect(mockVue.component).toHaveBeenCalledWith(
        'payjp-checkout',
        PayjpCheckout
      );
    });
  });
});
