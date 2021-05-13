<template>
	<b-container class="mt-2 col-md-6 col-xl-4">
		<h3 align="center">كلمة مرور جديده</h3>
		<hr class="hr mb-0" />
		<b-form @submit.prevent="handleSubmit" class="text-right">
			<b-form-group
				id="input-group-1"
				label="يرجى ادخال الرمز الذي تم ارساله:"
				label-for="input-1"
				class="mt-2"
			>
				<b-input-group>
					<b-input-group-prepend is-text>
						<b-icon icon="lock-fill"></b-icon>
					</b-input-group-prepend>
					<b-form-input
						id="input-1"
						v-model="form.token"
						type="text"
						:title="title"
						:oninvalid="oninvalid"
						:oninput="oninput"
						required
						placeholder="ادخل الرمز"
					></b-form-input>
				</b-input-group>
			</b-form-group>
			<b-alert v-model="fail" variant="danger" class="alert">
				<b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
				هذا الرمز غير صالح للاستخدام!
			</b-alert>
			<b-form-group id="input-group-2" label="كلمة المرور جديده:" label-for="input-2">
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
						placeholder="ادخل كلمة مرور جديده"
					></b-form-input>
				</b-input-group>
			</b-form-group>
			<b-button type="submit" variant="primary" class="mb-2">ارسال</b-button>
		</b-form>
	</b-container>
</template>

<script>
export default {
	data() {
		return {
			form: {
				password: "",
				token: ""
			},
			fail: false,
			title: "املأ ألحقل رجاءاً",
			oninvalid: "setCustomValidity('املأ ألحقل رجاءاً')",
			oninput: "setCustomValidity('')"
		}
	},

	methods: {
		handleSubmit: async function() {
			this.fail = false
			const promise = await fetch(
				`${this.$store.state.tokenModel.url}api/password_reset/confirm/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						token: this.form.token,
						password: this.form.password
					})
				}
			)
			const res = await promise.json()
			if (promise.status === 404) {
				this.fail = true
			} else if (res.status == "OK") {
				this.$router.push({ name: "logIn" })
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.alert {
	margin-top: -13px;
}
.hr {
	width: 250px;
}
</style>
