const express=require("express")
const cartRouter=express.Router()
const {cartmodel}=require("../user.model.js/cart.model")

cartRouter.post("/addtocart", async (req, res) => {
    try {
        const data=new cartmodel(req.body);
        await data.save();
        console.log(req.body)
        res.status(200).send({ "msg": "New product added to cart" })

    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})
cartRouter.delete("/deletefromcart/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await cartmodel.findByIdAndDelete(id);
        res.status(200).send({ "msg": "Product deleted from cart" });
    } catch (err) {
        res.status(400).send({ "msg": err.message });
    }
});
module.exports={cartRouter}