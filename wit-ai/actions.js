'use strict';

const session = require('../sessions/sessions');
const api = require('../api/api');
const actionUtils = require('../utils/wit-utils');
const sendModule = require('../messages/send');
const firebase = require('../firebase/firebase');

const firstEntityValue = (entities, entity) => {
    const val = entities && entities[entity] &&
        Array.isArray(entities[entity]) &&
        entities[entity].length > 0 &&
        entities[entity][0].value;
    if (!val) {
        return null;
    }
    return typeof val === 'object' ? val.value : val;
};

const actions = {
    send: send,
    getPerson: getPerson,
    getInfo: getInfo,
    getTalk: getTalk,
    getTopic: getTopic,
    getSocial: getSocial,
    getDemo: getDemo,
    getGreeting: getGreeting,
    getJoke: getJoke,
    getLocate: getLocate,
    getDashboard: getDashboard,
    getEvent: getEvent,
    getGif: getGif,
    getHelp: getHelp,
    getThanks: getThanks
}

module.exports = {
    getActions: getActions,
    callSiena: callSiena
};

function getActions() {
    return actions;
}

/**
 * Our bot has something to say
 * @param sessionId
 * @param context
 * @param text
 */
function send(request, response) {
    console.log('No intent detected');
    console.log("REQUEST BODY: ", request.body)
    return new Promise(function(resolve, reject) {
        console.log('user said...', request.text);
        console.log('sending...', JSON.stringify(response));
        return resolve();
    });
}

/**
 * Handles the getPerson intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 * @returns {Promise.<*>}
 */
function getPerson({sessionId, context, text, entities}) {
    console.log("get person");
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    const contact = firstEntityValue(entities, 'contact');
    if(contact) {
        context.name = contact;
    }
    const witResponse = actionUtils.generateSienaAIQuery(entities, context);
    callSiena(witResponse, context);
    return Promise.resolve(context);
}

/**
 * Handles the getInfo intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 * @returns {Promise.<*>}
 */
function getInfo({sessionId, context, text, entities}) {
    console.log("get info");
    console.log(`Wit extracted ${JSON.stringify(entities)}`);

    const witResponse = actionUtils.generateSienaAIQuery(entities, context);
    callSiena(witResponse, context);

    return Promise.resolve(context);
}

/**
 * Handles getTalk intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 * @returns {Promise.<*>}
 */
function getTalk({sessionId, context, text, entities}) {
    console.log("get talk");
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    const detail = firstEntityValue(entities, 'detail');
    const contact = firstEntityValue(entities, 'contact');
    const time = firstEntityValue(entities, 'datetime');
    if(detail) {
        context.detail = detail;
    }
    if(contact) {
        context.name = contact;
    }
    if(time) {
        context.time = time;
    }
    const witResponse = actionUtils.generateSienaAIQuery(entities, context);
    callSiena(witResponse, context);
    return Promise.resolve(context);
}

/**
 * Handles getTopic intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 * @returns {Promise.<*>}
 */
function getTopic({sessionId, context, text, entities}) {
    console.log("get topic");
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    const detail = firstEntityValue(entities, 'detail');
    const time = firstEntityValue(entities, 'datetime');
    if(detail) {
        context.detail = detail;
    }
    if(time) {
        context.time = time;
    }
    const witResponse = actionUtils.generateSienaAIQuery(entities, context);
    callSiena(witResponse, context);
    return Promise.resolve(context);
}

/**
 * Handles getSocial intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 * @returns {Promise.<*>}
 */
function getSocial({sessionId, context, text, entities}) {
    console.log("get social");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    const detail = firstEntityValue(entities, 'detail');
    const socialEvent = firstEntityValue(entities, 'socialEvent');
    const time = firstEntityValue(entities, 'datetime');
    if(detail) {
        context.detail = detail;
    }
    if(socialEvent) {
        context.keyword = socialEvent;
    }
    if(time) {
        context.time = time;
    }
    const witResponse = actionUtils.generateSienaAIQuery(entities, context);
    callSiena(witResponse, context);
    return Promise.resolve(context);
}

/**
 * Handles getDemo intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 * @returns {Promise.<*>}
 */
