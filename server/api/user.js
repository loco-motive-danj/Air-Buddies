const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/', async (req,res,next)=>{
    try{
        const allUser = await prisma.user.findMany();
        res.send(allUser)
    }catch(error){
        next(error)
    }
})

router.get('/:id', async (req,res,next)=>{
    try{
        const userById = await prisma.user.findUnique({
            where:{
                id: Number(req.params.id)
            }
        });
        res.send(userById)
    }catch(error){
        next(error)
    }
})

router.get('/user/:id', async (req, res, next) =>{
    try {
        const allCarts = await prisma.cart.findMany({
            where: {
                userId: Number(req.params.id)
            }
        });
        res.send(allCarts)
    } catch (error) {
        next(error)
    }
})

router.get('/user/:id/cart', async (req, res, next) =>{
    try {
        const allCarts = await prisma.cart.findMany({
            where: {
                userId: Number(req.params.id),
                is_cart: true,
            },
        });
        res.send(allCarts)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req,res,next)=>{
    try{
        const user = await prisma.user.delete({
            where:{
                id: Number(req.params.id)
            }
        });
        res.send(user)
    }catch(error){
        next(error)
    }
})

router.post('/', async (req,res,next)=>{
    try{
        const user = await prisma.user.create({
            data:req.body
        })
        res.send(user)
    }catch(error){
        next(error)
    }
})


router.put('/:id', async (req,res,next)=>{
    try{
        const user = await prisma.user.update({
            where:{
                id: Number(req.params.id)
            },
            data:req.body
        })
        res.send(user)
    }catch(error){
        next(error)
    }
})

module.exports = router;