'use strict';

const constants = require('../config/default.json');

module.exports = {
    generateSienaAIQuery:generateSienaAIQuery
};

function generateSienaAIQuery(entities, intent, context) {
    let data = {
        intent: intent,
        detail: "none",
        keyword: [],
        time: "",
        name: ""
    }

    if(context.detail) {
        data.detail = context.detail.toLowerCase();
    }

    return data;
}

// function parseWitResponse(entities) {
//     let data = {
//         intent: "what",
//         detail: "none",
//         keyword: [],
//         time: ""
//     };
//     //add contacts first, because people take priority over things
//     if(entities.contact) {
//         entities.contact.forEach(function(contact) {
//             data.keyword.push(contact.value.toLowerCase());
//         });
//     }
//     if(entities.keyword) {
//         entities.keyword.forEach(function(keyword) {
//             data.keyword.push(keyword.value.toLowerCase());
//         });
//     }
//
//     if(entities.detail) {
//         data.detail = entities.detail[0].value.toLowerCase();
//     }
//     if(entities.intent) {
//         data.intent = entities.intent[0].value.toLowerCase();
//     }
//     if(entities.datetime) {
//         //convert timeString to epoch time
//         const date = new Date(entities.datetime[0].value);
//         data.time = date.getTime();
//     }
//     data.intent = validateIntent(data.intent, entities);
//     data.keyword = validateKeywordBasedOnIntent(data.keyword, data.intent);
//     return data;
// }
//
// function validateIntent(intent, entities) {
//     const validIntents = constants.getIntents();
//     if(intent === "tell") {
//         if(entities.contact) {
//             intent = "who";
//         } else {
//             intent = "what";
//         }
//     } else if (intent === "greeting" || !validIntents.includes(intent)) {
//         intent = "what";
//     }
//
//     return intent;
// }
//
// function validateKeywordBasedOnIntent(keyword, intent) {
//     if(intent === "greeting") {
//         keyword = "siena";
//     }
//     return keyword;
// }