function getDemo({sessionId, context, text, entities}) {
    console.log("get demo");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);

    if(entities.keyword) {
        const witResponse = actionUtils.generateSienaAIQuery(entities, context);
        callSiena(witResponse, context);
    }
    else {
        let query = {
            intent: "demo",
            detail: "all",
            keyword: [],
            time: "",
            name: ""
        }
        callSiena(query, context);
    }
    return Promise.resolve(context);
}

/**
 * Handles the getGreeting intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 */
function getGreeting({sessionId, context, text, entities}) {
    console.log("get greeting");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    const witResponse = actionUtils.generateSienaAIQuery(entities, context);
    callSiena(witResponse, context);
    return Promise.resolve(context);
}

/**
 * Handles the getJoke intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 */
function getJoke({sessionId, context, text, entities}) {
    console.log("get joke");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    const witResponse = actionUtils.generateSienaAIQuery(entities, context);
    callSiena(witResponse, context);
    return Promise.resolve(context);
}

/**
 * Handles the locate intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 */
function getLocate({sessionId, context, text, entities}) {
    console.log("get locate");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);

    const witResponse = actionUtils.generateSienaAIQuery(entities, context);
    callSiena(witResponse, context);

    return Promise.resolve(context);
}

/**
 * Handles the get dashboard intent. Send user to the dashboard
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 */
function getDashboard({sessionId, context, text, entities}) {
    console.log("get dashboard");
    firebase.pushUserInNeed(context.fbid);
    return Promise.resolve(context);
}

// /**
//  * Handles the get pin intent. This will kick off the networking flow
//  * @param sessionId
//  * @param context
//  * @param text
//  * @param entities
//  */
// function getPin({sessionId, context, text, entities}) {
//     console.log("get pin");
//     console.log(`Session ${sessionId} received ${text}`);
//     console.log(`The current context is ${JSON.stringify(context)}`);
//     console.log(`Wit extracted ${JSON.stringify(entities)}`);
//
//     const pin = firstEntityValue(entities, 'pin_number');
//     if(pin) {
//         console.log("we received a pin")
//         context.keyword = pin;
//         var witResponse = actionUtils.generateSienaAIQuery(entities, context);
//         witResponse.intent = 'pin';
//         callSiena(witResponse, context);
//     }
//
//     return Promise.resolve(context);
// }

/**
 * Handles the get Event intent. This is a callback if wit misses get Social or get Talk
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 */
function getEvent({sessionId, context, text, entities}) {
    console.log("get event");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);

    const detail = firstEntityValue(entities, 'detail');
    const time = firstEntityValue(entities, 'datetime');
    if(detail) {
        context.detail = detail;
    }
    if(time) {
        context.time = time;
    }

    const witResponse = actionUtils.generateSienaAIQuery(entities, context);
    callSiena(witResponse, context);

    return Promise.resolve(context);
}


/**
 * Handle get gif intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 */
function getGif({sessionId, context, text, entities}) {
    console.log("get gif");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    return Promise.resolve(context);
}

/**
 * Handles the get help intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 */
function getHelp({sessionId, context, text, entities}) {
    console.log("get help");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    let query = {
        intent: "help",
        detail: "",
        keyword: [],
        time: "",
        name: ""
    };
    callSiena(query, context);
    return Promise.resolve(context);
}

/**
 * Handles the get thanks intent
 * @param sessionId
 * @param context
 * @param text
 * @param entities
 */
function getThanks({sessionId, context, text, entities}) {
    console.log("get thanks");
    console.log(`Session ${sessionId} received ${text}`);
    console.log(`The current context is ${JSON.stringify(context)}`);
    console.log(`Wit extracted ${JSON.stringify(entities)}`);
    const query = actionUtils.generateSienaAIQuery(entities,context);
    callSiena(query, context);
    return Promise.resolve(context);
}

/**
 *  Utility functions
 */

/**
 * make the call to Siena
 * @param query
 */
function callSiena(query, context) {

    console.log("CONTEXT IN CALL SIENA: ", context);

    // api.accessAPI(query)
    //     .then(function(data) {
    //         sendModule.buildChatbotResponseFromSienaResponse(data, context);
    //     });
}


