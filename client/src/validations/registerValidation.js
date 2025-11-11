// src/validations/registerValidation.js
import * as Yup from "yup"

export const registerSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),

  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Please confirm your password"),

  role: Yup.string().oneOf(["participant", "organizer"]).required(),
})
