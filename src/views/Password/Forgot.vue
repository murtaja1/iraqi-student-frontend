<template>
	<b-container class="border mt-2 rounded col-md-6 bg-color">
		<b-form @submit.prevent="handleSubmit" class="text-right">
			<b-form-group
				id="input-group-2"
				label-size="sm"
				label="ادخل الايميل ليتم ارسال رمز التحقق"
				label-for="input-2"
			>
				<b-input-group>
					<b-input-group-prepend is-text>
						<b-icon icon="envelope"></b-icon>
					</b-input-group-prepend>
					<b-form-input
						:class="[alertStatus.emailFocus || alertStatus.emailFail ? 'input' : '']"
						id="input-2"
						v-model="form.email"
						type="email"
						:title="title"
						@invalid="checkemailValidity"
						@input="checkemailValidity"
						required
						placeholder="ادخل البريد الالكتروني"
					></b-form-input>
				</b-input-group>
				<span v-if="alertStatus.emailFail">
					<b-alert show variant="danger" class="mt-1" dismissible>
						<b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
						هذا الايميل غير صالح للاستخدام, يرجى ادخال اميل صالح!
					</b-alert></span
				>
			</b-form-group>

			<b-button type="submit" variant="primary">ارسال</b-button>
		</b-form>
	</b-container>
</template>

<script>
export default {
	data() {
		return {
			form: {
				email: ""
			},
			title: "املأ ألحقل رجاءاً",
			oninvalid: "setCustomValidity('املأ ألحقل رجاءاً')",
			oninput: "setCustomValidity('')",
			alertStatus: {
				emailFail: false,
				emailFocus: false
			}
		}
	},
	methods: {
		checkemailValidity() {
			var email = document.getElementById("input-2")
			if (email.value === "") {
				email.setCustomValidity(" يرجى ملىء ألحقل ")
				this.alertStatus.emailFocus = true
			} else if (email.validity.typeMismatch) {
				this.alertStatus.emailFocus = true
				email.setCustomValidity(`يرجىء ادخال اميل صالح`)
			} else {
				this.alertStatus.emailFocus = false
				email.setCustomValidity("")
			}
		},
		handleSubmit: async function() {
			this.alertStatus.email = false
			const promise = await fetch(`${this.$store.state.tokenModel.url}api/password_reset/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email: this.form.email
				})
			})
			const res = await promise.json()
			console.log(res)
			if (res.email) {
				this.alertStatus.emailFail = true
			} else if (res.status == "OK") {
				this.$router.push({ name: "resetPassword" })
			}
			console.log(res)
		}
	}
}
</script>
<style lang="scss" scoped>
// use the register instead.
.bg-color {
	background-color: lightblue;
}
.input:focus {
	outline: none !important;
	border-color: rgb(219, 24, 24);
	box-shadow: 0 0 5px red;
}
</style>
