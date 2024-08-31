import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create or update users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'alice@example.com' },
      update: {},
      create: {
        name: 'Alice',
        email: 'alice@example.com',
        credits: 10,
        subscriptionStatus: 'active',
        subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        stripeCustomerId: 'cus_alice123',
        stripeSubscriptionId: 'sub_alice456',
      },
    }),
    prisma.user.upsert({
      where: { email: 'bob@example.com' },
      update: {},
      create: {
        name: 'Bob',
        email: 'bob@example.com',
        // Other fields will use default values
      },
    }),
  ])

  // Create items for each user
  const items = await Promise.all([
    prisma.item.create({
      data: {
        name: 'Alice\'s first item',
        userId: users[0].id,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Alice\'s second item',
        userId: users[0].id,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Bob\'s item',
        userId: users[1].id,
      },
    }),
  ])

  console.log({ users, items })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
