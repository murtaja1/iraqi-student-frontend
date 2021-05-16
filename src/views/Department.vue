<template>
	<b-container align="right" fluid v-if="soruce !== ''">
		<h3 class="mt-2">{{ soruce.name }}</h3>
		<hr class="col-sm-4 col-md-2 col-xl-2 col-6" align="right" />
		<b-container fluid-md class="col-md-8">
			<VueShowdown :markdown="soruce.description" flavor="github" />
		</b-container>
		<h6>معلومات اضافية حول القسم:</h6>
		<hr class="col-sm-4 col-md-2 col-xl-2 col-6" align="right" />
		<Rating
			class="text-center"
			:id="soruce.id"
			:arb_name="soruce.name"
			sub_url="department_ratings?building__id="
		/>
		<!-- to add border and center the col -->
		<b-row align-h="center" no-gutters>
			<b-col class="col-md-8">
				<div class="border">
					<b-table-simple responsive striped hover fixed>
						<b-tbody>
							<b-tr>
								<b-th>التأسيس</b-th>
								<b-td>{{ soruce.establishment }}</b-td>
							</b-tr>
							<b-tr>
								<b-th>الجامعة</b-th>
								<b-td>{{ $route.params.university }}</b-td>
							</b-tr>
							<b-tr>
								<b-th>التعيين</b-th>
								<!-- cos arbic it is on the opposite -->
								<b-td>{{ soruce.central_designation === true ? "مركزي" : "ليس مركزي" }}</b-td>
							</b-tr>

							<b-tr v-for="n in 3" :key="n">
								<b-th>{{ booleanFieldTitle[n - 1] }}</b-th>
								<b-td>{{ soruce[booleanFieldContent[n - 1]] === true ? "موجود" : "لا يوجد" }}</b-td>
							</b-tr>

							<b-tr>
								<b-th>الحدود الدنيا</b-th>
								<b-td>
									السنة <b-icon icon="arrow-left-circle"></b-icon> المعدل<br />

									<span v-for="y in years" :key="y"
										>{{ y }} <b-icon icon="arrow-left-circle"></b-icon> {{ soruce.sum[y] }} <br />
									</span>
								</b-td>
							</b-tr>

							<b-tr v-for="n in 8" :key="title[n - 1]">
								<b-th>{{ title[n - 1] }}</b-th>
								<b-td>{{ soruce[content[n - 1]] }}</b-td>
							</b-tr>

							<b-tr>
								<b-th>جامعات أخرا تحتوي هذا القسم</b-th>
								<b-td>
									<span v-for="(u, index) in soruce.other_universities" :key="u"
										><b-link :to="`/universities/${universityId[index]}`">
											{{ u }}
										</b-link></span
									>
								</b-td>
							</b-tr>

							<b-tr>
								<b-th>الراتب الشهري</b-th>
								<b-td>{{ soruce.salary_pm }} الف دينار عراقي</b-td>
							</b-tr>
							<b-tr>
								<b-th>الموقع</b-th>
								<b-td><b-link :href="soruce.website">أظغط هنا </b-link></b-td>
							</b-tr>
						</b-tbody>
					</b-table-simple>
				</div>
				<h6 class="mt-4">مراجعات {{ soruce.name }}</h6>
				<hr class="col-md-3 col-sm-3 col-6" align="right" />
				<ReviewParent
					class="mt-2"
					:building="soruce.id"
					sub_url="department_reviews"
					empty1="مراجعات"
					empty2="المراجعين"
				/>
			</b-col>
		</b-row>
	</b-container>
	<div class="mt-5 d-flex justify-content-center" v-else>
		<b-spinner style="width: 5rem; height: 5rem;" variant="primary"></b-spinner>
	</div>
</template>

<script>
import Rating from "../components/Rating"
import ReviewParent from "../components/Reviews/ReviewParent"
import shared from "../shared"

export default {
	components: { Rating, ReviewParent },
	data() {
		return {
			universityId: [],
			booleanFieldTitle: ["دراسة عليا", "دراسة مسائية", "دراسة اهلية"],
			booleanFieldContent: ["higher_educ", "evening_study", "private_study"],
			title: [
				"عدد الطلاب",
				"شهادة التخرج",
				"نظام دراسة",
				"عدد سنوات الدراسة",
				"مكان العمل",
				"العنوان الوضيفي",
				"الفرع المقبول",
				"لغة الدراسة"
			],
			content: [
				"students_num",
				"certi_of_gradu",
				"study_system",
				"years_of_study",
				"place_of_work",
				"job_title",
				"accepted_branch",
				"language_of_study"
			],
			years: ["2020", "2019", "2018", "2017", "2016"],
			soruce: ""
		}
	},
	methods: {
		fetchData() {
			const url = this.$route.params
			shared
				.fetchData(
					`department?collage__university__university_name=${url.university}
    &collage_name=${url.collage}&name=${url.department}`
				)
				.then((res) => {
					this.soruce = res.results[0]

					for (let u in res.results[0].other_universities) {
						shared
							.fetchData(`universityid?name=${this.soruce.other_universities[u]}`)
							.then((res) => {
								this.universityId.push(res.results[0].id)
							})
					}
				})
		}
	},
	mounted() {
		this.fetchData()
	}
}
</script>
