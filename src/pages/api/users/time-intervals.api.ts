import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '~/lib/prisma'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).end()
  }

  const { intervals } = timeIntervalsBodySchema.parse(req.body)

  await prisma.userTimeInterval.createMany({
    data: intervals.map((interval) => ({
      week_day: interval.weekDay,
      time_end_in_minutes: interval.endTimeInMinutes,
      time_start_in_minutes: interval.startTimeInMinutes,
      user_id: session.user?.id,
    })),
  })

  return res.status(201).end()
}