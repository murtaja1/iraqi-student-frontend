<template>
	<div v-if="soruce">
		<b-container fluid="sm">
			<h5 class="text-right mb-3 mt-3">{{ soruce.card_text }}</h5>

			<VueShowdown align="right" :markdown="soruce.description" flavor="github"/>
			<h6 class="mt-2" align="right">التعليقات:</h6>
			<hr class="col-md-3 col-sm-3 col-6" align="right"/>
			<ReviewParent
				class="col-md-8 mt-4 text-right"
				:building="soruce.id"
				sub_url="news_reviews"
				empty1="تعليقات"
				empty2="المعلقين"
		/></b-container>
	</div>
	<div class="mt-5 d-flex justify-content-center" v-else>
		<b-spinner style="width: 5rem; height: 5rem;" variant="primary"></b-spinner></div
></template>

<script>
import shared from "../shared"
import ReviewParent from "../components/Reviews/ReviewParent"
export default {
	data() {
		return {
			soruce: ""
		}
	},
	components: {
		ReviewParent
	},
	methods: {
		fetchData() {
			shared.fetchData("news" + "/" + this.$route.params.id).then((res) => {
				this.soruce = res
			})
		}
	},
	mounted() {
		this.fetchData()
	}
}
</script>

<style></style>
