import RegisterForm from "../componets/form/RegisterForm"


export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg mx-auto mb-4">
            E
          </div>
          <h1 className="text-2xl font-bold">Create account</h1>
          <p className="text-muted-foreground mt-2">Join EventHub and start managing events</p>
        </div>

        {/* Register Form */}
        <RegisterForm />

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline font-medium">
            Sign in here
          </a>
        </div>
      </div>
    </div>
  )
}
