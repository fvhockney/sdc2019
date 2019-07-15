const Alexa = require('ask-sdk')
import api from './api.js'

const getProject = handlerInput => handlerInput.requestEnvelope.request.intent.slots.project.value

const LaunchRequestHandler = {
    canHandle ( handlerInput ) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
    },

    handle ( handlerInput ) {
        const speech = "I've got youre time card here. What can I do for you?"

        return handlerInput.responseBuilder
            .speak( speech )
            .getResponse()
    }
}

const StopProjectIntent = {
    canHandle ( handlerInput ) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'StopProjectIntent'
    },
    async handle ( handlerInput ) {
        let speech
        try {
            const resp = await api.stop( getProject( handlerInput ) )
            speech = `Ok. I stopped the project ${resp.data.data.name}`
        } catch ( err ) {
            speech = `Sorry. I couldn't stop the project ${ getProject( handlerInput ) }`
        }

        return handlerInput.responseBuilder
            .speak( speech )
            .getResponse()
    }
}

const StartProjectIntent = {
    canHandle ( handlerInput ) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'StartProjectIntent'
    },
    async handle ( handlerInput ) {
        let speech
        try {
            const resp = await api.start( getProject( handlerInput ) )
            speech = `Ok. I started ${resp.data.data.name}`
        } catch ( err ) {
            speech = `Sorry. I couldn't start ${ getProject( handlerInput ) }`
        }

        return handlerInput.responseBuilder
            .speak( speech )
            .getResponse()
    }
}

const AddProjectIntent = {
    canHandle ( handlerInput ) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AddProjectIntent'
    },
    async handle ( handlerInput ) {
        let speech
        try {
            const resp = await api.add( getProject( handlerInput ) )
            speech = `Ok. I add the project ${ resp.data.data.name }`
        } catch ( err ) {
            speech = `Sorry. I couldn't add the project ${ getProject( handlerInput ) }`
        }

        return handlerInput.responseBuilder
            .speak( speech )
            .getResponse()
    }
}
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        StopProjectIntent,
        StartProjectIntent,
        AddProjectIntent,
    ).create()
