<template>
	<div class="text-right mb-2 mt-0 border">
		<!-- let one edit text appear! -->
		<!-- username is used to control dots appearance -->
		<b-dropdown
			v-show="showDots"
			no-caret
			dropright
			class="left-posit"
			variant="link"
			toggle-class="text-decoration-none px-0 py-0"
		>
			<template #button-content>
				<b-icon icon="three-dots-vertical"></b-icon>
			</template>
			<b-button-group vertical @click="edit_text = review.review" class="dots-posit">
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
			<b-button @click="deleteRview()" variant="info" class="mt-2 mr-2">نعم</b-button>
			<b-button @click="modalShow = false" variant="danger" class="mt-2 mr-2">ألغاء</b-button>
		</b-modal>
		<h6>
			<b-avatar size="sm"></b-avatar>
			{{ review.username }}
		</h6>
		<hr class="col-2 mr-2 mt-0 mb-0" />

		<p class="mr-2 mt-0" v-if="!edit">
			{{ review.review }}
		</p>

		<b-form v-if="edit" @submit.prevent="formSumbit" class="edit">
			<b-form-textarea class="mt-1" id="textarea" v-model="edit_text" rows="2"></b-form-textarea>
			<b-button
				variant="primary"
				:disabled="edit_text === ''"
				@click="method = 'PUT'"
				class="left-posit"
				type="submit"
				size="sm"
				>تعديل</b-button
			>
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
import shared from "../../shared"
import store from "../../store"

export default {
	data() {
		return {
			showDots: store.state.tokenModel.username == "murtaja" && !this.edit,
			text: "",
			edit_text: "",
			modalShow: false,
			deleting: false,
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
	methods: {
		deleteRview() {
			this.deleting = true
			shared
				.sendReviewRating({
					sub_url: this.sub_url,
					comment_id: this.comment_id,
					method: "DELETE"
				})
				.then(() => {
					this.fetchReview(1)
					this.modalShow = false
					this.deleting = false
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
.edit {
	margin-bottom: 30px;
}
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
}
.no-com {
	font-size: 10px;
}
</style>
