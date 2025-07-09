<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { lang_option } from "./locales/i18n";
import { useMainStore } from "./store/store";
import { invoke } from "@tauri-apps/api/core";
import Serial from "./Components/Serial.vue"

const store = useMainStore();

const { t } = useI18n({ useScope: 'global' });

const greetMsg = ref("");
const name = ref("");

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  greetMsg.value = await invoke("greet", { name: name.value });
}

</script>

<template>
  <main class="container">
    <n-notification-provider :max="2" placement='top'>
      <Serial/>
    </n-notification-provider>
    <h1>{{ t("info.welcome") }}</h1>
    <h1>{{ t('info.title') }}</h1>
    <p>{{ t("info.description") }}</p>
    
    <n-select
      v-model:value="store.language_code"
      :options="lang_option"
      :placeholder="t('info.selectLanguage')"
      style="width: 200px; margin-bottom: 20px; align-self: center;"
    ></n-select>

    <div class="row">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo vite" alt="Vite logo" />
      </a>
      <a href="https://tauri.app" target="_blank">
        <img src="/tauri.svg" class="logo tauri" alt="Tauri logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <p>{{ t("info.info") }}</p>

    <form class="row" @submit.prevent="greet">
      <n-input id="greet-input" v-model:value="name" :placeholder="t('info.greet_input_placeholder')" />
      <n-button attr-type="submit">nGreet</n-button>
    </form>
    <p v-show="name"> {{ t("info.insert_name", {name: name}) }}</p>
    <p>{{ greetMsg }}</p>
  </main>
</template>

<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}

</style>
<style>

:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  color: #0f0f0f;
  background-color: #f6f6f6;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

.container {
  margin: 0;
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: 0.75s;
}

.logo.tauri:hover {
  filter: drop-shadow(0 0 2em #24c8db);
}

.row {
  display: flex;
  justify-content: center;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}

a:hover {
  color: #535bf2;
}

h1 {
  text-align: center;
}

#greet-input {
  margin-right: 5px;
  width: 300px;
}

@media (prefers-color-scheme: dark) {
  :root {
    color: #f6f6f6;
    background-color: #2f2f2f;
  }

  a:hover {
    color: #24c8db;
  }
}

</style>