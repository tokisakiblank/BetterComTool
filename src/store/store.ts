import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import i18n from '../locales/i18n';


export const useMainStore = defineStore('main', () => {

  const count = ref(0);

  const language_code = computed({
    get() {
    return i18n.global.locale.value || 'en-us'; // Default to 'en-us' if locale is not set  
    },
    set(value) {
      i18n.global.locale.value = value; // Update the i18n locale
    }
  });
  
  const language_display = computed(() => {
    switch (language_code.value) {
      case 'en-us':
        return 'English (US)';
      case 'zh-cn':
        return '中文 (简体)';
      default:
        return 'Unknown Language';
    }
  });

  function $reset() {
    count.value = 0;
  }

  return { language_code, language_display, count, $reset};
})
