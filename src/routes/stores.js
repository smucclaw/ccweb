// @ts-ignore
import { BoolVar, AllQuantifier, AnyQuantifier, LadderDiagram } from "../../node_modules/ladder-diagram/js/ladder.js"
import { writable } from 'svelte/store';

// let test_data = `
// {
//     "Person": {
//         "contents": [
//             {
//                 "contents": "all of the following",
//                 "tag": "Pre"
//             },
//             [
//                 {
//                     "contents": "Person walks",
//                     "tag": "Leaf"
//                 },
//                 {
//                     "contents": [
//                         {
//                             "contents": "any of the following",
//                             "tag": "Pre"
//                         },
//                         [
//                             {
//                                 "contents": "Person eats",
//                                 "tag": "Leaf"
//                             },
//                             {
//                                 "contents": "Person  drinks",
//                                 "tag": "Leaf"
//                             }
//                         ]
//                     ],
//                     "tag": "Any"
//                 }
//             ]
//         ],
//         "tag": "All"
//     }
// }`
// let json = JSON.parse(test_data);

export const store_data = writable(new Map());