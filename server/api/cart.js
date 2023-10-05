const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/orders/:id', require('../auth/middleware'), async (req, res, next) => {
    console.log(req.params.id)
     try {
         const orders = await prisma.user.findUnique({
             where:{
                 id: Number(req.params.id)
             },
             include: {
                 Cart: {
                     include: {
                         CartProduct: true
                     }
                 }
             }
     });
         res.send(orders.Cart.filter((i)=> i.is_cart === false));
     }catch (error) {
         next(error)
     }
 })

router.get('/:id', require('../auth/middleware'), async (req,res,next)=>{
    try{
        const userById = await prisma.user.findUnique({
            where:{
                id: Number(req.params.id)
            },
            include: {
                Cart: {
                    where: {
                        is_cart: true
                    },
                    include: {
                        CartProduct: true
                    }
                }
            }
        });
        res.send(userById)
    }catch(error){
        next(error)
    }
})

// router.post('/:productId/CartProduct', async (req,res,next)=>{
//     try{
//         const ProductToActiveCart= await prisma.CartProduct.create({
//             data: req.body,
//             productId: Number(req.params.productId)
//         })
//         res.send(ProductToActiveCart)
//     }catch(error){
//         next(error)
//     }
// })
router.put("/submit", require('../auth/middleware'), async (req, res, next) => {

    try {
        async function findOpenOrder() {
            const openOrder = await prisma.Cart.findFirst({
                where: {
                    userId: req.user.id,
                    is_cart: true,
                },
            });
            console.log(openOrder)
            return openOrder.id;
        }
        async function closeOrder() {
            const ClosedOrder = await prisma.Cart.update({
                where: {
                    id: await findOpenOrder(),
                },
                data: {
                    is_cart: true,
                },
            });
        }

        closeOrder();

        const NewOrder = await prisma.Cart.create({
            data: {
                userId: req.user.id,
                is_cart: false,
            },
        });

        res.send({ NewOrder});
    } catch (err) {
        next(err);
    }
});

module.exports = router;


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