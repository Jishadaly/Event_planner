import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/Button"

export default function Hero() {
    const navigate = useNavigate()
    return (
        <section className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary bg-secondary/50 px-3 py-1">
                    <span className="h-2 w-2 rounded-full bg-accent"></span>
                    <span className="text-xs sm:text-sm text-secondary-foreground">Manage events effortlessly</span>
                </div>

                {/* Headline */}
                <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-foreground" onClick={() => navigate('/dashboard')}>
                    Connect, Collaborate, Create Events
                </h1>

                {/* Subheading */}
                <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
                    All-in-one event management platform for organizers, participants, and admins. Schedule, chat, and collaborate
                    with ease.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">

                    <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto" onClick={()=> navigate('/dashboard')}>
                        Get Started Free
                    </Button>

                    <Link href="#features">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" >
                            Learn More
                        </Button>
                    </Link>
                </div>

                {/* Social Proof */}
                <div className="mt-12 flex flex-col items-center gap-2 text-sm text-muted-foreground">
                    <span>Trusted by event organizers worldwide</span>
                    <div className="flex gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-accent"></span>
                        <span className="inline-block w-2 h-2 rounded-full bg-accent"></span>
                        <span className="inline-block w-2 h-2 rounded-full bg-accent"></span>
                    </div>
                </div>
            </div>
        </section>
    )
}
