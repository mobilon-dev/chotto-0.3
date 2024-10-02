import { createApp } from 'vue';
import App from './App.vue'; // Теперь используем корневой компонент
import { createPinia } from 'pinia'

import 'primeicons/primeicons.css'
import './assets/style.css'

const pinia = createPinia()

const app = createApp(App);
app.use(pinia)
app.mount('#app');
