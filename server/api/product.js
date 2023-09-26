const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/', async (req,res,next)=>{
    try{
        const allProducts = await prisma.product.findMany();
        res.send(allProducts)
    }catch(error){
        next(error)
    }
})

router.get('/:id', async (req,res,next)=>{
    try{
        const productId = await prisma.product.findUnique({
            where:{
                id: Number(req.params.id)
            }
        });
        res.send(productId)
    }catch(error){
        next(error)
    }
})

router.delete('/:id', async (req,res,next)=>{
    try{
        const product = await prisma.product.delete({
            where:{
                id: Number(req.params.id)
            }
        });
        res.send(product)
    }catch(error){
        next(error)
    }
})

router.post('/', async (req,res,next)=>{
    try{
        const product = await prisma.product.create({
            data:req.body
        })
        res.send(product)
    }catch(error){
        next(error)
    }
})

router.post('/product/:id', async (req,res,next)=>{
    try{
        const user = await prisma.cart.create({
            where:{
                product_id: req.body
            }
        })
        res.send(user)
    }catch(error){
        next(error)
    }
})


router.put('/:id', async (req,res,next)=>{
    try{
        const product = await prisma.product.update({
            where:{
                id: Number(req.params.id)
            },
            data:req.body
        })
        res.send(product)
    }catch(error){
        next(error)
    }
})

module.exports = router;