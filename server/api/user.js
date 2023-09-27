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
        const user = await prisma.cart.create({
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