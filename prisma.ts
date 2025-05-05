import { prisma } from '@/lib/db'

async function fetchPlaygrounds() {
  return await prisma.playground.findMany()
}

async function fetchBookings() {
  return await prisma.booking.findMany({
    include: {
      playground: true,
      user: true
    }
  })
}

export { fetchPlaygrounds, fetchBookings }