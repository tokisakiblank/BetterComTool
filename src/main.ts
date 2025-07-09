import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import i18n from "./locales/i18n";

document.addEventListener("keydown", (event) => {
  if (event.key === "F12" || event.keyCode == 123) {
    // Prevent F12 key (usually opens developer tools)
    // event.preventDefault();
  }
  if (event.key === "F5" || event.keyCode == 116) {
    // Prevent F5 key (usually refreshes the page)
    event.preventDefault();
  }
  if( (event.ctrlKey && event.shiftKey && event.key === "I") ||
        (event.metaKey && event.altKey && event.key === "I")) {
    // Prevent Ctrl+Shift+I or Cmd+Alt+I (usually opens developer tools)
    event.preventDefault();
  }
});

// Prevent right-click context menu
document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(i18n);

app.mount('#app');
