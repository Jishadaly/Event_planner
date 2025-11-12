

import { Link } from "react-router-dom"
import LoginForm from "../componets/form/LoginForm"
import Header from "../componets/landing/Header"
import ThemeToggle from "../componets/ui/ThemeToggle"

export default function LoginPage() {
  return (
    // <div className="min-h-screen flex items-center justify-center bg-background px-4 relative">

    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg mx-auto mb-4">
          E
        </div>
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground mt-2">
          Sign in to your EventHub account
        </p>
      </div>

      {/* Login Form */}
      <LoginForm />

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary hover:underline font-medium">
          Sign up here
        </Link>
      </div>
    </div>
    // </div>
  )
}
