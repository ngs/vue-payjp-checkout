import { shallow, Wrapper, ThisTypedShallowOptions } from '@vue/test-utils';
import PayjpCheckout from '../';

describe('PayjpCheckout', () => {
  let propsData: () => object,
    component: () => Wrapper<PayjpCheckout>,
    subject: any;
  beforeEach(() => {
    propsData = () => ({
      onCreatedCallbackName: "onCreatedPayjpToken_45cfff31a1607c000",
      onFailedCallbackName: "onFailedPayjpToken_3befe4a56b4e64000"
    });
    component = () => shallow(PayjpCheckout, {
      propsData: propsData()
    });
    subject = () => component().html();
  });

  it('renders hello', () => {
    expect(subject()).toMatchSnapshot();
  });
});
