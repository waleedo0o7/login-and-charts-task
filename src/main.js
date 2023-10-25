import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";

if (localStorage.getItem('token')) {

    axios.interceptors.request.use(
        config => {
            config.headers['token'] = `Bearer ${localStorage.getItem('token')}`;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

}

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/style.scss'



createApp(App)
    .use(store)
    .use(router).mount('#app')