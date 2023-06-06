import { registerSchema } from './register.schema'

export const signInSchema = registerSchema.omit(['passwordConfirmation'])
