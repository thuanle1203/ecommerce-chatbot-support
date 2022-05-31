const {WebhookClient, Payload} = require('dialogflow-fulfillment');

const mongoose = require('mongoose');

module.exports = app => {
    app.post('/', async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });

        function snoopy(agent) {
            agent.add(`Welcome to my Snoopy fulfillment!`);
            agent.add(new Payload(agent.UNSPECIFIED, {
                "cards": [
                    {
                    "link": "",
                    "description": "abcabcabcabc abcabcabcabc abcabcabcabc",
                    "price": "10$",
                    "header": "Chatbots",
                    "image": "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png"
                    },
                    {
                    "price": "10$",
                    "link": "",
                    "image": "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png",
                    "description": "abcabcabcabc abcabcabcabc abcabcabcabc",
                    "header": "Chatbots"
                    },
                    {
                    "link": "",
                    "header": "Chatbots",
                    "price": "10$",
                    "image": "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png",
                    "description": "abcabcabcabc abcabcabcabc abcabcabcabc"
                    }
                ]
            }, {rawPayload: true, sendAsMessage: true}));
        }

        async function registration(agent) {

            const registration = new Registration({
                name: agent.parameters.name,
                address: agent.parameters.address,
                phone: agent.parameters.phone,
                email: agent.parameters.email,
                dateSent: Date.now()
            });
            try{
                let reg = await registration.save();
                console.log(reg);
            } catch (err){
                console.log(err);
            }
        }

        async function learn(agent) {

            Demand.findOne({'course': agent.parameters.courses}, function(err, course) {
                if (course !== null ) {
                    course.counter++;
                    course.save();
                } else {
                    const demand = new Demand({course: agent.parameters.courses});
                    demand.save();
                }
            });
            let responseText = `You want to learn about ${agent.parameters.courses}. 
                    Here is a link to all of my courses: https://www.udemy.com/user/jana-bergant`;

            let coupon = await Coupon.findOne({'course': agent.parameters.courses});
            if (coupon !== null ) {
                responseText = `You want to learn about ${agent.parameters.courses}. 
                Here is a link to the course: ${coupon.link}`;
            }

            agent.add(responseText);
        }

        function fallback(agent) {
            agent.add(`I didn't understand`);
            agent.add(`I'm sorry, can you try again?`);
        }

        let intentMap = new Map();
        intentMap.set('snoopy', snoopy);
        intentMap.set('learn-course', learn);
        intentMap.set('recommend-course - yes', registration);
        intentMap.set('Default Fallback Intent', fallback);

        agent.handleRequest(intentMap);
    });

}