import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Oruga from '@oruga-ui/oruga-next';
import 'vue3-typeahead-input/dist/style.css'; //Optional default CSS
const app = createApp(App)

app.use(router).use(Oruga)

app.mount('#app')
