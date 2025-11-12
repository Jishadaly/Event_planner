import React, { useState } from "react"
import { Button } from "../ui/Button"
import { Card } from "../ui/Card"
import { Input } from "../ui/Input"
import { loginSchema } from "../../validations/loginValidation"

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await loginSchema.validate(formData, { abortEarly: false })
      setErrors({})
      setIsLoading(true)
      console.log("Login attempt:", formData)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (err) {
      if (err.inner) {
        const newErrors = {}
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message
        })
        setErrors(newErrors)
      } else {
        setErrors({ submit: "Login failed. Please try again." })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "border-destructive" : ""}
          />
          {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
            {errors.submit}
          </div>
        )}

        {/* Submit Button */}
        <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>

        {/* Forgot Password */}
        <div className="text-center">
          <button type="button" className="text-sm text-primary hover:underline">
            Forgot password?
          </button>
        </div>
      </form>
    </Card>
  )
}