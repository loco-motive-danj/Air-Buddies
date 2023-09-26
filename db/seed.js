const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');

async function seed() {
    console.log("Clearing the previous database")
    //delete order important here
    await prisma.product.deleteMany()
    await prisma.cartProduct.deleteMany()
    await prisma.cart.deleteMany()
    await prisma.user.deleteMany()
    
    console.log("Seeding the database")
    
    for (let i = 0; i < 3; i++) {
        await prisma.user.create({
            data: {
                username: faker.internet.userName(),
                password: faker.internet.password(),
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                role: "user"//user or Admin
            }
        })

        await prisma.product.create({
            data: {
                name: (faker.commerce.productAdjective() + " Air"),
                price: faker.number.float({ precision: 0.01 }),
                image_url: faker.image.urlLoremFlickr({ category: 'can' }),
                description: faker.lorem.sentence(),
                country_of_origin: "US"
            }
        })
    }
    
    console.log("Database seeded")
}

seed().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})

