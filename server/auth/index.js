const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

router.post("/register", async (req, res, next)=>{

    const salt_rounds = 5;

    const hashedPassword = await bcrypt.hash(req.body.password, salt_rounds)

    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: hashedPassword,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                role: req.body.role,
            }
        })

        const token = jwt.sign({id:user.id}, process.env.JWT)

        res.status(201).send({token, user:{userId:user.id, username: user.username, admin: user.admin}})

    } catch (error) {
        next(error)
    }
})



router.post("/login", async (req, res, next)=>{
    const salt_rounds = 5;

    const hashedPassword = await bcrypt.hash(req.body.password, salt_rounds)
    try {
        const user = await prisma.user.findUnique({
            where:{
                username: req.body.username
            },
        })

        if(!user){
            return res.status(401).send("Invalid Login")
        }

        const isValid = bcrypt.compare(hashedPassword, user.password)

        if (!isValid){
            return res.status(401).send("Invalid Login")
        }

        const token = jwt.sign({id:user.id}, process.env.JWT)

        res.send({token, user:{userId:user.id, username: user.username, admin: user.admin}})

    } catch (error) {
        next(error)
    }
})

module.exports= router;