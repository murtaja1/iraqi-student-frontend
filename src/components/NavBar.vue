<template>
	<div dir="rtl">
		<b-navbar toggleable="lg" type="dark" variant="info">
			<!-- :icon="['fas', 'search']" -->

			<b-navbar-brand class="desk-search">
				<!-- <font-awesome-icon v-b-modal.modal-1 icon="search" size="lg" />

        <b-modal id="modal-1" centered hide-footer hide-header> -->
				<search />
				<!-- </b-modal> -->
			</b-navbar-brand>
			<b-navbar-brand to="/">الرئيسية</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<!-- to be right aligned in mobile -->
			<b-collapse id="nav-collapse" is-nav align="right">
				<b-navbar-nav>
					<b-nav-item to="/news">الأخبار</b-nav-item>
					<b-nav-item to="/university">الجامعة</b-nav-item>
				</b-navbar-nav>

				<!-- Right aligned nav items -->
				<b-navbar-nav class="mr-auto">
					<b-navbar-brand class="pl-5 mob-search">
						<!-- <font-awesome-icon v-b-modal.modal-2 icon="search" size="lg" />

            <b-modal id="modal-2" centered hide-footer hide-header> -->
						<search />
						<!-- </b-modal> -->
					</b-navbar-brand>

					<b-nav-item-dropdown v-if="access" left no-caret>
						<template #button-content>
							الاعدادت <b-icon icon="tools" aria-hidden="true"></b-icon>
						</template>
						<b-dropdown-text class="text-right">
							<b-button size="sm" variant="outline-info" class="mb-2">
								<b-icon icon="person-fill" aria-hidden="true"></b-icon>
								{{ username }}
							</b-button></b-dropdown-text
						>
						<b-dropdown-text @click="logout" class="text-right">
							<b-button size="sm" variant="outline-info">
								تسجيل الخروج
							</b-button>
						</b-dropdown-text>
					</b-nav-item-dropdown>
					<b-nav-item v-if="!access" to="/login">تسجيل الدخول</b-nav-item>
					<b-nav-item v-if="!access" to="/register">انشاء حساب </b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
import { mapState } from "vuex"
import Search from "./Search"
export default {
	components: {
		Search
	},
	computed: mapState({
		// you may use a function too instead of mapstate, it would watch for changes too.
		access: (state) => state.tokenModel.access,
		username: (state) => state.tokenModel.username
	}),
	methods: {
		logout() {
			this.$store.dispatch("tokenModel/destroyToken")
			this.$router.push({ name: "logIn" })
		}
	}
}
</script>
<style lang="scss" scoped>
// this wide or less.
@media screen and (max-width: 992px) {
	.mob-search {
		display: none;
	}
}
// this wide or more
@media screen and (min-width: 992px) {
	.desk-search {
		display: none;
	}
}
</style>
