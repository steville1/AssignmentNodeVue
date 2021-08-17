import Vue from 'vue'
import Router from 'vue-router'
//import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Logout from '../components/Logout.vue'
import authentication from '../utils/authentication'

Vue.use(Router)

//export default new Router({
 //   mode:'history',
const routes = [
		{path:'/', component:Home,
		meta: {
            middleware: [authentication]}
        },
		{path:'/login', component:Login},
        
		
		{
			path: '/logout',
			name: 'Logout',
			component: Logout
		},
		{path:'/register', component:Register},
		{path: "*", redirect: "/Login",}

	]
	const router = new Router({
		mode: 'history',
		base: process.env.BASE_URL,
		routes
	})
	
	
	function nextFactory(context, middleware, index) {
		const subsequentMiddleware = middleware[index];
		if (!subsequentMiddleware) {
			return context.next;
		}
	
		return (...parameters) => {
			context.next(...parameters);
			const nextMiddleware = nextFactory(context, middleware, index + 1);
			subsequentMiddleware({...context, next: nextMiddleware});
		}
	}
	
	router.beforeEach((to, from, next) => {
		if (to.meta.middleware) {
			const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];
			const context = {from, next, router, to};
			const nextMiddleware = nextFactory(context, middleware, 1);
			return middleware[0]({...context, next: nextMiddleware});
	
		}
		return next();
	})

export default router