<template>
	<div>
		<h5 class="text-center text-white border pb-2 pt-1 box-top-bgc">
			<font-awesome-icon icon="university" />
			{{ soruce.name }}
		</h5>
		<b-img center :src="soruce.logo" :alt="soruce.name" height="150"></b-img>
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
	</div></template
>

<script>
import Rating from "../../components/Rating"
export default {
	components: {
		Rating
	},
	props: { soruce: Object, sideTableTitle: Array, sideTableContent: Array }
}
</script>

<style lang="scss" scoped>
::v-deep .table th {
	width: 40%;
}
.img {
	position: relative;
	top: 5px;
}
.box-top-bgc {
	background-color: rgb(224, 134, 134);
}
</style>
