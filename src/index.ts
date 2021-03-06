import { CreateElement, VNode } from 'vue';
import { Vue, Component, Prop } from 'vue-property-decorator';

const CREATED = 'created',
  FAILED = 'failed',
  CREATED_CALLBACK_PREFIX = 'onCreatedPayjpToken_',
  FAILED_CALLBACK_PREFIX = 'onFailedPayjpToken_';

@Component
export default class PayjpCheckout extends Vue {
  static install(V: typeof Vue): void {
    V.component('payjp-checkout', this);
  }

  /** あなたのパブリックキー */
  @Prop({ required: true })
  apiKey!: string;

  /** PAY.JPで発行したOAuth Client ID */
  @Prop({})
  clientId?: string;

  /** trueとセットすると、カード情報フォーム入力後に自動的に送信(自動的なトークン作成)しない */
  @Prop({ default: false })
  partial!: boolean;

  /** カード情報入力フォームを開くのボタンのテキスト */
  @Prop({})
  text?: string;

  /** カード情報入力フォーム内の送信ボタンのテキスト */
  @Prop({})
  submitText?: string;

  /** 作成されたトークンがセットされるinput name(hidden) */
  @Prop({})
  tokenName?: string;

  /** エラーにより画面に戻ってきた場合などに、再入力をさせないために作成済みのトークンを入れるパラメーター */
  @Prop({})
  previousToken?: string;

  /** メッセージなどの表示言語 */
  @Prop({ default: 'ja', validator: value => /^ja|en$/.test(value) })
  lang!: string;

  /** カード名義のplaceholderにセットされる値 */
  @Prop({})
  namePlaceholder?: string;

  private random!: () => number;

  render(createElement: CreateElement): VNode {
    return createElement('div', {});
  }

  mounted() {
    const self = this;
    const emit = this.$emit.bind(this);
    const random = self.random || Math.random;

    function generateCallback(eventName: string, prefix: string): string {
      const rand = Math.ceil(random() * 1e20).toString(0x10);
      const name = prefix + rand;
      const w = window as any;
      if (w[name]) {
        return generateCallback(eventName, prefix);
      }
      w[name] = (...args: any[]) => {
        const ret = emit(eventName, ...args);
        try {
          delete w[name];
        } finally {
          const inputs = self.$el.getElementsByTagName('input')[0] || {};
          return !!inputs.form && !!ret;
        }
      };
      return name;
    }

    const createdCallbackName = generateCallback(
      CREATED,
      CREATED_CALLBACK_PREFIX
    );
    const failedCallbackName = generateCallback(FAILED, FAILED_CALLBACK_PREFIX);

    const scriptEl = document.createElement('script');
    // https://pay.jp/docs/checkout
    const attrs = {
      src: 'https://checkout.pay.jp/',
      class: 'payjp-button',
      'data-key': this.apiKey,
      'data-payjp': this.clientId,
      'data-partial': !!this.partial,
      'data-text': this.text,
      'data-submit-text': this.submitText,
      'data-token-name': this.tokenName,
      'data-previous-token': this.previousToken,
      'data-lang': this.lang,
      'data-on-created': createdCallbackName,
      'data-on-failed': failedCallbackName,
      'data-name-placeholder': this.namePlaceholder
    } as any;
    Object.keys(attrs).forEach(key => {
      const value = attrs[key];
      if (value !== undefined) {
        scriptEl.setAttribute(key, value);
      }
    });
    this.$el.appendChild(scriptEl);
  }
}
