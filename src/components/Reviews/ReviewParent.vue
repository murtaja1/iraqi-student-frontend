<template>
	<div>
		<div v-if="!loading">
			<ReviewChild
				v-for="review in reviews"
				:key="review.id"
				:review="review"
				:sub_url="sub_url"
				:currentPage="currentPage"
				:fetchReview="fetchReview"
			/>
		</div>
		<div align="center">
			<b-spinner v-if="loading" type="grow" label="Loading..." variant="primary"></b-spinner>
		</div>
		<Pagination
			:show="show"
			:totalRows="totalReviews"
			:currentPage="currentPage"
			:fetchData="fetchReview"
		/>
		<div v-if="ShowNoCOM" align="center" class="text-danger">
			لا {{ empty1 }} حتى الان! <br /><span class="no-com">(كون اول {{ empty2 }})</span>
		</div>
		<ReviewForm :fetchReview="fetchReview" :sub_url="sub_url" :building="building" />
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
import ReviewChild from "./ReviewChild"
import { mapState } from "vuex"
import shared from "../../shared"
import Pagination from "../Pagination"
import ReviewForm from "./ReviewForm"
export default {
	components: {
		ReviewChild,
		Pagination,
		ReviewForm
	},
	data() {
		return {
			// form: {
			// 	name: "",
			// 	email: ""
			// },
			loading: false,
			text: "",
			currentPage: 1,
			ShowNoCOM: "",
			show: false,
			reviews: "",
			totalReviews: 0
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
		fetchReview(page) {
			this.loading = true
			// so the watch in pagin gets called
			this.currentPage = page
			shared
				.fetchData(`${this.sub_url}?building__id=${this.building}&page=${page}&page_size=6`)
				.then((res) => {
					this.reviews = res.results
					this.totalReviews = res.count
					// at first both of them is false.
					this.ShowNoCOM = res.count === 0
					this.show = res.count > 0
					this.loading = false
				})
		}
	}
}
</script>

<style lang="scss" scoped>
.btn-posit {
	float: left;
}
.no-com {
	font-size: 10px;
}
</style>
