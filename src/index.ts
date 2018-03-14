import { CreateElement, VNode, VueConstructor } from 'vue';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class PayjpCheckout extends Vue {
  render(createElement: CreateElement): VNode {
    return createElement('div', {});
  }
};
