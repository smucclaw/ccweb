<script lang=ts>
	import { LadderDiagram } from 'ladder-diagram';
	import { store_corpus, store_active_category, store_active_constraints } from './stores';
	import { onMount } from "svelte";
	import Nest from "./Nest.svelte";

	let mounted = false;

	// String : Circuit (Bool | Any | All)
	let corpus = {};
	let active_category = "";
	let active_constraints = {};

	// Get the data from the store
	store_corpus.subscribe(d => {
		corpus = d;
		active_constraints = corpus[active_category];

		// Detach and render the diagram again
		if (mounted) {
			(window as any).diagram.detach()
			render_diagram()
		}
	})

	// Keep active_question in sync with the store
	store_active_category.subscribe(d => { active_category = d; })
	store_active_constraints.subscribe(d => { active_constraints = d; })

	function render_diagram() {
		if (Object.keys(corpus).length > 0) {
			// (window as any).diagram.detach()
			(window as any).diagram = 
				new LadderDiagram(active_constraints, "Corners").attach(document.getElementById("diagram"))
		}
	}

	function update_active_question(question: string) {
		store_active_category.set(question);
		store_active_constraints.set(corpus[question]);
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

		// Set default on mount
		store_active_category.set(Object.keys(corpus)[0]);
		store_active_constraints.set(Object.values(corpus)[0]);

		render_diagram()
		mounted = true;
	})
</script>

<div class="main">
	<div class="entries">
		<!-- The category (The left-side of the problem)-->
		<!-- {#each [...m] as [k, v]} -->
		{#each Object.entries(corpus) as [k, v]}
			<!-- {@debug v} -->
			{#if v.type != "BoolVar"}
				<div class="category">
					<button 
						on:click={() => update_active_question(k)}
						type="button" 
						class="btn btn-primary btn-category">{k}</button>
				</div>
			{/if}
		{/each}
	</div>

	<!-- This should show active question -->
	<div class="question">
		<Nest data={active_constraints}/>
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
		width: 15%;
	}

	.btn-category {
		width: 100%;
	}

	.question {
		flex-direction: column;
		width: 85%;
	}
</style>
