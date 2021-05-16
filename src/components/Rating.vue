<template>
	<div>
		<div>
			<strong>{{ ave_rating }}</strong>
		</div>

		<div @click="handleShowModal">
			<b-form-rating
				id="popover"
				locale="ar-EG"
				class="col-12 rating"
				:value="ave_rating"
				readonly
				variant="warning"
				inline
				no-border
			></b-form-rating>
		</div>
		<div>
			<p class="rating-font">
				للتقييم اضغط على النجوم!
			</p>
		</div>
		<b-popover target="popover" placement="topleft" variant="info" v-if="!refresh">
			يرجىء
			<b-button variant="outline-primary" size="sm" to="/login">تسجل الدخول</b-button>
			أولا
		</b-popover>

		<b-modal
			v-model="modalShow"
			centered
			title="التقييم"
			no-close-on-backdrop
			hide-header
			hide-footer
		>
			<b-form-row>
				<b-col cols="12">
					<p class="my-4 text-right">
						لتقييم <strong>{{ this.arb_name }}</strong> أظغط على احد النجوم!
					</p></b-col
				>
				<b-col cols="12" align="center">
					<b-form-rating
						locale="ar-EG"
						v-model="rate"
						variant="warning"
						icon-clear="x-circle"
						class="stars"
						show-clear
						inline
						no-border
					></b-form-rating
				></b-col>
				<b-col cols="6" align="left">
					<b-spinner v-if="loading" variant="success"></b-spinner>
				</b-col>
				<b-col cols="6" class="mb-1">
					<b-button
						size="sm"
						:disabled="rate === null"
						class="ml-2"
						variant="success"
						@click="giveRating"
					>
						ارسال
					</b-button>
					<b-button size="sm" variant="danger" @click=";(modalShow = false), (rate = 0)">
						ألغاء
					</b-button>
				</b-col></b-form-row
			>
		</b-modal>
	</div>
</template>

<script>
import { mapState } from "vuex"
import shared from "../shared"

export default {
	data() {
		return {
			ave_rating: 0,
			rate: null,
			modalShow: false,
			loading: false
		}
	},
	props: {
		sub_url: String,
		arb_name: String,
		building: Number
	},
	computed: mapState({
		refresh: (state) => state.tokenModel.refresh
	}),
	methods: {
		fetchAveRating() {
			shared.fetchData(`${this.sub_url}&page_size=1`).then((res) => {
				// in case no results comes back.
				if (res.count) {
					this.ave_rating = res.results[0].ave_rating
				} else {
					this.ave_rating = 0
				}
			})
		},

		giveRating() {
			this.loading = true
			// same id in id and building.
			// when the refresh token expire there may be an error.
			shared
				.sendReviewRating({
					rating: this.rate,
					building: this.building,
					sub_url: this.sub_url,
					method: "POST"
				})
				.then((data) => {
					this.modalShow = false
					this.ave_rating = data.ave_rating
					this.rate = null
					this.fetchAveRating()
					this.loading = false
				})
				.catch((err) => {
					console.log(err)
				})
		},
		handleShowModal() {
			if (this.refresh != false) {
				this.modalShow = true
			}
		}
	},
	mounted() {
		this.fetchAveRating()
	}
}
</script>

<style lang="scss" scoped>
::v-deep .form-control:focus {
	box-shadow: none;
}
.stars {
	font-size: 2rem;
}
.rating-font {
	font-size: 10px;
}
.rating {
	cursor: pointer;
}
</style>
