const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/', async (req,res,next)=>{
    try{
        const allCarts = await prisma.cart.findMany();
        res.send(allCarts)
    }catch(error){
        next(error)
    }
})

router.get('/orders/:id', async (req, res, next) => {
   console.log(req.params.id)
    try {
        const orders = await prisma.user.findUnique({
            where:{
                id: Number(req.params.id)
            },
            include:{
                Cart: true
            }
        });
        res.send(orders.Cart.filter((i)=> i.is_cart === false))
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req,res,next)=>{
    try{
        const userById = await prisma.user.findUnique({
            where:{
                id: Number(req.params.id)
            },
            include:{
                Cart: true
            }
        });
        res.send(userById.Cart.find((i)=> i.is_cart === true))
    }catch(error){
        next(error)
    }
})


router.post('/', async (req,res,next)=>{
    try{
        const cart = await prisma.cart.create({
            data: req.body
        })
        res.send(cart)
    }catch(error){
        next(error)
    }
})


router.delete('/:id', async (req,res,next)=>{
    try{
        const cart = await prisma.cart.delete({
            where:{
                id: Number(req.params.id)
            }
        });
        res.send(cart)
    }catch(error){
        next(error)
    }
})


router.put('/:id', async (req,res,next)=>{
    try{
        const cart = await prisma.cart.update({
            where:{
                id: Number(req.params.id)
            },
            data:req.body
        })
        res.send(cart)
    }catch(error){
        next(error)
    }
})

module.exports = router;