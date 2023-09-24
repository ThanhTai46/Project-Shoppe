import * as yup from 'yup'
const handleConfirmPasswordYup = (refString: string) => {
    return yup
        .string()
        .required('Nhập lại password là bắt buộc')
        .min(6, 'Độ dài từ 6 - 160 ký tự')
        .max(160, 'Độ dài từ 6 - 160 ký tự')
        .oneOf([yup.ref(refString)], 'Nhập lại password không khớp')
}
import { registerSchema } from "./register.schema"
export const userSchema = yup.object({
    name: yup.string().max(160, "Độ dài tối đa 160 ký tự"),
    phone: yup.string().max(20, "Độ dài tối đa 20 ký tự"),
    address: yup.string().max(160, "Độ dài tối đa 160 ký tự"),
    avatar: yup.string().max(1000, "Độ dài tối đa 1000 ký tự"),
    date_of_birth: yup.date().max(new Date(), "Hãy chọn ngày quá khứ"),
    password: registerSchema.fields['password'],
    new_password: registerSchema.fields['password'],
    confirm_password: handleConfirmPasswordYup('new_password')
})

export type TUserSchema = yup.InferType<typeof userSchema>;