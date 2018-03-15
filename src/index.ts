import { CreateElement, VNode, VueConstructor } from 'vue';
import { Vue, Component, Prop } from 'vue-property-decorator';

function generateCallback(prefix: string, func: () => any): string {
  const rand = Math.ceil(Math.random() * 1e20).toString(0x10);
  const name = prefix + rand;
  const w = window as any;
  if (w[name]) {
    return generateCallback(prefix, func);
  }
  w[name] = func;
  return name;
}

@Component
export default class PayjpCheckout extends Vue {

  @Prop({ type: String, default: '' })
  createdCallbackName: string = '';

  @Prop({ type: String, default: '' })
  failedCallbackName: string = '';

  render(createElement: CreateElement): VNode {
    return createElement('div', {});
  }

  created() {
    const emit = this.$emit.bind(this);
    const onCreated = function (...args: any[]) {
      emit('created', ...args);
    };
    const onFailed = function (...args: any[]) {
      emit('failed', ...args);
    };
    const w = window as any;
    console.debug(this.createdCallbackName, this.$props.createdCallbackName, "]]");
    if (this.createdCallbackName) {
      w[this.createdCallbackName] = onCreated;
    } else {
      this.createdCallbackName = generateCallback('onCreatedPayjpToken_', onCreated);
    }
    if (this.failedCallbackName) {
      w[this.failedCallbackName] = onFailed;
    } else {
      this.failedCallbackName = generateCallback('onFailedPayjpToken_', onFailed);
    }
  }

  mounted() {
    const scriptEl = document.createElement('script');
    const attrs = {
      'src': 'https://checkout.pay.jp/',
      'class': 'payjp-button',
      'data-key': this.$attrs['api-key'],
      'data-on-created': this.createdCallbackName,
      'data-on-failed': this.failedCallbackName,
      'data-text': this.$attrs.text,
      'data-submit-text': this.$attrs['submit-text'],
      'data-partial': 'true'
    };
    Object.keys(attrs).forEach(key => {
      const value = (attrs as any)[key];
      if (value !== undefined) {
        scriptEl.setAttribute(key, value);
      }
    });
    this.$el.appendChild(scriptEl);
  }
};
