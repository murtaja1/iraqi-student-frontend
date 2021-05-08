<template>
	<b-pagination
		v-if="show"
		v-model="page"
		:total-rows="totalRows"
		per-page="6"
		prev-text="السابق"
		next-text="التالي"
		limit="4"
		align="center"
		pills
		@input="fetchData(page)"
		hide-goto-end-buttons
		first-number
		last-number
	></b-pagination>
</template>

<script>
export default {
	data() {
		return {
			page: 1
		}
	},
	props: {
		show: Boolean,
		totalRows: Number,
		fetchData: Function,
		currentPage: Number
	},
	watch: {
		// if currentpage changes after deleting or editing review.
		currentPage: function() {
			return (this.page = this.currentPage)
		}
	},
	mounted() {
		this.fetchData(this.page)
	}
}
</script>

<style></style>
