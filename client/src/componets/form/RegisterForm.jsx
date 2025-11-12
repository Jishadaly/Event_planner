import { useState } from "react"
import { Button } from "../ui/Button"
import { Card } from "../ui/Card"
import { useDispatch } from "react-redux"
import { registerUser } from "../../global/authServices"
import { registerSchema } from "../../validations/registerValidation"
import { useToast } from "../../context/ToastContext"
import { useFormValidation } from "../../hooks/useFormValidator"
import { InputField } from "./InputField"
import { FormError } from "../ui/FormError"

export default function RegisterForm() {
  const dispatch = useDispatch()
  const { showToast } = useToast()
  const { errors, validate, clearError } = useFormValidation(registerSchema)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "participant",
  })


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    clearError(name)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const isValid = await validate(formData)
    if (!isValid) return

    setIsLoading(true)
    try {
      const payload = { ...formData, name: formData.fullName }
      delete payload.fullName

      const res = await dispatch(registerUser(payload)).unwrap()
      console.log(res)
      showToast("success", "Registration Successful", "Your account has been created")
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.log(err, "cachedd")
      showToast("error", "Registration Failed", err.message || "Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/** Full Name */}
        <InputField
          label="Full Name"
          id="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="John Doe"
        />

        {/** Email */}
        <InputField
          label="Email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          type="email"
          placeholder="you@example.com"
        />

        {/** Password */}
        <InputField
          label="Password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          type="password"
          placeholder="••••••••"
        />

        {/** Confirm Password */}
        <InputField
          label="Confirm Password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          type="password"
          placeholder="••••••••"
        />

        {/** Role */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-1">
            I want to
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
          >
            <option value="participant">Join events as a participant</option>
            <option value="organizer">Create and organize events</option>
          </select>
        </div>

        {errors.submit && (
          <FormError children={errors.submit} className="p-3 bg-destructive/10 text-destructive text-sm rounded-md" />
        )}

        <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By signing up, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </form>
    </Card>
  )
}
