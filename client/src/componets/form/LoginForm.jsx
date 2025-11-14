import React, { useState } from "react"
import { Button } from "../ui/Button"
import { Card } from "../ui/Card"
import { Input } from "../ui/Input"
import { loginSchema } from "../../validations/loginValidation"
import { InputField } from "./InputField"
import { FormError } from "../ui/FormError"
import { useFormValidation } from "../../hooks/useFormValidator"
import { useDispatch } from "react-redux"
import { useToast } from "../../context/ToastContext"
import { loginUser } from "../../global/authServices"
import { useNavigate } from "react-router-dom"

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const { errors, validate, clearError } = useFormValidation(loginSchema)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    clearError(name)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const isValid = await validate(formData)
      if (!isValid) return
      setIsLoading(true)
      await dispatch(loginUser(formData)).unwrap()
      toast("success", "Login Successful", "Welcome to Event Hub")
      navigate("/dashboard", { replace: true });

    } catch (err) {
      toast("error", "Login Failed", err.message || "Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">

        <InputField
          id="email"
          name="email"
          type="emial"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "border-destructive" : ""}
          error={errors.email}
          label="Email"
        />

        <InputField
          label="Password"
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? "border-destructive" : ""}
          error={errors.password}
        />

        {errors.submit && (
          <FormError className="p-3 bg-destructive/10 text-destructive text-sm rounded-md" children={errors.submit} />)}

        <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

    </Card>
  )
}