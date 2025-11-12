import {Link} from 'react-router-dom'
import { Button } from "../ui/Button"

export default function CTA() {
  return (
    <section id='about' className="bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Ready to get started?</h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Join thousands of event organizers using EventHub to connect their communities
        </p>
        <Link href="/register">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Create Your Account
          </Button>
        </Link>
      </div>
    </section>
  )
}
