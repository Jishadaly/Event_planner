import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 mb-8 sm:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                                E
                            </div>
                            <span className="font-semibold">EventHub</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Manage events, connect communities</p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="mb-4 font-semibold text-sm">Product</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition">
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold text-sm">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold text-sm">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition">
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition">
                                    Terms
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-border pt-8 flex items-center justify-between text-sm text-muted-foreground">
                    <p>&copy; 2025 EventHub. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-foreground transition">
                            Twitter
                        </Link>
                        <Link href="#" className="hover:text-foreground transition">
                            GitHub
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
