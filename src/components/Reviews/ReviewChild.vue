<template>
	<div class="text-right mb-2 mt-0 border">
		<!-- let one edit text appear! -->
		<!-- username is used to control dots appearance -->
		<b-dropdown
			v-show="showDots && !edit"
			no-caret
			dropright
			class="left-posit mt-1"
			variant="link"
			toggle-class="text-decoration-none px-0 py-0"
		>
			<template #button-content>
				<b-icon icon="three-dots-vertical"></b-icon>
			</template>
			<b-button-group vertical>
				<b-button size="sm" variant="info" @click="edit = !edit">تعديل</b-button>
				<b-button size="sm" variant="danger" @click="modalShow = true">حذف</b-button>
			</b-button-group>
		</b-dropdown>
		<!-- confirmation -->
		<b-modal v-model="modalShow" centered scrollable hide-footer hide-header no-close-on-backdrop>
			<h4 align="center" class="text-danger" v-if="!deleting">هل انت متأكد من الحذف؟</h4>
			<div v-if="deleting" align="center">
				<h4 class="text-danger">جاري الحذف...</h4>
				<b-spinner variant="danger"></b-spinner>
			</div>
			<div v-else>
				<b-button @click="deleteRview()" variant="info" class="mt-2 mr-2">نعم</b-button>
				<b-button @click="modalShow = false" variant="danger" class="mt-2 mr-2">ألغاء</b-button>
			</div>
		</b-modal>
		<h6>
			<b-avatar size="sm"></b-avatar>
			{{ review.username }}
		</h6>
		<hr class="col-2 mr-2 mt-0 mb-0" />

		<p class="mr-2 mt-0" v-if="!edit">
			{{ review.review }}
		</p>

		<b-form v-if="edit" @submit.prevent="formSumbit" class="mb-5">
			<b-form-textarea
				class="mt-1 mb-2"
				id="textarea"
				v-model="edit_text"
				rows="2"
			></b-form-textarea>
			<b-button
				variant="primary"
				v-if="!editLoading"
				:disabled="edit_text === '' || edit_text == review.review"
				@click="method = 'PUT'"
				class="left-posit mx-1"
				type="submit"
				size="sm"
				>ارسال</b-button
			>
			<b-button size="sm" class="left-posit mx-1" v-else variant="primary" disabled>
				ارسال...
				<b-spinner small></b-spinner>
			</b-button>
			<b-button
				variant="danger"
				@click=";(edit = !edit), (dot_info = !dot_info)"
				class="left-posit"
				size="sm"
				>ألغاء</b-button
			>
		</b-form>
	</div>
</template>

<script>
import helper from "../../helper"
import store from "../../store"
export default {
	data() {
		return {
			// trim: https://stackoverflow.com/questions/863524/javascript-string-compare-sometimes-fails
			showDots:
				this.review.username ==
				(store.state.tokenModel.username == null ? "" : store.state.tokenModel.username.trim()),
			edit_text: this.review.review,
			modalShow: false,
			deleting: false,
			dot_info: false,
			edit: false,
			comment_id: `/${this.review.id}/`,
			editLoading: false
		}
	},
	props: {
		review: Object,
		sub_url: String,
		fetchReview: Function,
		currentPage: Number
	},
	methods: {
		deleteRview() {
			this.deleting = true
			helper
				.sendReviewRating({
					sub_url: this.sub_url,
					comment_id: this.comment_id,
					method: "DELETE"
				})
				.then(() => {
					this.fetchReview(1)
					this.modalShow = false
				})
		},
		formSumbit() {
			this.editLoading = true
			helper
				.sendReviewRating({
					review: this.edit_text,
					building: this.review.building,
					sub_url: `${this.sub_url}/${this.review.id}/`,
					id: this.comment_id,
					method: "PUT"
				})
				.then(() => {
					this.fetchReview(this.currentPage)
					this.dot_info = false
					this.edit = false
					this.editLoading = false
				})
		}
	}
}
</script>

<style lang="scss" scoped>
.left-posit {
	float: left;
}
::v-deep .btn-link {
	color: black;
}
::v-deep .btn-link:hover {
	color: black;
}
::v-deep .btn:focus {
	box-shadow: none;
}
::v-deep .dropdown-menu {
	border: none;
	background: none;
	min-width: 50px;
	padding: 0;
}
.no-com {
	font-size: 10px;
}
</style>
