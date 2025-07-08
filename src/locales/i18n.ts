import { createI18n } from "vue-i18n";

import en_us_file from "./en-us.json";
import zh_cn_file from "./zh-cn.json";

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: navigator.language.toLowerCase(),   // 使用浏览器默认语言设置
    fallbackLocale: 'en-us',                    // 如果默认语言无效，设置回退语言为英文
    messages: {
        'en-us': en_us_file,
        'zh-cn': zh_cn_file,
    },
});

interface LanguageOption {
  label: () => string;
  value: string;
}

const lang_option: LanguageOption[] = [];

for (const locale of i18n.global.availableLocales) {
  lang_option.push({
    label: ():string => {switch (locale) {
      case 'en-us':
        return 'English (US)';
      case 'zh-cn':
        return '中文 （简体）';
      default:
        return 'English';
    }},
    value: locale
  });
}

export default i18n;
export { lang_option };
