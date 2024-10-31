// src/app/api/user/count/route.ts

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

// Handle GET requests
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId') // Retrieve userId from query params
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }
  const userRecord = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  })
  return NextResponse.json({ count: userRecord?.count || 0 })
}

// Handle POST requests
export async function POST(req: NextRequest) {
  const { count, userId } = await req.json() // Retrieve JSON body data
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  await prisma.user.update({
    where: { clerkUserId: userId },
    data: { count },
  })

  // Use a 200 status with a JSON response message
  return NextResponse.json(
    { message: 'Count updated successfully' },
    { status: 200 }
  )
}
