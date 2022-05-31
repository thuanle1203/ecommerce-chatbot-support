const {WebhookClient, Payload} = require('dialogflow-fulfillment');

const mongoose = require('mongoose');
const CategoryService = require('../service/category.service');
const CustomerService = require('../service/customer.service');
const CartService = require('../service/cart.service');
const Demand = mongoose.model('demand');
const Coupon = mongoose.model('coupon');
const Registration = mongoose.model('registration');
const ProductService = require('../service/product.service')

module.exports = app => {
    const products = require("../controller/product.controller");

    app.post('/', async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });

        async function addToCart(agent) {
            const customer = await CustomerService.findByData({ sessionId: agent.parameters.sessionId });

            const cart = await CartService.findByData({ customerId: customer._id });
            
            if (cart) {
                let isHaveInCart = false;
                const productList = cart.productList.map(product => {
                    if (product.productId === agent.parameters.productId) {
                        isHaveInCart = true;
                        return { 
                            productId: agent.parameters.productId, 
                            quantity: agent.parameters.quantity
                        }
                    } else {
                        return product;
                    }
                });

                if (!isHaveInCart) {
                    productList.push({ 
                        productId: agent.parameters.productId, 
                        quantity: agent.parameters.quantity
                    })
                }
                CartService.updateById(cart._id, { productList: productList });
            } else {
                const cart = await CartService.create({ 
                    customerId: customer._id, 
                    productList: [{ 
                        productId: agent.parameters.productId, 
                        quantity: agent.parameters.quantity
                    }] 
                });
            }

            let responseText = `Added to card`
            agent.add(responseText);
            agent.add(new Payload(agent.UNSPECIFIED, { 
                text: 'What do you want next?',
                quick_replies: [
                    {
                        text: 'Buy more',
                        payload: 'shopping',
                    },
                    {
                        text: 'Payment',
                        payload: 'payment',
                    },
                    {
                        text: 'View cart',
                        payload: 'view_cart',
                    }
                ] 
            }, {rawPayload: true, sendAsMessage: true}))
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

        async function recommend(agent) {
            const productList = await ProductService.findAll();

            agent.add(new Payload(agent.UNSPECIFIED, { cards: productList }, {rawPayload: true, sendAsMessage: true}));
        }

        async function getCategory(agent) {
            const categoryList = await CategoryService.findAll();

            const quickRepliesCate = categoryList.map(category => {
                return {
                    text: category.name,
                    code: category.code,
                    payload: 'shopping - choose category'
                }
            }) 

            agent.add(new Payload(agent.UNSPECIFIED, { 
                text: 'Please choose category you want?',
                quick_replies: quickRepliesCate 
            }, {rawPayload: true, sendAsMessage: true}))
        }

        async function getProductByCategory(agent) {
            const productList = await ProductService.findByCategoryName(agent.parameters.categoryName);

            agent.add(new Payload(agent.UNSPECIFIED, { cards: productList }, {rawPayload: true, sendAsMessage: true}));
        }

        async function searchProductByName(agent) {
            const productList = await ProductService.searchByName(agent.parameters.searchInput);

            console.log(productList, agent.parameters.searchInput);

            agent.add(new Payload(agent.UNSPECIFIED, { cards: productList }, {rawPayload: true, sendAsMessage: true}));
        }

        function fallback(agent) {
            agent.add(`I didn't understand`);
            agent.add(`I'm sorry, can you try again?`);
        }

        let intentMap = new Map();
        intentMap.set('shopping - search by name', searchProductByName);
        intentMap.set('add to cart', addToCart);
        intentMap.set('shopping - choose category', getCategory);
        intentMap.set('shopping - product by category', getProductByCategory);
        intentMap.set('Default Welcome Intent', recommend);
        intentMap.set('recommend-product', recommend);
        intentMap.set('welcome - yes', recommend);
        intentMap.set('learn-course', learn);
        intentMap.set('recommend-course - yes', registration);
        intentMap.set('Default Fallback Intent', fallback);

        agent.handleRequest(intentMap);
    });

}