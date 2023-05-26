const { Router } =  require("express");   
const {purchase,getCarts,getCartsById,createCart,addProduct,deleteProducts,checkStock} = require('../controllers/cartController')
const handlePolicies = require("../middleware/handle-policies.middleware")

const routerCarts = Router();


routerCarts.get('/', getCarts);
routerCarts.post('/', createCart);
routerCarts.get('/checkStock', checkStock)
routerCarts.get('/:cid', getCartsById);
routerCarts.post('/:cid/product/:pid', handlePolicies(["USER","PREMIUM"]), addProduct);
routerCarts.delete('/:cid/product/:pid', deleteProducts);
routerCarts.get('/:cid/purchase', purchase);


module.exports = routerCarts;