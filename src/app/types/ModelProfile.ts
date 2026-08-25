import z from "zod";
import { AiServiceSchema } from "./AiService";

export const ModelProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  aiService: AiServiceSchema,
  serviceUrl: z.string(),
  apiKey: z.string(),
  isProxyEnabled: z.boolean().default(false),
  model: z.string(),
  temperature: z.number().min(0.0).max(2.0).default(0.5)
});


export type ModelProfile = z.infer<typeof ModelProfileSchema>;
