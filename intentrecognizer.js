const {LuisRecognizer} = require('botbuilder-ai')

class IntentRecognizer {
    constructor(config) {
        const luisIsConfigured = config && config.applicationId && config.endpointKey && config.endpoint;
        if (luisIsConfigured) {
            // Set the recognizer options depending on which endpoint version you want to use e.g v2 or v3.
            // More details can be found in https://docs.microsoft.com/en-gb/azure/cognitive-services/luis/luis-migration-api-v3
            const recognizerOptions = {
                apiVersion: 'v3'
            };

            this.recognizer = new LuisRecognizer(config, recognizerOptions);
        }
    }

    get isConfigured() {
        return (this.recognizer !== undefined);
    }

    /**
     * Returns an object with preformatted LUIS results for the bot's dialogs to consume.
     * @param {TurnContext} context
     */
    async executeLuisQuery(context) {
        return await this.recognizer.recognize(context);
    }

 
    // getTimeEntity(result) {
    //     const datetimeEntity = result.entities.datetime;
    //     if (!datetimeEntity || !datetimeEntity[0]) return undefined;

    //     const timex = datetimeEntity[0].timex;
    //     if (!timex || !timex[0]) return undefined;

    //     const datetime = timex[0]
    //     return datetime;
    // }


    getTimeEntity(result) {
        const timeEntity = result.entities.time;
        if (!timeEntity || !timeEntity[0]) return undefined;
        return timeEntity;
    }

    getDateEntity(result) {
        const dateEntity = result.entities.date;
        if (!dateEntity || !dateEntity[0]) return undefined;
        return dateEntity;
    }
    
}

module.exports = IntentRecognizer