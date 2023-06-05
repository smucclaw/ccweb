<script lang=ts>
    import { BoolVar, AllQuantifier, AnyQuantifier } from "ladder-diagram"
    import { store_data } from "./stores"

    // TODO : When ladder-diagram gets ported to typescript
    // this should all be type annotated
    // Data passed down as a prop
    export let data: any;

    function leaf_click(leaf_text: string, b: boolean) {
        // Update store with correct leaf value, based on user input
        // TODO : The any here refers to any of { BoolVar, AllQuantifier, AnyQuantifier }
        let parse_update = (node: any, text: string, b: boolean): any => {
            if (node.header == "all_quantifier") {
                let t = []
                for (let i = 0; i < node.children.length; i++)
                    t.push(parse_update(node.children[i], text, b))
                return new AllQuantifier(t, "all_quantifier")
            } else if (node.header == "any_quantifier") {
                let t = []
                for (let i = 0; i < node.children.length; i++)
                    t.push(parse_update(node.children[i], text, b))
                return new AnyQuantifier(t, "any_quantifier")
            } else if (Object.hasOwn(node, 'text')) {
                if (node.text === text) {
                    return new BoolVar(node.text, node.isnegated,node.preset, b ? 'T' : 'F')
                }
                return node
            } 
        }

        store_data.update(d => {
            // console.log("store_data_update", d)
            let tt = new Map()
            for (const [key, value] of d) {
                let n = parse_update(value, leaf_text, b)
                tt.set(key, n)
            }
            return tt;
        })
    }
</script>

{#if data.header === "all_quantifier"}
    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="true" aria-controls="collapseExample">
        {data.header}
    </button>

    <!-- collapse content -->
    <div class="collapse.show" id="collapseExample">
        <div class="card card-body">
        {#each data.children as v}
            <svelte:self data={v} />
        {/each}
        </div>
    </div>
{:else if data.header === "any_quantifier"}
    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="true" aria-controls="collapseExample">
        {data.header}
    </button>

    <!-- collapse content -->
    <div class="collapse.show" id="collapseExample">
        <div class="card card-body">
        {#each data.children as v}
            <svelte:self data={v} />
        {/each}
        </div>
    </div>
{:else}
    <div class="btn-group bool_container" role="group" data-toggle="buttons" aria-label="Basic radio toggle button group">
        <p>{data.text}</p>

        <input type="radio" class="btn-check" name="btnradio" id="btnradio1+{data.text}" autocomplete="off" checked>
        <label class="btn btn-outline-success" on:click={() => leaf_click(data.text, true)} for="btnradio1+{data.text}">Yes</label>
    
        <input type="radio" class="btn-check" name="btnradio" id="btnradio2+{data.text}" autocomplete="off">
        <label class="btn btn-outline-danger" on:click={() => leaf_click(data.text, false)} for="btnradio2+{data.text}">No</label>
    
        <input type="radio" class="btn-check" name="btnradio" id="btnradio3+{data.text}" autocomplete="off">
        <label class="btn btn-outline-secondary" on:click={() => leaf_click(data.text, null)} for="btnradio3+{data.text}">Don't Know</label>
    </div>
{/if}

<style>
    .bool_container {
        display :flex;
        padding: 0.5em;
    }
</style>
