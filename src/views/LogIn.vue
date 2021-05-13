<template>
	<b-container class="mt-2 col-md-6 col-xl-4">
		<h3 align="center">تسجيل الدخول</h3>
		<hr class="hr mb-0" />
		<b-form @submit.prevent="login" class="text-right">
			<span v-if="fail">
				<b-alert show variant="danger" class="mt-1">
					<b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
					أسم المستخدم او كلمة المرور غير صحيح.
				</b-alert>
			</span>
			<b-form-group id="input-group-1" label="أسم المستخدم:" label-for="input-1" class="mt-2">
				<b-input-group>
					<b-input-group-prepend is-text>
						<b-icon icon="person-fill"></b-icon>
					</b-input-group-prepend>
					<b-form-input
						id="input-1"
						v-model="form.name"
						type="text"
						:title="title"
						:oninvalid="oninvalid"
						:oninput="oninput"
						required
						placeholder="اكتب..."
					></b-form-input>
				</b-input-group>
			</b-form-group>

			<b-form-group id="input-group-2" label="رمز المرور:" label-for="input-2">
				<b-input-group>
					<b-input-group-prepend is-text>
						<b-icon icon="lock-fill"></b-icon>
					</b-input-group-prepend>
					<b-form-input
						id="input-2"
						v-model="form.password"
						type="password"
						:title="title"
						:oninvalid="oninvalid"
						:oninput="oninput"
						required
						placeholder="اكتب..."
					></b-form-input>
				</b-input-group>
			</b-form-group>
			<b-button type="submit" variant="primary">تسجيل الدخول</b-button>
			<b-link to="/forgotPassword"> نسيت كلمة المرور؟ </b-link>
		</b-form>

		<hr class="col-sm-4 col-6" />
		<div align="center" class="mb-2">
			ليس لديك حساب مسبقاً؟
			<br />
			<b-link variant="primary" to="/register">أنشاء حساب</b-link>
		</div>
	</b-container>
</template>

<script>
import { mapState } from "vuex"

export default {
	data() {
		return {
			form: {
				password: "",
				name: ""
			},
			title: "املأ ألحقل رجاءاً",
			oninvalid: "setCustomValidity('املأ ألحقل رجاءاً')",
			oninput: "setCustomValidity('')"
		}
	},
	computed: mapState({
		fail: (state) => state.tokenModel.fail
	}),
	methods: {
		login() {
			// call to run an action.
			// when loged in the user will be pushed home in the getToken method.
			this.$store
				.dispatch("tokenModel/getToken", {
					username: this.form.name,
					password: this.form.password
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}
}
</script>
<style lang="scss" scoped>
.hr {
	width: 200px;
}
</style>
