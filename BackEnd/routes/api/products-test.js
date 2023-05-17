const { Router } = require("express")
const mock = require('../../controllers/mock/fakermock')
const productsRouterTest = Router();

productsRouterTest.get('/', async (req, res) => {
    const products = await mock.getAll();

    res.json(products);
})


module.exports = productsRouterTest;

