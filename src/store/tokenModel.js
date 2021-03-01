import router from "../router"

export default {
	// means every module is its own.(self-contained)
	// no need to put url, just create a single file for costant data.
	namespaced: true,
	state: {
		access: false,
		refresh: false,
		username: null,
		fail: false,
		url:
			"https://tranquil-cove-12072.herokuapp.com/https://iraqi-student.herokuapp.com/"
	},

	mutations: {
		updateStorage: (state, { access, refresh, username, fail }) => {
			;(state.access = access),
				(state.refresh = refresh),
				(state.username = username),
				(state.fail = fail)
		}
	},

	actions: {
		// gets called when loged in and registered.
		getToken: async function({ commit, state }, credentials) {
			try {
				const promise = await fetch(`${state.url}api/token/`, {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						username: credentials.username,
						password: credentials.password
					})
				})
				const data = await promise.json()
				if (data.refresh) {
					localStorage.setItem("access", data.access)
					localStorage.setItem("refresh", data.refresh)
					localStorage.setItem("username", credentials.username)
					// fail here is to show or hide the the alert.
					commit("updateStorage", {
						access: data.access,
						refresh: data.refresh,
						username: credentials.username,
						fail: false
					})
					router.push({ name: "Home" })
				} else {
					commit("updateStorage", {
						access: false,
						refresh: false,
						username: null,
						fail: true
					})
				}
			} catch (err) {
				console.log(err)
			}
		},
		// gets called when the user logout.
		destroyToken: ({ commit }) => {
			localStorage.setItem("access", false)
			localStorage.setItem("refresh", false)
			localStorage.setItem("username", null)
			commit("updateStorage", {
				access: false,
				refresh: false,
				username: null,
				fail: false
			})
		},
		// gets called whenever the site reloads.
		// so I request access via refresh and keep the username in the site.
		fetchTokens: ({ commit }) => {
			// console.log(localStorage.getItem('access'));
			if (localStorage.getItem("access") === "false") {
				commit("updateStorage", {
					access: false,
					refresh: false,
					username: null,
					fail: false
				})
			} else {
				commit("updateStorage", {
					access: localStorage.getItem("access"),
					refresh: localStorage.getItem("refresh"),
					username: localStorage.getItem("username"),
					fail: false
				})
			}
		}
	}
}
