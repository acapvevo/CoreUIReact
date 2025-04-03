import { z } from "zod";

export type CaptchaInput = z.infer<typeof CaptchaScheme>
export const CaptchaScheme = z.object({
    isCaptcha: z.boolean().refine((value) => value, {
        params: { i18n: 'recaptcha_incomplete' },})
}).required()