<script>
	import { BoolVar, AllQuantifier, AnyQuantifier, LadderDiagram } from 'ladder-diagram'
	import Nest from "./Nest.svelte";
	import { store_data } from "./stores.js";
	import { onMount } from "svelte";

	let mounted = false;

	// String : Circuit (Bool | Any | All)
	let m = new Map();
	// Get the data from the store
	// When the store gets updated form the onclick function in Nest,
	// let it render through
	store_data.subscribe(d => {
		m = d;

		if (mounted) {
			// Detach 
			window.diagram.detach()
			// Render
			render_diagram()
		}
	})

	function render_diagram() {
		if (m.size > 0) {
			for (const [k, v] of m) {
				window.diagram = new LadderDiagram(
					document.getElementById("diagram"),
					v,
					"Corners"
				)
			}
		}
	}

	onMount(() => {
		// Future : Use url_params to find where to fetch request from
		// const url_params = new URLSearchParams(window.location.search);
		// console.log(url_params)

		// fetch("http://localhost:8080/json")
		// .then(data => data.json())
		// .then(json => {
		// 	for (const [key, value] of Object.entries(json)) {
		// 		m.set(key, parse(value))
		// 	}
		// 	// Update store
		// 	store_data.set(m)

		// 	render_diagram()
		// 	mounted = true;
		// })


		render_diagram()
		mounted = true;

	})
</script>

<div class="main">
	<!-- Each entry -->
	<div class="entry">
		<!-- The question -->
		{#each [...m] as [k, v]}
		<div class="question">
			<button type="button" class="btn btn-primary">{k}</button>
		</div>

		<Nest data={v}/>
		{/each}
	</div>
</div>

<div id="diagram"></div>

<style>
	@import 'ladder-diagram/css/ladder.css';

	.main {
		padding: 10px;
	}

	.entry {
		display: flex;
	}
</style>