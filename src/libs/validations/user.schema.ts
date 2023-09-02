import * as yup from 'yup'

import { registerSchema } from "./register.schema"
export const userSchema = yup.object({
    name: yup.string().max(160, "Độ dài tối đa 160 ký tự"),
    phone: yup.string().max(20, "Độ dài tối đa 20 ký tự"),
    address: yup.string().max(160, "Độ dài tối đa 160 ký tự"),
    avatar: yup.string().max(1000, "Độ dài tối đa 1000 ký tự"),
    date_of_birth: yup.date().max(new Date(), "Hãy chọn ngày quá khứ"),
    password: registerSchema.fields['password'],
    new_password: registerSchema.fields['password'],
    confirm_password: registerSchema.fields["passwordConfirmation"]
})

export type TUserSchema = yup.InferType<typeof userSchema>;