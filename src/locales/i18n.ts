import { createI18n } from "vue-i18n";

import en_us_file from "./en_us.json";
import zh_cn_file from "./zn_cn.json";

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: navigator.language.toLowerCase(),   // 使用浏览器默认语言设置
    fallbackLocale: 'en-us',                    // 如果默认语言无效，设置回退语言为英文
    messages: {
        'en-us': en_us_file,
        'zh-cn': zh_cn_file
    },
});

export default i18n;
