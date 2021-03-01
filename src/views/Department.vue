<template>
	<b-container align="right" fluid v-if="soruce !== ''">
		<h3 class="mt-2">هندسة الحاسبات</h3>
		<hr />
		<b-container fluid-md class="col-md-8">
			<VueShowdown :markdown="soruce.description" flavor="github" />
		</b-container>

		<!-- <h6 v-b-toggle.collapse-3 @click="showCollages = !showCollages">
      <b-icon :icon="showLink[1]"></b-icon>
      منهاج هندسة الحاسبات
      <small>
        <b-link> اظغط {{ showLink[0] }} المنهاج </b-link>
      </small>
    </h6>

    <hr class="col-sm-4 col-md-2 col-xl-2 col-8" align="right" />
    <b-collapse id="collapse-3" class="mb-2">
      <b-form-row>
        <b-col order="1" class="col-md-4 col-12 mb-2" v-for="n in 6" :key="n">
          <b-list-group>
            <b-list-group-item
              v-for="i in 5"
              :key="i"
              :variant="varints[i - 1]"
            >
              {{ n }}باسم مدرسة الحقوق</b-list-group-item
            >
          </b-list-group>
        </b-col>
      </b-form-row>
    </b-collapse> -->

		<h6>معلومات اضافية حول القسم:</h6>
		<hr class="col-sm-4 col-md-2 col-xl-2 col-6" align="right" />
		<rating
			class="text-center"
			:id="soruce.id"
			:arb_name="soruce.name"
			sub_url="department_ratings?building__id="
		/>
		<!-- to add border and center the col -->
		<!-- <b-collapse visible appear> -->
		<b-row align-h="center" no-gutters>
			<b-col class="col-md-8">
				<div class="border">
					<!-- Fixed: Makes all columns equal width (fixed layout table) -->
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
								<b-td v-if="soruce.central_designation === false"
									>ليس مركزي</b-td
								>
								<b-td v-if="soruce.central_designation === true">مركزي</b-td>
							</b-tr>

							<b-tr v-for="n in 3" :key="n">
								<b-th>{{ booleanFieldTitle[n - 1] }}</b-th>
								<b-td v-if="soruce[booleanFieldContent[n - 1]] === false"
									>لا يوجد</b-td
								>
								<b-td v-if="soruce[booleanFieldContent[n - 1]] === true"
									>موجود</b-td
								>
							</b-tr>

							<b-tr>
								<b-th>الحدود الدنيا</b-th>
								<b-td>
									السنة <b-icon icon="arrow-left-circle"></b-icon> المعدل<br />

									<span v-for="y in years" :key="y"
										>{{ y }} <b-icon icon="arrow-left-circle"></b-icon>
										{{ soruce.sum[y] }} <br />
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
										><b-link
											:to="`/detail/universities/${universityId[index]}`"
										>
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
				<Review
					class="mt-2"
					:building="soruce.id"
					sub_url="department_reviews"
					empty1="مراجعات"
					empty2="المراجعين"
				/>
			</b-col>
		</b-row>

		<!-- </b-collapse> -->
	</b-container>
</template>

<script>
import rating from "../components/Rating.vue"
import Review from "../components/Review.vue"
import shared from "../shared"

export default {
	components: { rating, Review },
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
			showCollages: false,
			varints: ["info", "light", "light", "light", "light"],
			soruce: ""
		}
	},
	mounted() {
		const n = this.$route.params
		shared
			.fetchData(
				`department?collage__university__university_name=${n.university}
    &collage_name=${n.collage}&name=${n.department}`
			)
			.then((res) => {
				this.soruce = res.results[0]

				for (let u in this.soruce.other_universities) {
					shared
						.fetchData(`universityid?name=${this.soruce.other_universities[u]}`)
						.then((res) => {
							this.universityId.push(res.results[u].id)
						})
				}
			})
	}
}
</script>
