// @ts-ignore
import { BoolVar, AllQuantifier, AnyQuantifier } from "ladder-diagram"
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
},
"Notify PDPC": 
{
    "contents": [
        {
            "contents": "all of the following",
            "tag": "Pre"
        },
        [
            {
                "contents": "it is a Notifiable Data Breach",
                "tag": "Leaf"
            },
            {
                "contents": {
                    "contents": "you are a Public Agency",
                    "tag": "Leaf"
                },
                "tag": "Not"
            }
        ]
    ],
    "tag": "All"
}
}
`

let test_data3 = `
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
}, 
"NDB Qualification": 
{
    "contents": [
        {
            "contents": "all of the following",
            "tag": "Pre"
        },
        [
            {
                "contents": "a data breach occurred",
                "tag": "Leaf"
            },
            {
                "contents": {
                    "contents": "the data breach occurred only within an organisation",
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
                            "contents": "it results in, or is likely to result in, significant harm to an affected individual",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "it is, or is likely to be, of a significant scale",
                            "tag": "Leaf"
                        }
                    ]
                ],
                "tag": "Any"
            }
        ]
    ],
    "tag": "All"
}, 
"it is, or is likely to be, of a significant scale": 
{
    "contents": "the number of affected individuals > the prescribed threshold of affected individuals",
    "tag": "Leaf"
}, 
"Notify PDPC": 
{
    "contents": [
        {
            "contents": "all of the following",
            "tag": "Pre"
        },
        [
            {
                "contents": "it is a Notifiable Data Breach",
                "tag": "Leaf"
            },
            {
                "contents": {
                    "contents": "you are a Public Agency",
                    "tag": "Leaf"
                },
                "tag": "Not"
            }
        ]
    ],
    "tag": "All"
}, 
"Notify Individuals": 
{
    "contents": [
        {
            "contents": "all of the following",
            "tag": "Pre"
        },
        [
            {
                "contents": "it is a Notifiable Data Breach",
                "tag": "Leaf"
            },
            {
                "contents": {
                    "contents": "you are a Public Agency",
                    "tag": "Leaf"
                },
                "tag": "Not"
            }
        ]
    ],
    "tag": "All"
}, 
"the data breach relates to any of the prescribed personal data or classes of personal data relating to the individual": 
{
    "contents": [
        {
            "contents": "any of the following",
            "tag": "Pre"
        },
        [
            {
                "contents": "1 The amount of any wages, salary, fee, commission, bonus, gratuity, allowance or other remuneration paid or payable to the individual by any person, whether under a contract of service or a contract for services.",
                "tag": "Leaf"
            },
            {
                "contents": "2 The income of the individual from the sale of any goods or property.",
                "tag": "Leaf"
            },
            {
                "contents": "3 The number of any credit card, charge card or debit card issued to or in the name of the individual.",
                "tag": "Leaf"
            },
            {
                "contents": "4 The number assigned to any account the individual has with any organisation that is a bank or finance company.",
                "tag": "Leaf"
            },
            {
                "contents": [
                    {
                        "contents": "5 Any information that identifies, or is likely to lead to the identification of, the individual as a child or young person who ‚Äî",
                        "tag": "Pre"
                    },
                    [
                        {
                            "contents": "5.a is or had been the subject of any investigation under the CYPA;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "5.b is or had been arrested, on or after 1 July 2020, for an offence committed under any written law;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "5.c is or had been taken into care or custody by the Director-General of Social Welfare, a protector, any officer generally or specially authorised in that behalf in writing by the Director-General or protector or a police officer under the CYPA;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "5.d is attending or had attended a family programme in relation to an application to be made under section 50 of the CYPA;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "5.e is or was the subject of an order made by a court under the CYPA; or",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "5.f is or had been concerned in any proceedings in any court or on appeal from any court, whether the individual is the person against or in respect of whom the proceedings are taken or a witness in those proceedings.",
                            "tag": "Leaf"
                        }
                    ]
                ],
                "tag": "Any"
            },
            {
                "contents": [
                    {
                        "contents": "6 Any information that identifies, or is likely to lead to the identification of ‚Äî b",
                        "tag": "Pre"
                    },
                    [
                        {
                            "contents": "6.a the individual who has been or is the subject of any investigation, examination, assessment or treatment under the VAA relating to whether the individual is a vulnerable adult experiencing or at risk of abuse, neglect or self-neglect;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "6.b the individual as a vulnerable adult who has been committed to a place of temporary care and protection or place of safety or to the care of a fit person under the VAA;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "6.c the individual as a vulnerable adult who is the subject of an order made by a court under the VAA;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "6.d a place of temporary care and protection or place of safety in which an individual or a vulnerable adult mentioned in sub-paragraph (a), (b) or (c) is committed, or the location of such a place of temporary care and protection or place of safety; or",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "6.e a fit person under whose care an individual or a vulnerable adult mentioned in sub-paragraph (a), (b) or (c) is placed, or the location of the premises of such a fit person.",
                            "tag": "Leaf"
                        }
                    ]
                ],
                "tag": "Any"
            },
            {
                "contents": [
                    {
                        "contents": "7 Any private key of or relating to the individual that is used or may be used ‚Äî",
                        "tag": "Pre"
                    },
                    [
                        {
                            "contents": "7.a to create a secure electronic record or secure electronic signature;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "7.b to verify the integrity of a secure electronic record; or",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "7.c to verify the authenticity or integrity of a secure electronic signature.",
                            "tag": "Leaf"
                        }
                    ]
                ],
                "tag": "Any"
            },
            {
                "contents": "8 The net worth of the individual.",
                "tag": "Leaf"
            },
            {
                "contents": "9 The deposit of moneys by the individual with any organisation.",
                "tag": "Leaf"
            },
            {
                "contents": "10 The withdrawal by the individual of moneys deposited with any organisation.",
                "tag": "Leaf"
            },
            {
                "contents": "11 The granting by an organisation of advances, loans and other facilities by which the individual, being a customer of the organisation, has access to funds or financial guarantees.",
                "tag": "Leaf"
            },
            {
                "contents": "12 The incurring by the organisation of any liabilities other than those mentioned in paragraph 11 on behalf of the individual.",
                "tag": "Leaf"
            },
            {
                "contents": "13 The payment of any moneys, or transfer of any property, by any person to the individual, including the amount of the moneys paid or the value of the property transferred, as the case may be.",
                "tag": "Leaf"
            },
            {
                "contents": "14 The creditworthiness of the individual.",
                "tag": "Leaf"
            },
            {
                "contents": "15 The individual‚Äôs investment in any capital markets products.",
                "tag": "Leaf"
            },
            {
                "contents": [
                    {
                        "contents": "16 The existence, and amount due or outstanding, of any debt ‚Äî",
                        "tag": "Pre"
                    },
                    [
                        {
                            "contents": "16.a owed by the individual to an organisation; or",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "16.b owed by an organisation to the individual.",
                            "tag": "Leaf"
                        }
                    ]
                ],
                "tag": "Any"
            },
            {
                "contents": [
                    {
                        "contents": "17 Any of the following:",
                        "tag": "Pre"
                    },
                    [
                        {
                            "contents": "17.a the terms and conditions of any accident and health policy or life policy (called in this item the applicable policy) of which the individual is the policy owner or under which the individual is a beneficiary;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "17.b the premium payable by the policy owner under the applicable policy;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "17.c the benefits payable to any beneficiary under the applicable policy;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "17.d any information relating to any claim on, or payment under, the applicable policy, including the condition of the health of the individual and the diagnosis, treatment, prevention or alleviation of any ailment, condition, disability, disease, disorder or injury that the individual has suffered or is suffering from;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "17.e any other information that the individual is the policy owner of, or a beneficiary under, an applicable policy.",
                            "tag": "Leaf"
                        }
                    ]
                ],
                "tag": "Any"
            },
            {
                "contents": [
                    {
                        "contents": "18 The assessment, diagnosis, treatment, prevention or alleviation by a health professional of any of the following affecting the individual:",
                        "tag": "Pre"
                    },
                    [
                        {
                            "contents": "18.a any sexually-transmitted disease such as Chlamydial Genital Infection, Gonorrhoea and Syphilis;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "18.b Human Immunodeficiency Virus Infection;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "mental illness;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "18.c schizophrenia or delusional disorder;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "18.d substance abuse and addiction, including drug addiction and alcoholism",
                            "tag": "Leaf"
                        }
                    ]
                ],
                "tag": "Any"
            },
            {
                "contents": [
                    {
                        "contents": "19 The provision of treatment to the individual for or in respect of ‚Äî",
                        "tag": "Pre"
                    },
                    [
                        {
                            "contents": "19.a the donation or receipt of a human egg or human sperm; or",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "19.b any contraceptive operation or procedure or abortion.",
                            "tag": "Leaf"
                        }
                    ]
                ],
                "tag": "Any"
            },
            {
                "contents": [
                    {
                        "contents": "20 Any of the following:",
                        "tag": "Pre"
                    },
                    [
                        {
                            "contents": "20.a subject to section 4(4)(b) of the Act, the donation and removal of any organ from the body of the deceased individual for the purpose of its transplantation into the body of another individual;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "20.b the donation and removal of any specified organ from the individual, being a living organ donor, for the purpose of its transplantation into the body of another individual;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "20.c the transplantation of any organ mentioned in sub-paragraph (a) or (b) into the body of the individual.",
                            "tag": "Leaf"
                        }
                    ]
                ],
                "tag": "Any"
            },
            {
                "contents": "21 Subject to section 4(4)(b) of the Act, the suicide or attempted suicide of the individual.",
                "tag": "Leaf"
            },
            {
                "contents": "22 Domestic abuse, child abuse or sexual abuse involving or alleged to involve the individual.",
                "tag": "Leaf"
            },
            {
                "contents": [
                    {
                        "contents": "23 Any of the following:",
                        "tag": "Pre"
                    },
                    [
                        {
                            "contents": "23.a information that the individual is or had been adopted pursuant to an adoption order made under the Adoption of Children Act (Cap. 4), or is or had been the subject of an application for an adoption order;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "23.b the identity of the natural father or mother of the individual;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "23.c the identity of the adoptive father or mother of the individual;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "23.d the identity of any applicant for an adoption order;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "23.e the identity of any person whose consent is necessary under that Act for an adoption order to be made, whether or not the court has dispensed with the consent of that person in accordance with that Act;",
                            "tag": "Leaf"
                        },
                        {
                            "contents": "23.f any other information that the individual is or had been an adopted child or relating to the adoption of the individual.",
                            "tag": "Leaf"
                        }
                    ]
                ],
                "tag": "Any"
            }
        ]
    ],
    "tag": "Any"
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

let json = JSON.parse(test_data3);

let m = {}
for (const [key, value] of Object.entries(json)) {
    m[key] = parse(value);
}

export const corpse = writable(m);
