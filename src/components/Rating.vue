<template>
	<div>
		<div>
			<strong>{{ ave_rating }}</strong>
		</div>
		<!-- maybe put this one below with it children -->
		<b-form-rating
			v-if="refresh !== false"
			v-b-modal.modal-center
			class="rating-posit rating-rotate col-12"
			:value="ave_rating"
			readonly
			variant="warning"
			inline
			no-border
		></b-form-rating>

		<b-form-rating
			v-else
			id="popover"
			locale="ar-EG"
			class="rating-posit col-12"
			:value="ave_rating"
			readonly
			variant="warning"
			inline
			no-border
		></b-form-rating>

		<b-popover
			target="popover"
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

		<b-modal id="modal-center" centered title="التقييم" hide-header>
			<p class="my-4 text-right">
				لتقييم <strong>{{ this.arb_name }}</strong> أظغط على احد النجوم!
			</p>
			<b-form-rating
				class="col-4 give-rating-posit"
				locale="ar-EG"
				v-model="rate"
				variant="warning"
				icon-clear="x-circle"
				style="font-size: 2rem;"
				show-clear
				inline
				no-border
			></b-form-rating>
			<template #modal-footer="{ ok, cancel }">
				<b-button
					size="sm"
					:disabled="rate === null"
					class="btn-posit ml-0"
					variant="success"
					@click="ok(), giveRating()"
				>
					ارسال
				</b-button>
				<b-button
					size="sm"
					class="btn-posit"
					variant="danger"
					@click="cancel()"
				>
					ألغاء
				</b-button>
			</template>
		</b-modal>
		<div>
			<p class="rating-font">
				للتقييم اضغط على النجوم!
			</p>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex"
import shared from "../shared"
export default {
	data() {
		return {
			ave_rating: null,
			rate: null
		}
	},
	props: {
		id: Number,
		sub_url: String,
		arb_name: String
	},
	computed: mapState({
		refresh: (state) => state.tokenModel.refresh,
		username: (state) => state.tokenModel.username,
		url: (state) => state.tokenModel.url
	}),
	methods: {
		fetchAveRating() {
			shared.fetchData(`${this.sub_url + this.id}&page_size=1`).then((res) => {
				// in case no results comes back.
				if (res.results.length) {
					this.ave_rating = res.results[0].ave_rating
				} else {
					this.ave_rating = 0
				}
			})
		},

		giveRating() {
			// same id in id and building.
			// when the refresh token expire there may be an error.
			shared
				.sendReviewRating({
					rating: this.rate,
					building: this.id,
					sub_url: this.sub_url,
					id: this.id,
					method: "POST"
				})
				.then((data) => {
					this.ave_rating = data.ave_rating
					this.rate = 0
				})
				.catch((err) => {
					console.log(err)
				})
			this.fetchAveRating()
		}
	},
	mounted() {
		this.fetchAveRating()
	}
}
</script>

<style lang="scss" scoped>
.give-rating-posit {
	position: relative;
	left: 220px;
	// transform: rotateY(180deg);
}
.rating-rotate {
	transform: rotateY(180deg);
}
.rating-font {
	font-size: 10px;
}

.val-posit {
	position: relative;
	right: 125px;
}
</style>
