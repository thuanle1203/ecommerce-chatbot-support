const {WebhookClient, Payload} = require('dialogflow-fulfillment');

const mongoose = require('mongoose');

module.exports = app => {

  const products = require("../controller/product.controller");

    app.post('/', async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });

        function recommend(agent) {
          const productList = await products.findAll();

          console.log(productList);
        
          agent.add(new Payload(agent.UNSPECIFIED, { cards: productList }, {rawPayload: true, sendAsMessage: true}));
      }

      function fallback(agent) {
          agent.add(`I didn't understand`);
          agent.add(`I'm sorry, can you try again?`);
      }

      let intentMap = new Map();
      intentMap.set('recommend-product', recommend);
      intentMap.set('Default Fallback Intent', fallback);

      agent.handleRequest(intentMap);
  });

}