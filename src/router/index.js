import Vue from "vue"
import VueRouter from "vue-router"
import home from "../views/Home.vue"
import University from "../views/University.vue"
import collage from "../views/Collage.vue"
import department from "../views/Department.vue"
import logIn from "../views/LogIn.vue"
import register from "../views/Register.vue"
import Forgot from "../views/Password/Forgot"
import Reset from "../views/Password/Reset"
import News from "../views/News"
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
		path: "/forgotPassword",
		name: "forgotPassword",
		component: Forgot
	},
	{
		path: "/resetpassword",
		name: "resetPassword",
		component: Reset
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
		path: "/universities/:id",
		name: "university",
		component: University
	},
	{
		path: "/news/:id",
		name: "news",
		component: News
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
	routes
})

export default router
