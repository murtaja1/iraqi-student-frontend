<template>
	<div class="text-right mb-5 mt-0">
		<!-- let one edit text appear! -->
		<!-- username is used to control dots appearance -->
		<div class="border mt-2" v-for="(item, index) in soruce" :key="item.id">
			<b-icon
				v-if="(username === item.username) & !edit[edits[index]]"
				@click="dot_info[dots_info[index]] = !dot_info[dots_info[index]]"
				icon="three-dots-vertical"
				class="dots-posit"
			></b-icon>

			<b-button-group
				vertical
				@click="edit_text = item.review"
				v-if="dot_info[dots_info[index]] & !edit[edits[index]]"
				class="dots-posit"
			>
				<b-button
					size="sm"
					variant="info"
					@click="edit[edits[index]] = !edit[edits[index]]"
					>تعديل</b-button
				>
				<b-button
					size="sm"
					variant="danger"
					@click="deleteRview((comment_id = `/${item.id}/`))"
					>حذف</b-button
				>
			</b-button-group>
			<!-- <b-icon icon="file-earmark-person"></b-icon> -->
			<h6>
				<b-avatar size="sm"></b-avatar>
				{{ item.username }}
			</h6>
			<hr class="col-2 mr-2 mt-0 mb-0" />

			<p class="mr-2 mt-0" v-if="!edit[edits[index]]">
				{{ item.review }}
			</p>

			<b-form v-if="edit[edits[index]]" @submit.prevent="formSumbit">
				<b-form-textarea
					class="mt-1"
					id="textarea"
					v-model="edit_text"
					rows="2"
				></b-form-textarea>
				<!-- remembering the comment id -->
				<b-button
					variant="primary"
					:disabled="edit_text === ''"
					@click=";(method = 'PUT'), (comment_id = `/${item.id}/`)"
					class="btn-posit"
					type="submit"
					size="sm"
					>تعديل</b-button
				>
				<b-button
					variant="danger"
					@click="
						;(edit[edits[index]] = !edit[edits[index]]),
							(dot_info[dots_info[index]] = !dot_info[dots_info[index]])
					"
					class="btn-posit"
					size="sm"
					>ألغاء</b-button
				>
			</b-form>
		</div>
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
			لا {{ empty1 }} حتى الان! <br /><span class="no-com"
				>(كون اول {{ empty2 }})</span
			>
		</div>

		<b-form @submit.prevent="formSumbit">
			<label for="textarea"
				>أترك مراجعة:
				<!-- <strong> {{ arb_name }}:</strong> -->
			</label>
			<b-form-textarea
				class=" mb-1"
				id="textarea"
				v-model="text"
				placeholder="اكتب ..."
				rows="2"
			></b-form-textarea>
			<b-popover
				target="textarea"
				placement="topleft"
				variant="info"
				v-if="!refresh"
			>
				يرجىء
				<b-button variant="outline-primary" size="sm" to="/login"
					>تسجل الدخول</b-button
				>
				أولا
			</b-popover>

			<b-button
				variant="primary"
				v-if="refresh"
				:disabled="text === ''"
				class="btn-posit"
				type="submit"
				>ارسال</b-button
			>
		</b-form>
		<b-form v-if="!refresh" @submit.prevent="formSumbit">
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
		</b-form>
	</div>
</template>

<script>
import { mapState } from "vuex"
import shared from "../shared"

export default {
	data() {
		return {
			form: {
				name: "",
				email: ""
			},
			currentPage: 1,
			text: "",
			edit_text: "",
			ShowNoCOM: "",
			ShowPagi: "",
			dots_info: [
				"dot_info1",
				"dot_info2",
				"dot_info3",
				"dot_info4",
				"dot_info5"
			],
			edits: ["edit1", "edit2", "edit3", "edit4", "edit5"],
			dot_info: {
				dot_info1: false,
				dot_info2: false,
				dot_info3: false,
				dot_info4: false,
				dot_info5: false
			},
			edit: {
				edit1: false,
				edit2: false,
				edit3: false,
				edit4: false,
				edit5: false
			},
			method: "POST",
			comment_id: "",
			soruce: "",
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
					temp_url.concat(
						`?building__id=${this.building}&page=${this.currentPage}&page_size=5`
					)
				)
				.then((res) => {
					this.soruce = res.results
					this.totalReviews = res.count
					// at first both of them is false.
					// if there is a comment the shownocom will be false.
					this.ShowNoCOM = !res.count
					this.ShowPagi = res.count
				})
		},
		deleteRview() {
			shared
				.sendReviewRating({
					sub_url: this.sub_url,
					comment_id: this.comment_id,
					method: "DELETE"
				})
				.then(() => {
					// if one comment in a page and the comment gets deleted.
					// the entire page will be deleted, so it will throw an error('404' not found).
					// but still a problem here!
					this.currentPage = 1
					this.fetchReview()
				})
			// cos the one after the deleted item will appear
			for (let i = 0; i < 5; i++) {
				this.edit[this.edits[i]] = false
				this.dot_info[this.dots_info[i]] = false
			}
		},
		formSumbit() {
			if (this.method === "PUT") {
				shared
					.sendReviewRating({
						review: this.edit_text,
						building: this.building,
						sub_url: this.sub_url,
						id: this.comment_id,
						method: this.method
					})
					.then(() => {
						this.fetchReview()
					})
			}
			// post request
			else {
				shared
					.sendReviewRating({
						review: this.text,
						// user: res.results[0].id,
						building: this.building,
						sub_url: this.sub_url,
						id: "",
						method: this.method
					})
					.then(() => {
						this.fetchReview()
					})
			}
			for (let i = 0; i < 5; i++) {
				this.edit[this.edits[i]] = false
				this.dot_info[this.dots_info[i]] = false
			}
			this.text = ""
		}
	},

	mounted() {
		this.fetchReview()
		// this.ShowCount = this.soruce
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
