const Alexa = require("ask-sdk-core");
const { get } = require("lodash");
const axios = require("axios");

const api = axios.create({
  baseURL: "http://3.136.23.116:3301",
});

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  handle(handlerInput) {
    const speakOutput = "Olá, eu sou o LIU, seu assistente inteligente.";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .addDelegateDirective({
        name: "ServiceNumberReaderIntent",
        confirmationStatus: "NONE",
        slots: {},
      })
      .getResponse();
  },
};

const ServiceNumberReaderIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "ServiceNumberReaderIntent"
    );
  },
  async handle(handlerInput) {
    const { requestEnvelope, responseBuilder } = handlerInput;

    let speakOutput = `Fale novamente seu número de atendimento.`;
    const serviceNumber = Alexa.getSlotValue(requestEnvelope, "serviceNumber");
    const unimedUrl = 'https://web2homo.unimedpg.com.br:8084/DesafiosUTFPRAPI/desafio2/buscaInternamento?numeroAtendimento='
    const { data } = await axios.get(unimedUrl + serviceNumber, {
        headers: {
            'Authorization': '967fa705d6bf5fdf268dcd251f1de998'
        }
    });

    if (get(data, 'cpf')) {
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      sessionAttributes.patient = data;
      return handlerInput.responseBuilder
        .speak(`Olá ${data.nomePaciente}.`)
        .addDelegateDirective({
          name: "MenuOptionsIntent",
          confirmationStatus: "NONE",
          slots: {},
        })
        .getResponse();
    } else {
      speakOutput =  "Não conseguimos localizar seu número de atendimento em nossa base de dados, por favor, informe novamente seu número de atendimento.";
    }

    return responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
  },
};

const MenuOptionsIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "MenuOptionsIntent"
    );
  },
  handle(handlerInput) {
    const { requestEnvelope } = handlerInput;
    const category = Alexa.getSlotValue(requestEnvelope, "category");

    let speechText = `Você escolheu ${category}. `;

    let subMenuName = "";
    const categoryLowerCase = category.toLowerCase();
    if(categoryLowerCase === "enfermagem") {
      subMenuName = "NursingOptionsIntent";
    } else if(categoryLowerCase === "nutrição") {
      subMenuName = "NutritionOptionsIntent";
    } else if(categoryLowerCase.includes('quarto') || categoryLowerCase.includes('4')) {
      subMenuName = "HospitalityOptionsIntent";
    } 

    return handlerInput.responseBuilder
      .speak(speechText)
      .addDelegateDirective({
        name: subMenuName,
        confirmationStatus: "NONE",
        slots: {},
      })
      .getResponse();
  },
};

const NursingOptionsIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "NursingOptionsIntent"
    );
  },
  async handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const { requestEnvelope } = handlerInput;
    const option = Alexa.getSlot(requestEnvelope, "nursing");
    const patient = sessionAttributes.patient;
    const id = obtainId(option)
    const serviceName = obtainServiceName(option)
    
    if(id === 19) {
      const repeatMessage = 'Claro, medicamento atrasado, trocar o soro, estou com dor, tomar banho,  ir ao banheiro, trocar a fralda, outros ou repetir enfermagem.'
      return handlerInput.responseBuilder
        .speak(repeatMessage)
        .reprompt(repeatMessage)
        .getResponse();
    }

    let speechText = `Você escolheu ${serviceName}. Seu pedido foi enviado e o atenderemos o mais rápido possível. Obrigado.`;

    const { data } = await api.post('/appointments', {
      serviceId: id,
      serviceName,
      fullOption: option,
      patient,
      from: "alexa",
      where: "nursing",
    });
    
    if(!data.success) {
        const errorMessage = get(data, 'message', 'Tivemos um problema ao processar seu pedido, por favor, tente novamente.')
        return handlerInput.responseBuilder
            .speak(errorMessage)
            .reprompt(errorMessage)
            .getResponse();
    }

    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};

const HospitalityOptionsIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "HospitalityOptionsIntent"
    );
  },
  async handle(handlerInput) {
    const { requestEnvelope } = handlerInput;
    const option = Alexa.getSlot(requestEnvelope, "hospitality");
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const patient = sessionAttributes.patient;
    const id = obtainId(option)
    const serviceName = obtainServiceName(option)
    
    if(id === 18) {
      const repeatMessage = 'Claro, limpeza do quarto ou banheiro, retirar lixo, trocar lençol, mais cobertor, problema na televisão, problema no ar condicionado, outros ou repetir serviço de quarto.';
      return handlerInput.responseBuilder
        .speak(repeatMessage)
        .reprompt(repeatMessage)
        .getResponse();
    }
    
    let speechText = `Você escolheu ${serviceName}. Seu pedido foi enviado e o atenderemos o mais rápido possível. Obrigado.`;

    const { data } = await api.post('/appointments', {
      serviceId: id,
      serviceName,
      fullOption: option,
      patient,
      from: "alexa",
      where: "hospitality",
    });
    
    if(!data.success) {
        const errorMessage = get(data, 'message', 'Tivemos um problema ao processar seu pedido, por favor, tente novamente.')
        return handlerInput.responseBuilder
            .speak(errorMessage)
            .reprompt(errorMessage)
            .getResponse();
    }

    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};

const NutritionOptionsIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "NutritionOptionsIntent"
    );
  },
  async handle(handlerInput) {
    const { requestEnvelope } = handlerInput;
    const option = Alexa.getSlot(requestEnvelope, "nutrition");
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const patient = sessionAttributes.patient;
    const id = obtainId(option)
    const serviceName = obtainServiceName(option)
    
    if(id === 20) {
      const repeatMessage = 'Claro, pedido de almoço, pedido de jantar, trazer água, retirar a louça, falar com a nutricionista, outros ou repetir nutrição.';
      return handlerInput.responseBuilder
        .speak(repeatMessage)
        .reprompt(repeatMessage)
        .getResponse();
    }
    
    let speechText = `Você escolheu ${serviceName}. Seu pedido foi enviado e o atenderemos o mais rápido possível. Obrigado.`;

    const { data } = await api.post('/appointments', {
      serviceId: id,
      serviceName,
      fullOption: option,
      patient,
      from: "alexa",
      where: "nutrition",
    });
    
    if(!data.success) {
        const errorMessage = get(data, 'message', 'Tivemos um problema ao processar seu pedido, por favor, tente novamente.')
        return handlerInput.responseBuilder
            .speak(errorMessage)
            .reprompt(errorMessage)
            .getResponse();
    }

    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput = "You can say hello to me! How can I help?";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.CancelIntent" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    const speakOutput = "Até a próxima!";

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};

const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===  "AMAZON.FallbackIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput = "Sorry, I don't know about that. Please try again.";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
      "SessionEndedRequest"
    );
  },
  handle(handlerInput) {
    console.log(
      `~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`
    );
    return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
  },
};

const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
    );
  },
  handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const speakOutput = `You just triggered ${intentName}`;

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const speakOutput = "Desculpe, tive um problema ao processar seu pedido, tente novamente.";
    console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const LoggingRequestInterceptor = {
  process(handlerInput) {
    console.log(
      `Incoming request: ${JSON.stringify(handlerInput.requestEnvelope)}`
    );
  },
};

const LoggingResponseInterceptor = {
  process(handlerInput, response) {
    console.log(`Outgoing response: ${JSON.stringify(response)}`);
  },
};

function obtainId(option) {
  const id = get(
    option,
    "resolutions.resolutionsPerAuthority[0].values[0].value.id"
  );
  
  return id ? Number(id) : null;
}

function obtainServiceName(option) {
  return get(
    option,
    "resolutions.resolutionsPerAuthority[0].values[0].value.name"
  );
}

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    MenuOptionsIntentHandler,
    ServiceNumberReaderIntentHandler,
    NursingOptionsIntentHandler,
    HospitalityOptionsIntentHandler,
    NutritionOptionsIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler
  )
  .addErrorHandlers(ErrorHandler)
  .addRequestInterceptors(LoggingRequestInterceptor)
  .addResponseInterceptors(LoggingResponseInterceptor)
  .withCustomUserAgent("sample/hello-world/v1.2")
  .lambda();
