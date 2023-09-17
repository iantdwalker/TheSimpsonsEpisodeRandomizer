import "@/assets/styles/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";

// add vuetify styles
import "vuetify/styles";

//add font-awesome plugin
import "@/plugins/font-awesome";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

//add vuetify plugin
import createVuetify from "@/plugins/vuetify";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(createVuetify);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
