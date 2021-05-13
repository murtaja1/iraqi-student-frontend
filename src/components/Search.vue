<template>
	<div class="container">
		<font-awesome-icon @click="modalShow = true" icon="search" class="scale" size="lg" />
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

			<b-icon icon="x" class="x scale" font-scale="1.5" @click="close"></b-icon>

			<p v-if="!noResult" class="text-center text-danger mt-2">
				لا توجد نتائج مطابقة!
				<br /><small>(تأكد من الإملاء)</small>
			</p>
			<b-list-group class="groub">
				<b-list-group-item
					class="nn bg-black"
					v-for="(url, index) in urls"
					:key="index"
					align="right"
					><b-link :to="url" class="text-dark" @click="close">{{
						names[index]
					}}</b-link></b-list-group-item
				>
			</b-list-group>
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
			noResult: true
		}
	},

	methods: {
		close() {
			this.modalShow = false
			this.urls = []
			this.names = []
			this.text = ""
		},
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
						this.noResult = false
					} else {
						this.noResult = true
					}
				})
			} else {
				// if the user remove the text
				this.urls = []
				this.names = []
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.container {
	overflow: hidden;
}
.groub {
	max-height: 250px;
	overflow: auto;
}
::v-deep .modal-dialog-scrollable .modal-body {
	overflow: hidden;
}
::-webkit-scrollbar {
	width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
	background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: rgb(199, 199, 199);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: rgb(141, 141, 141);
}

.scale {
	cursor: pointer;
	transition: transform 0.2s;
}
.scale:hover {
	transform: scale(1.05);
	-webkit-transform: scale(1.05);
}
.x {
	position: absolute;
	top: 10px;
	left: 10px;
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
