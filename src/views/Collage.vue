<template>
	<b-container align="right" fluid v-if="soruce">
		<h4 class="mt-2">
			{{ soruce.name }} <small>({{ $route.params.university }})</small>
		</h4>
		<hr />

		<b-form-row>
			<b-col align-self="stretch" md="7" lg="8" xl="9">
				<VueShowdown :markdown="soruce.description" flavor="github" />
				<h6 class="mr-2">
					الحدود الدنيا لاقسام {{ soruce.name }}
					<small>
						<b-link v-b-toggle.collapse-3 @click="showCollages = !showCollages">
							[{{ showLink }}]</b-link
						>
					</small>
				</h6>

				<hr class="col-sm-5 col-lg-4 col-xl-3 col-8 mr-2" align="right" />
				<b-collapse visible appear id="collapse-3" class="border">
					<b-table-simple responsive striped hover v-if="departments.length">
						<b-thead>
							<b-tr>
								<b-th>{{ soruce.name }}</b-th>
								<b-th class="text-center" variant="secondary" colspan="5">الحدود الدنيا لسنة</b-th>
							</b-tr>
							<b-tr>
								<b-th>القسم</b-th>
								<b-th v-for="n in years" :key="n"> {{ n }}</b-th>
							</b-tr>
						</b-thead>
						<b-tbody>
							<b-tr v-for="n in soruce.departments_num" :key="n">
								<b-th
									><b-link
										class="linkColor department"
										:to="
											'/department/' +
												$route.params.university +
												'/' +
												soruce.name +
												'/' +
												departments[n - 1].name
										"
										>{{ departments[n - 1].name }}</b-link
									></b-th
								>
								<b-td v-for="i in years" :key="i">{{ departments[n - 1].sum[i] }} </b-td>
							</b-tr>
						</b-tbody>
					</b-table-simple>
					<p class="mr-5" v-else>
						ألحدود الدنيا لهذه الكلية غير متوفر حاليا!
					</p>
				</b-collapse>
			</b-col>

			<b-col sm="12" md="5" lg="4" xl="3" class="border mt-2 mb-2">
				<Table
					:soruce="soruce"
					:sideTableContent="sideTableContent"
					:sideTableTitle="sideTableTitle"
					:sub_url="'collage_ratings?building__id=' + soruce.id"
					:img="false"
				/>
			</b-col>
			<b-col sm="12" lg="6">
				<h6 class="mt-2">مراجعات {{ soruce.name }}</h6>
				<hr class="col-md-3 col-sm-3 col-6" align="right"/>
				<ReviewParent
					:building="soruce.id"
					sub_url="collage_reviews"
					empty1="مراجعات"
					empty2="المراجعين"
			/></b-col>
		</b-form-row>
	</b-container>
	<div class="mt-5 d-flex justify-content-center" v-else>
		<b-spinner class="spinner" variant="primary"></b-spinner>
	</div>
</template>

<script>
import shared from "@/shared"
import ReviewParent from "../components/Reviews/ReviewParent"
import Table from "../components/Table"

export default {
	components: {
		Table,
		ReviewParent
	},
	data() {
		return {
			sideTableTitle: ["عدد الطلاب", "عدد الاقسام"],
			sideTableContent: [],
			showCollages: true,
			soruce: "",
			departments: "",
			years: ["2020", "2019", "2018", "2017", "2016"]
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
		const url = this.$route.params
		shared
			.fetchData(`collagesdetail?university__name=${url.university}&name=${url.collage}`)
			.then((res) => {
				this.soruce = res.results[0]

				this.sideTableContent = [this.soruce.students_num, this.soruce.departments_num]
				shared
					.fetchData(
						`department_sum?collage__name=${url.collage}&collage__university__name=${url.university}&page_size=${this.soruce.departments_num}`
					)
					.then((res) => {
						this.departments = res.results
					})
			})
	}
}
</script>
<style lang="scss" scoped>
.spinner {
	width: 5rem;
	height: 5rem;
}
.department {
	white-space: nowrap;
}
.box-top-bgc {
	background-color: rgb(224, 134, 134);
}
</style>
