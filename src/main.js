import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import axios from 'axios';

//Components
import App from './App.vue'
import about from './components/about.vue'

//Set Router
Vue.use(VueRouter);

//Resource for http
Vue.use(vueResource);

const routes = [
  { path: '/about', component: about }
]

//Create Routes
const router = new VueRouter({
	routes
});

//Instatiate
new Vue({
    el: '#app',
    render: h => h(App),
	router
})
