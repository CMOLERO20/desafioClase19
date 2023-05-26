const { Router } =  require("express");   
const routerProducts = Router();
const handlePolicies = require("../middleware/handle-policies.middleware")

const {getProducts,getProductById,addProduct,deleteProduct,updateProduct} = require("../controllers/productController")

routerProducts.get('/', getProducts)

routerProducts.get('/:pid', getProductById );

routerProducts.post('/',handlePolicies(['ADMIN','PREMIUM']), addProduct)

routerProducts.put('/:pid',handlePolicies(['ADMIN','PREMIUM']), updateProduct)

routerProducts.delete('/:pid',handlePolicies(['ADMIN','PREMIUM']),deleteProduct)


module.exports = routerProducts;