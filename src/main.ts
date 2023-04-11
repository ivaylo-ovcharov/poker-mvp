import { createApp } from "vue";
import App from "./App.vue";
import "./index.scss";
import "./firebase";
// import 'aos/dist/aos.css';
import { router } from "./router/router";

const app = createApp(App);

app.use(router);
console.log("Route initialized");

app.mount("#app");
