import { createVuetify } from "vuetify";
import { aliases, fa } from "vuetify/iconsets/fa";

export default createVuetify({
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
    },
  },
});
