<script lang=ts>
	import { LadderDiagram } from 'ladder-diagram';
	import { corpse } from './stores';
	import { onMount } from "svelte";
	import Nest from "./Nest.svelte";

	let mounted = false;

	// String : Circuit (Bool | Any | All)
	let m = {};
	let active_question = {};

	// Get the data from the store
	// When the store gets updated form the onclick function in Nest,
	// let it render through
	corpse.subscribe(d => {
		m = d;
		active_question = m.Assessment

		if (mounted) {
			// Detach the diagram
			(window as any).diagram.detach()
			// Render
			render_diagram()
		}
	})

	function render_diagram() {
		// if (Object.keys(m).length > 0) {
		// 	for (const [k, v] of Object.entries(m)) {
		// 		(window as any).diagram = new LadderDiagram(
		// 			document.getElementById("diagram"),
		// 			v,
		// 			"Corners")
		// 	}
		// }

		if (Object.keys(m).length > 0) {
			(window as any).diagram = new LadderDiagram(
				document.getElementById("diagram"),
				active_question,
				"Corners")
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
	<div class="entries">
		<!-- The category (The left-side of the problem)-->
		<!-- {#each [...m] as [k, v]} -->
		{#each Object.entries(m) as [k, v]}
			<div class="category">
				<button type="button" class="btn btn-primary">{k}</button>
			</div>
		{/each}
	</div>

	<!-- This should show active question -->
	<div class="question">
		<!-- <span> Nested Data </span> -->
		<Nest data={active_question}/>
	</div>
</div>

<div id="diagram"></div>

<style>
	@import 'ladder-diagram/css/ladder.css';

	.main {
		padding: 10px;
		display:flex;
	}

	.entries {
		flex-direction: column;
	}

	.question {
		flex-direction: column;
	}
</style>
