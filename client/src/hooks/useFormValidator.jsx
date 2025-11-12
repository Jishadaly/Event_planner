import { useState } from "react"

export const useFormValidation = (schema) => {
  const [errors, setErrors] = useState({})

  const validate = async (values) => {
    try {
      await schema.validate(values, { abortEarly: false })
      setErrors({})
      return true
    } catch (err) {
      const newErrors = {}
      err.inner.forEach((e) => {
        newErrors[e.path] = e.message
      })
      setErrors(newErrors)
      return false
    }
  }

  const clearError = (name) => {
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  return { errors, validate, clearError }
}
