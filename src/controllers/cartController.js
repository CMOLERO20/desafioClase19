const CartDao = require("../dao/cartDao");
const ProductDao = require("../dao/productDao");

const productService = new ProductDao()
const cartService = new CartDao();

const getCarts = async(req,res) =>{
    try {
        const data = await cartService.getCarts();
        if(!data){
            return res.status(500).json({
                message: 'something was wrong in GatCarts'
            })
        }
        return res.json({
            message: 'GetCarts',
            carts: data
        })
    } catch (error) {
        console.log("🚀 ~ file: cartManager.js:9 ~ getCarts ~ error:", error)
        
    }
}

const getCartsById = async(req,res) =>{
    try {
        const {cid} = req.params
        const data = await cartService.getCartById(cid);
        if(!data){
            return res.status(500).json({
                message: 'something was wrong in GetCartsByid'
            })
        }
        return res.json({
            message: 'GetCartById',
            cart: data
        })
    } catch (error) {
        console.log("🚀 ~ file: cartManager.js:37 ~ getCartsById ~ error:", error)
        
        
    }

}

const createCart = async(req,res) =>{
    try {
        const uid = req.session.user.id;
        
        const data = await cartService.createCart(uid);
        if(!data){
            return res.status(500).json({
                message: 'something was wrong in createCart'
            })
        }
        return res.json({
            message: 'createCart',
            carts: data
        })
    } catch (error) {
        console.log("🚀 ~ file: cartManager.js:57 ~ createCart ~ error:", error)
        
        
    }
}

const addProduct = async(req,res) =>{
    try {
        const {cid,pid} = req.params
        const userId = req.session.user.id
        let cart = await cartService.getCartById(cid);
        if(cart.user !== userId){return res.status(400).json({
            message: 'not user from cart'
        })}
        let product = await productService.getProductById(pid);
        if(product.owner == userId){return res.status(400).json({
            message: 'cannot add a product from your ownership'
        })}

        const data = await cartService.addProduct(cid,pid);
        if(!data){
            return res.status(500).json({
                message: 'something was wrong in AddProduct'
            })
        }
        return res.json({
            message: 'AddProduct',
            cart: data
        })
    } catch (error) {
        console.log("🚀 ~ file: cartManager.js:77 ~ addProduct ~ error:", error)
         
    }

}

const deleteProducts = async(req,res) =>{
    try {
        const {cid,pid} = req.params
        const data = await cartService.deleteProduct(cid,pid);
        if(!data){
            return res.status(500).json({
                message: 'something was wrong in deleteProduct'
            })
        }
        return res.json({
            message: 'deleteProduct',
            cart: data
        })
    } catch (error) {
       console.log("🚀 ~ file: cartManager.js:97 ~ deleteProducts ~ rror:", rror)
       
         
    }

}

const checkStock = async(producto) =>{
    
    const stockProduct = await productService.getProductById(producto.product)
   return (stockProduct.stock > producto.quantity) 
}

const purchase = async(req,res)=>{
    try {
        const {cid} = req.params;
        const cartData = await cartService.getCartById(cid);
        if(!cartData){return res.status(500).json({
            message: 'something was wrong in GetCartsByid'
        })}
        
    const productosEnStock = cartData.products.filter((product)=>{
     return  checkStock(product);
    })
    
    res.json({cart : cartData,id: cid, checkStock : productosEnStock})
    } catch (error) {
        console.log("🚀 ~ file: cartController.js:127 ~ purchase ~ error:", error)
        
    }
}



module.exports = {getCarts,getCartsById,createCart,purchase,addProduct,deleteProducts, checkStock};