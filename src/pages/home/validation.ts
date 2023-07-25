import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const cycleTimerValidationSchema = z.object({
    project: z.string().min(3),
    durationInMinutes: z.number().min(5).max(60)
})

export const validationResolver = zodResolver(cycleTimerValidationSchema)
