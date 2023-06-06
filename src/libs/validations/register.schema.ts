import * as yup from 'yup'

export const registerSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(5).max(60).required('Password is required'),
    passwordConfirmation: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Password and confirm password does not match')
  })
  .required()
