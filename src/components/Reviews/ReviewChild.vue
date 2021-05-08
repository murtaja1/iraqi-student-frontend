<template>
	<div class="text-right mb-2 mt-0 border ">
		<!-- let one edit text appear! -->
		<!-- username is used to control dots appearance -->
		<b-icon
			v-if="(username === review.username) & !edit"
			@click="dot_info = !dot_info"
			icon="three-dots-vertical"
			class="dots-posit"
		></b-icon>

		<b-button-group
			vertical
			@click="edit_text = review.review"
			v-if="dot_info & !edit"
			class="dots-posit"
		>
			<b-button size="sm" variant="info" @click="edit = !edit">تعديل</b-button>
			<b-button size="sm" variant="danger" @click="deleteRview()">حذف</b-button>
		</b-button-group>
		<h6>
			<b-avatar size="sm"></b-avatar>
			{{ review.username }}
		</h6>
		<hr class="col-2 mr-2 mt-0 mb-0" />

		<p class="mr-2 mt-0" v-if="!edit">
			{{ review.review }}
		</p>

		<b-form v-if="edit" @submit.prevent="formSumbit">
			<b-form-textarea class="mt-1" id="textarea" v-model="edit_text" rows="2"></b-form-textarea>
			<b-button
				variant="primary"
				:disabled="edit_text === ''"
				@click="method = 'PUT'"
				class="btn-posit"
				type="submit"
				size="sm"
				>تعديل</b-button
			>
			<b-button
				variant="danger"
				@click=";(edit = !edit), (dot_info = !dot_info)"
				class="btn-posit"
				size="sm"
				>ألغاء</b-button
			>
		</b-form>
	</div>
</template>

<script>
import shared from "../../shared"
import { mapState } from "vuex"

export default {
	data() {
		return {
			text: "",
			edit_text: "",
			dot_info: false,
			edit: false,
			comment_id: `/${this.review.id}/`
		}
	},
	props: {
		review: Object,
		sub_url: String,
		fetchReview: Function,
		currentPage: Number
	},
	computed: mapState({
		username: (state) => state.tokenModel.username
	}),
	methods: {
		deleteRview() {
			shared
				.sendReviewRating({
					sub_url: this.sub_url,
					comment_id: this.comment_id,
					method: "DELETE"
				})
				.then(() => {
					this.fetchReview(1)
				})
		},
		formSumbit() {
			shared
				.sendReviewRating({
					review: this.edit_text,
					building: this.review.building,
					sub_url: this.sub_url,
					id: this.comment_id,
					method: "PUT"
				})
				.then(() => {
					this.fetchReview(this.currentPage)
					this.dot_info = false
					this.edit = false
				})
			this.text = ""
		}
	}
}
</script>

<style lang="scss" scoped>
.btn-posit {
	float: left;
}
.dots-posit {
	float: left;
}
.no-com {
	font-size: 10px;
}
</style>
