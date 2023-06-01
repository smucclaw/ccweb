// @ts-ignore
import { BoolVar, AllQuantifier, AnyQuantifier, LadderDiagram } from "../../node_modules/ladder-diagram/js/ladder.js"
import { writable } from 'svelte/store';

let test_data = `
{
    "Person": {
        "contents": [
            {
                "contents": "all of the following",
                "tag": "Pre"
            },
            [
                {
                    "contents": "Person walks",
                    "tag": "Leaf"
                },
                {
                    "contents": [
                        {
                            "contents": "any of the following",
                            "tag": "Pre"
                        },
                        [
                            {
                                "contents": "Person eats",
                                "tag": "Leaf"
                            },
                            {
                                "contents": "Person  drinks",
                                "tag": "Leaf"
                            }
                        ]
                    ],
                    "tag": "Any"
                }
            ]
        ],
        "tag": "All"
    }
}`

// @ts-ignore
function parse(obj) {
    if (obj.tag == "All") {
        let t = []
        for (let i = 0; i < obj.contents[1].length; i++)
            t.push(parse(obj.contents[1][i]))
        return new AllQuantifier(t, "all_quantifier")
    } else if (obj.tag == "Any") {
        let t = []
        for (let i = 0; i < obj.contents[1].length; i++)
            t.push(parse(obj.contents[1][i]))
        return new AnyQuantifier(t, "any_quantifier")
    } else if (obj.tag == "Leaf") {
        return new BoolVar(obj.contents, false, null, null)
    }
}

let json = JSON.parse(test_data);
let m = new Map()

for (const [key, value] of Object.entries(json)) {
	m.set(key, parse(value))
}

export const store_data = writable(m);