<template>
	<div>
		<font-awesome-icon
			@click=";(modalShow = !modalShow), (urls = []), (names = []), (text = '')"
			icon="search"
			size="lg"
		/>
		<b-modal v-model="modalShow" centered scrollable hide-footer hide-header no-close-on-backdrop>
			<div align="right">
				<label for="search">اكتب اسم الجامعة او الكلية او القسم:</label>
			</div>

			<b-input-group id="search" size="sm">
				<b-input-group-prepend is-text @click="fetchSearchData">
					<b-icon icon="search" class="search"></b-icon>
				</b-input-group-prepend>

				<b-form-input
					@input="fetchSearchData"
					v-model="text"
					type="search"
					placeholder="بحث..."
				></b-form-input>
			</b-input-group>

			<b-icon
				icon="x"
				class="x"
				font-scale="1.5"
				@click=";(modalShow = false), (showSearchM = false)"
			></b-icon>

			<p v-if="showSearchM" class="text-center text-danger mt-2">
				لا توجد نتائج مطابقة!
				<br /><small>(تأكد من الاملأ)</small>
			</p>

			<ul v-for="(n, index) in urls" :key="index" align="right">
				<li @click=";(modalShow = !modalShow), (urls = []), (names = []), (text = '')">
					<b-link :to="n">{{ names[index] }}</b-link>
				</li>
			</ul>
		</b-modal>
	</div>
</template>

<script>
import shared from "../shared"
export default {
	data() {
		return {
			modalShow: false,
			text: "",
			urls: [],
			names: [],
			showSearchM: false
		}
	},

	methods: {
		fetchSearchData() {
			if (this.text) {
				shared.fetchData(`search?q=${this.text}&page_size=100`).then((res) => {
					this.urls = []
					this.names = []
					var n
					for (n in res.results) {
						let s = res.results[n].name
						if (s.substr(0, 5) === "جامعة") {
							this.urls.push(`/detail/universities/${res.results[n].id}`)
							this.names.push(s)
						} else if (s.substr(0, 7) === "الجامعة") {
							this.urls.push(`/detail/universities/${res.results[n].id}`)
							this.names.push(s)
						} else if (s.substr(0, 4) === "كلية") {
							this.urls.push(`/university/collage/${res.results[n].university}/${s}`)
							this.names.push(res.results[n].university + " / " + s)
						} else {
							this.urls.push(`/department/${res.results[n].collage}/${s}`)
							this.names.push(res.results[n].collage + " / " + s)
						}
					}
					// to inform the user about the results.
					if (this.names.length === 0) {
						this.showSearchM = true
					} else {
						this.showSearchM = false
					}
				})
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.x {
	position: absolute;
	top: 10px;
	left: 10px;
	cursor: pointer;
}
.x:hover {
	color: red;
}
::v-deep .input-group-text {
	background: #28a745;
	color: white;
	border-radius: 100px;
	cursor: pointer;
}
</style>
