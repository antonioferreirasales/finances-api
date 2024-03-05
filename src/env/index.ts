import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test']).default('production'),
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3333),
})

export const env = envSchema.parse(process.env)
