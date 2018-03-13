import {shallow} from '@vue/test-utils';
import PayjpCheckout from '../';

describe('PayjpCheckout', () => {
  let propsData, component, subject;
  beforeEach(() => {
    propsData = () => {};
    component = () => {
      return shallow(PayjpCheckout, {
        propsData: propsData(),
      });
    };
    subject = () => component().html();
  });

  it('renders hello', () => {
    expect(subject()).toMatchSnapshot();
  });
});
