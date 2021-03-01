import Vue from "vue"
import VueRouter from "vue-router"
import home from "../views/Home.vue"
import homeDetail from "../views/HomeDetail.vue"
import collage from "../views/Collage.vue"
import department from "../views/Department.vue"
import logIn from "../views/LogIn.vue"
import register from "../views/Register.vue"

// remember transition for router.

Vue.use(VueRouter)

const routes = [
	{
		path: "/login",
		name: "logIn",
		component: logIn
	},
	{
		path: "/register",
		name: "Register",
		component: register
	},
	{
		path: "/",
		name: "Home",
		component: home,
		props: { name: "home", title: ["الأخبار", "جامعتي"] }
	},
	{
		path: "/news",
		name: "News",
		component: home,
		props: { name: "news", title: ["الأخبار"] }
	},
	{
		path: "/university",
		name: "University",
		component: home,
		props: { name: "universities", title: ["جامعتي"] }
	},

	{
		path: "/detail/:name/:id",
		name: "homeDetail",
		component: homeDetail
	},
	{
		path: "/university/collage/:university/:collage",
		name: "collage",
		component: collage
	},
	{
		path: "/department/:university/:collage/:department",
		name: "department",
		component: department
	}
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
})

export default router
