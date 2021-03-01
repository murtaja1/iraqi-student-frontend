<template>
	<div id="app">
		<NavBar />
		<!-- using the key here to make every route with different params a different route so it helps the search engine. -->
		<router-view :key="$route.path" />
	</div>
</template>

<script>
import NavBar from "./components/NavBar"
export default {
	components: {
		NavBar
	},
	created() {
		// whenever refresh update the state.
		this.$store.dispatch("tokenModel/fetchTokens")
	}
}
</script>

<style lang="scss" scoped></style>
