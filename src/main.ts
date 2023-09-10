import "@/assets/styles/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";

// add vuetify styles
import "vuetify/styles";

//add vuetify plugin
import createVuetify from "@/plugins/vuetify";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(createVuetify);

app.mount("#app");
