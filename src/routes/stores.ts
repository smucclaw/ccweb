// @ts-ignore
import { BoolVar, AllQuantifier, AnyQuantifier, LadderDiagram } from "ladder-diagram"
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

let test_data2 = `
{
"Assessment": 
{
    "contents": [
        {
            "contents": "all of the following",
            "tag": "Pre"
        },
        [
            {
                "contents": {
                    "contents": "is a Public Agency",
                    "tag": "Leaf"
                },
                "tag": "Not"
            },
            {
                "contents": [
                    {
                        "contents": "any of the following",
                        "tag": "Pre"
                    },
                    [
                        {
                            "contents": "the data breach occurred ON 1 Feb 2022",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "the data breach occurred AFTER 1 Feb 2022",
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
}
`

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
    } else if (obj.tag == "Not") { 
        // This assumes that the content within the `Not` tag is always a bool_var.
        let bool_var: BoolVar = parse(obj.contents);
        bool_var.isnegated = true;
        return bool_var;
        // return new BoolVar(obj.contents, false, null, null)
    }
}

let json = JSON.parse(test_data2);
let m = new Map()

for (const [key, value] of Object.entries(json)) {
    console.log(key, value)
	  m.set(key, parse(value))
}

export const store_data = writable(m);
