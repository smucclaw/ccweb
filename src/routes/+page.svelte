<script lang=ts>
	import { LadderDiagram } from 'ladder-diagram';
	import { store_data } from './stores';
	import { onMount } from "svelte";
	import Nest from "./Nest.svelte";

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
			(window as any).diagram.detach()
			// Render
			render_diagram()
		}
	})

	function render_diagram() {
		if (m.size > 0) {
			for (const [k, v] of m) {
				(window as any).diagram = new LadderDiagram(
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
		<!-- The category (The left-side of the problem)-->
		{#each [...m] as [k, v]}
		<div class="category">
			<button type="button" class="btn btn-primary">{k}</button>
		</div>

		<div class="question">
			<Nest data={v}/>
		</div>

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

	.question {
		display: flex;
		flex-direction: column;
	}
</style>