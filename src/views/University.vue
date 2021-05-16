<template>
	<b-container fluid v-if="soruce">
		<div align="right">
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
							<b-link v-b-toggle.collapse-3 @click="showCollages = !showCollages">
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
												:to="'/collage/' + soruce.name + '/' + collages[n - 1].name"
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

				<b-col align-self="start" sm="12" md="5" lg="4" xl="3" class="border ml-1 side-box-color">
					<Table
						:soruce="soruce"
						:sideTableContent="sideTableContent"
						:sideTableTitle="sideTableTitle"
						:sub_url="'university_ratings?building__id=' + soruce.id"
						:img="true"
					/>
				</b-col>
			</b-form-row>
			<h6 class="mt-2">مراجعات {{ soruce.name }}</h6>
			<hr class="col-md-3 col-sm-3 col-6" align="right" />
			<ReviewParent
				class="col-md-6 mt-2"
				:building="soruce.id"
				sub_url="university_reviews"
				empty1="مراجعات"
				empty2="المراجعين"
			/>
		</div>
	</b-container>
	<div class="mt-5 d-flex justify-content-center" v-else>
		<b-spinner style="width: 5rem; height: 5rem;" variant="primary"></b-spinner>
	</div>
</template>

<script>
import shared from "../shared"
import ReviewParent from "../components/Reviews/ReviewParent"
import Table from "../components/Table"
export default {
	components: {
		ReviewParent,
		Table
	},
	data() {
		return {
			sideTableTitle: ["المحافظة", "الرئيس", "عدد الكليات", "عدد الطلاب"],
			sideTableContent: [],
			showCollages: true,
			collages: [],
			soruce: ""
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
	methods: {
		fetchData() {
			shared.fetchData("universities/" + this.$route.params.id).then((res) => {
				this.soruce = res
				this.sideTableContent = [res.province, res.president, res.collages_num, res.students_num]
				shared
					.fetchData(
						`collages?university__name=${this.soruce.name}&page_size=${this.soruce.collages_num}`
					)
					.then((res) => {
						this.collages = res.results
					})
			})
		}
	},
	mounted() {
		this.fetchData()
	}
}
</script>
<style lang="scss" scoped>
.side-box-color {
	background-color: rgb(253, 253, 253);
}
.linkColor:hover {
	color: rgb(187, 48, 48);
}
</style>
