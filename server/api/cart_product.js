const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", require('../auth/middleware'), async (req, res, next) => {
    const { productId, quantity} = req.body;
    try {
        const openOrder = await prisma.Cart.findFirst({
            where: {
                userId: req.user.id,
                is_cart: true,
            },
            include: {
                CartProduct: true,
            },
        });
        console.log(openOrder)
        const existingProduct = openOrder.CartProduct.find(
            (i) => i.productId === productId
        );

        if (existingProduct) {
            const updatedCartProduct = await prisma.CartProduct.update({
                where: { id: existingProduct.id },
                data: {
                    quantity: existingProduct.quantity + quantity,
                },
            });

            const openOrder = await prisma.Cart.findFirst({
                where: {
                    userId: req.user.id,
                    is_cart: true,

                },
                include: {
                    CartProduct: {
                        include: {
                            Product: true,
                            }
                        },
                    }
            });


            res.send({addedToCart: openOrder.CartProduct})
        } else {
            console.log({cartId: openOrder.id,
                productId,
                quantity})
            const createdCartProduct = await prisma.CartProduct.create({
                data: {
                    cartId: openOrder.id,
                    productId,
                    quantity
                },
            });
            const updatedOrder = await prisma.Cart.findFirst({
                where: {
                    userId: req.user.id,
                    is_cart: true
                },
                include: {
                    CartProduct: true,
                },
            });
            res.send({addedToCart: updatedOrder.CartProduct})
        }
    } catch (err) {
        next(err);
    }
});
module.exports = router;