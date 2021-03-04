<template>
	<b-container fluid v-if="soruce">
		<div v-if="name === 'universities'" align="right">
			<h4 class="mt-2">
				{{ soruce.name }}
			</h4>

			<hr />
			<!-- using b-form-row cos it has less margin -->
			<b-form-row>
				<b-col align-self="stretch">
					<VueShowdown :markdown="soruce.description" flavor="github" />

					<h5 class="mr-2">
						كليات {{ soruce.name }}
						<small>
							<b-link
								v-b-toggle.collapse-3
								@click="showCollages = !showCollages"
							>
								[{{ showLink }}]</b-link
							>
						</small>
					</h5>

					<hr class="col-md-3 col-sm-3 col-6 mr-2" />

					<b-form-row v-if="!(collages.length === 0)">
						<b-collapse visible appear id="collapse-3">
							<b-card class="border-0">
								<b-col class="mr-2">
									<ul v-for="n in soruce.collages_num" :key="n">
										<li>
											<!-- i could use state to pass url and not this  -->
											<b-link
												:to="
													'/university/collage/' +
														soruce.name +
														'/' +
														collages[n - 1].name
												"
												class="linkColor"
												>{{ collages[n - 1].name }}</b-link
											>
										</li>
									</ul>
								</b-col>
							</b-card>
						</b-collapse>
					</b-form-row>
				</b-col>

				<b-col
					align-self="start"
					md="4"
					lg="4"
					xl="3"
					class="border ml-1 side-box-color"
				>
					<h5 class="text-center text-white border pb-2 pt-1 box-top-bgc">
						<font-awesome-icon icon="university" />
						{{ soruce.name }}
					</h5>
					<b-img
						center
						:src="soruce.logo"
						:alt="soruce.name"
						height="150"
					></b-img>
					<!-- could mix id with sub_url -->
					<Rating
						class="text-center"
						:id="soruce.id"
						:arb_name="soruce.name"
						building="university"
						sub_url="university_ratings?building__id="
					/>
					<!-- remember to adjust the font of the table -->
					<b-table-simple responsive striped hover>
						<b-tbody class="text-right">
							<b-tr>
								<b-th>التأسيس</b-th>
								<b-td>{{ soruce.establishment }}</b-td>
							</b-tr>
							<b-tr>
								<b-th>البلد </b-th>
								<b-td>
									<b-img
										class="img"
										right
										src="https://iraqistudent.s3.us-east-2.amazonaws.com/images/03/04/21/iraq-flag-xs.jpg"
										height="20"
									></b-img
									><span class="pr-1">{{ soruce.country }}</span>
								</b-td>
							</b-tr>
							<b-tr v-for="n in 4" :key="n">
								<b-th>{{ sideTableTitle[n - 1] }}</b-th>
								<b-td>{{ sideTableContent[n - 1] }}</b-td>
							</b-tr>

							<b-tr>
								<b-th>الموقع</b-th>
								<b-td><a :href="soruce.website">اضغط هنا</a></b-td>
							</b-tr>
						</b-tbody>
					</b-table-simple>
				</b-col>
			</b-form-row>
			<h6 class="mt-2">مراجعات {{ soruce.name }}</h6>
			<hr class="col-md-3 col-sm-3 col-6" align="right" />
			<Review
				class="col-md-6 mt-2"
				:building="soruce.id"
				sub_url="university_reviews"
				empty1="مراجعات"
				empty2="المراجعين"
			/>
		</div>

		<div v-if="name === 'news'" align="right">
			<h5 class="text-center mb-3 mt-3">{{ soruce.card_text }}</h5>
			<b-container fluid="sm">
				<VueShowdown :markdown="soruce.description" flavor="github"/>
				<h6 class="mt-2">التعليقات:</h6>
				<hr class="col-md-3 col-sm-3 col-6" align="right"/>
				<Review
					class="col-md-8 mt-4"
					:building="soruce.id"
					sub_url="news_reviews"
					empty1="تعليقات"
					empty2="المعلقين"
			/></b-container>
		</div>
	</b-container>
	<div class="mt-5 d-flex justify-content-center" v-else>
		<b-spinner style="width: 5rem; height: 5rem;" variant="primary"></b-spinner>
	</div>
</template>

<script>
// <router-view :key="$route.fullPath" />
import shared from "../shared"
import Rating from "../components/Rating"
import Review from "../components/Review.vue"

export default {
	components: {
		Rating,
		Review
	},
	data() {
		return {
			sideTableTitle: ["المحافظة", "الرئيس", "عدد الكليات", "عدد الطلاب"],
			sideTableContent: [],
			showCollages: true,
			collages: [],
			soruce: "",
			name: ""
		}
	},
	computed: {
		showLink: function() {
			if (this.showCollages === true) {
				return "اخف"
			} else {
				return "أظهر"
			}
		}
	},
	mounted() {
		;(this.name = this.$route.params.name),
			shared.fetchData(this.name + "/" + this.$route.params.id).then((res) => {
				this.soruce = res

				this.sideTableContent = [
					res.province,
					res.president,
					res.collages_num,
					res.students_num
				]
				if (this.name !== "news") {
					shared
						.fetchData(
							`collages?university__name=${this.soruce.name}&page_size=${this.soruce.collages_num}`
						)
						.then((res) => {
							this.collages = res.results
						})
				}
			})
	}
}
</script>
<style lang="scss">
.side-box-color {
	background-color: rgb(253, 253, 253);
}
.img {
	position: relative;
	top: 5px;
}
.box-top-bgc {
	background-color: rgb(224, 134, 134);
}
.linkColor:hover {
	color: rgb(187, 48, 48);
}
</style>
