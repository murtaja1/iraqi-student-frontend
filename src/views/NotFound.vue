<template>
	<div align="center" class="mt-5">
		<img :src="notFound" alt="dd" width="50%" />
		<h2 class="my-3 fontSize">الصفحة التي تبحث عنها غير موجودة!</h2>
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

<style lang="scss" scoped>
@media screen and (max-width: 500px) {
	.fontSize {
		font-size: 20px;
	}
}
</style>
