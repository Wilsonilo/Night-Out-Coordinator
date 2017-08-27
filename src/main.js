import Vue from 'vue'
import VueRouter from 'vue-router'

//Components
import App from './App.vue'
import about from './components/about.vue'

//Set Router
Vue.use(VueRouter);

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
