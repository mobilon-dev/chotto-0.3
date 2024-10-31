import { createApp } from 'vue';
import App from './App.vue'; // Теперь используем корневой компонент
import { createPinia } from 'pinia'

import 'primeicons/primeicons.css'
import './assets/style.css'

import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'

const vfm = createVfm()

// кастомная тема
import './assets/themes/diamond.css'

const pinia = createPinia()

const app = createApp(App);

app.use(vfm)
app.use(pinia)
app.mount('#app');
