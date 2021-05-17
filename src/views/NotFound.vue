<template>
	<div align="center" class="mt-5">
		<img :src="notFound" alt="dd" width="500" />
		<h2>الصفحة التي تبحث عنها غير موجودة!</h2>
		<b-button to="/" variant="primary">الرئيسية</b-button>
	</div>
</template>

<script>
import notFound from "../assets/notFound.svg"
export default {
	data() {
		return {
			notFound: notFound
		}
	}
}
</script>

<style></style>
