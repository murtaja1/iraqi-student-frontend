<template
	><div>
		<!-- to not show them till the data comes -->
		<b-container v-if="data.length > 0">
			<div v-for="n in data.length" :key="n" class="mb-4">
				<h2 :align="name === 'home' ? 'right' : 'center'" class="mt-2">
					{{ title[n - 1] }}
				</h2>
				<hr class="col-sm-7 col-md-8 col-lg-9 hr-title" />

				<b-card-group class="mt-2">
					<div v-for="card in data[n - 1]" :key="card.id" class="col-sm-6 col-lg-4 mb-4">
						<b-card align="right" class="border-0 card-scale" no-body>
							<b-link :to="homeDetail[n - 1] + '/' + card.id" class="text-dark desc">
								<b-card-img
									:src="card.card_image"
									class="rounded mb-3 blur"
									height="170"
									no-body
									img-top
									:alt="card.image"
								/>

								<!-- university has a name but news does not. -->
								<b-card-text class="desc" v-if="!card.name">
									<h5 class="card-title">{{ card.card_text }}</h5>
								</b-card-text>
								<!-- else -->
								<b-card-text class="desc" v-else>
									<h5 class="card-title">{{ card.name }}</h5>
									{{ card.card_text }}
								</b-card-text>
							</b-link>

							<small class="text-muted">
								<hr class="col-4 hr-time" />
								<b-icon icon="clock" variant="dark"></b-icon>
								{{ getDate(card.last_updated) }}
							</small>
						</b-card>
					</div>
				</b-card-group>
			</div>
		</b-container>
		<div class="mt-5 d-flex justify-content-center" v-if="loading">
			<b-spinner class="spinner" type="grow" variant="primary"></b-spinner>
		</div>
		<Pagination
			:show="name !== 'home' && data.length > 0"
			:totalRows="totalRows"
			:currentPage="currentPage"
			:fetchData="fetchData"
		/>
	</div>
</template>

<script>
import helper from "../helper"
import Pagination from "../components/Pagination"

export default {
	data() {
		return {
			currentPage: 1,
			loading: false,
			// for homeDetail url, it's just like title but english.
			homeDetail: [],
			data: [],
			totalRows: 0
		}
	},
	components: {
		Pagination
	},
	props: {
		name: String,
		title: Array
	},

	watch: {
		// get called whenever the route changes in the same component.
		$route() {
			this.fetchData()
		}
	},
	methods: {
		fetchData(page) {
			this.loading = true
			this.data = []
			if (this.name !== "home") {
				this.currentPage = page
				helper.fetchData(this.name + `?page=${this.currentPage}&page_size=6`).then((res) => {
					this.homeDetail = [this.name]
					this.data.push(res.results)
					this.totalRows = res.count
					this.loading = false
				})
			} else {
				this.homeDetail = ["news", "universities"]
				// not using loop cos sometimes university get called before news
				helper.fetchData(this.homeDetail[0] + "?page=1&page_size=6").then((res) => {
					this.data.push(res.results)
					helper.fetchData(this.homeDetail[1] + "?page=1&page_size=6").then((res) => {
						this.data.push(res.results)
						this.loading = false
					})
				})
			}
		},

		getDate(last_updated) {
			return helper.getArabDate(last_updated)
		}
	}
}
</script>

<style lang="scss" scoped>
.spinner {
	width: 3rem;
	height: 3rem;
}
@media only screen and (min-width: 600px) {
	.card-scale:hover {
		transform: scale(1.02);
	}
	.blur:hover {
		filter: opacity(80%);
	}
}
@media only screen and (max-width: 600px) {
	.hr-title {
		width: 60%;
	}
}
.desc:hover {
	color: rgb(187, 48, 48);
	text-decoration: none;
}
.hr-time {
	position: relative;
	left: 27%;
}
</style>
