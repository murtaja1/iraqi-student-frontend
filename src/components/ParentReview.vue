<template>
	<div>
		<Review
			v-for="review in reviews"
			:key="review.id"
			:review="review"
			:sub_url="sub_url"
			:fetchReview="fetchReview"
		/>
		<b-pagination
			v-if="ShowPagi"
			class="mt-2"
			v-model="currentPage"
			:total-rows="totalReviews"
			per-page="5"
			prev-text="السابق"
			next-text="التالي"
			align="center"
			size="sm"
			pills
			@input="fetchReview"
			hide-goto-end-buttons
			first-number
			last-number
		></b-pagination>
		<div v-if="ShowNoCOM" align="center" class="text-danger">
			لا {{ empty1 }} حتى الان! <br /><span class="no-com">(كون اول {{ empty2 }})</span>
		</div>

		<b-form @submit.prevent="formSumbit">
			<label for="textarea">أترك مراجعة: </label>
			<b-form-textarea
				class=" mb-1"
				id="textarea"
				v-model="text"
				placeholder="اكتب ..."
				rows="2"
			></b-form-textarea>
			<b-popover target="textarea" placement="topleft" variant="info" v-if="!refresh">
				يرجىء
				<b-button variant="outline-primary" size="sm" to="/login">تسجل الدخول</b-button>
				أولا
			</b-popover>

			<b-button
				variant="primary"
				:disabled="!refresh || text === ''"
				class="btn-posit"
				type="submit"
				>ارسال</b-button
			></b-form
		>
		<!-- <b-form v-if="!refresh" @submit.prevent="formSumbit">
			<b-form-group id="input-group-1" label="الاسم:" label-for="input-1">
				<b-form-input
					id="input-1"
					v-model="form.name"
					type="email"
					placeholder="ادخل الاسم"
					required
				></b-form-input>
			</b-form-group>
			<b-form-group
				id="input-group-2"
				label="عنوان البريد:"
				label-for="input-2"
			>
				<b-form-input
					id="input-1"
					v-model="form.email"
					type="email"
					placeholder="ادخل البريد الالكتروني"
					required
				></b-form-input>
			</b-form-group>
			<b-button variant="primary" class="btn-posit" type="submit"
				>ارسال</b-button
			>
		</b-form> -->
	</div>
</template>

<script>
import Review from "./Review"
import { mapState } from "vuex"
import shared from "../shared"

export default {
	components: {
		Review
	},
	data() {
		return {
			// form: {
			// 	name: "",
			// 	email: ""
			// },
			text: "",
			currentPage: 1,
			ShowNoCOM: "",
			ShowPagi: "",
			reviews: "",
			totalReviews: ""
		}
	},
	props: {
		building: Number,
		sub_url: String,
		empty1: String,
		empty2: String
	},
	computed: mapState({
		refresh: (state) => state.tokenModel.refresh,
		username: (state) => state.tokenModel.username
	}),
	methods: {
		formSumbit() {
			shared
				.sendReviewRating({
					review: this.text,
					building: this.building,
					sub_url: this.sub_url,
					id: "",
					method: "POST"
				})
				.then(() => {
					this.fetchReview()
				})
			this.text = ""
		},
		fetchReview() {
			// to avoid mutating the prop directly.
			var temp_url = this.sub_url
			// news need an id in the url, cos the url for all news cards is similar.
			// putting the id just here to delete and change it correctly.

			// a bug cos I am having building__id twice if news.
			if (this.sub_url === "news_reviews") {
				temp_url = temp_url.concat(`?building__id=${this.building}&`)
			}
			shared
				.fetchData(
					temp_url.concat(`?building__id=${this.building}&page=${this.currentPage}&page_size=5`)
				)
				.then((res) => {
					this.reviews = res.results
					this.totalReviews = res.count
					// at first both of them is false.
					// if there is a comment the shownocom will be false.
					this.ShowNoCOM = !res.count
					this.ShowPagi = res.count
				})
		}
	},

	mounted() {
		this.fetchReview()
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
