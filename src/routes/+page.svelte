<script lang=ts>
	import { LadderDiagram } from 'ladder-diagram';
	import { corpse, active_question } from './stores';
	import { onMount } from "svelte";
	import Nest from "./Nest.svelte";

	let mounted = false;

	// String : Circuit (Bool | Any | All)
	let m = {};
	let a = {};

	// Get the data from the store
	// When the store gets updated form the onclick function in Nest,
	// let it render through
	corpse.subscribe(d => {
		m = d;
		active_question.set(Object.values(m)[0]);
		console.log(m)

		if (mounted) {
			// Detach the diagram
			(window as any).diagram.detach()
			// Render
			render_diagram()
		}
	})

	// Keep active_question in sync with the store
	active_question.subscribe(d => {
		a = d;
	})

	function render_diagram() {
		if (Object.keys(m).length > 0) {
			(window as any).diagram = new LadderDiagram(
				document.getElementById("diagram"),
				a,
				"Corners")
		}
	}

	function update_active_question(question: string) {
		a = m[question];
		(window as any).diagram.detach()
		render_diagram()
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
			<!-- {@debug v} -->
			{#if v.type != "BoolVar"}
				<div class="category">
					<button type="button" on:click={() => update_active_question(k)} class="btn btn-primary">{k}</button>
				</div>
			{/if}
		{/each}
	</div>

	<!-- This should show active question -->
	<div class="question">
		<Nest data={a}/>
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
