import React from 'react'
import { Link } from 'react-router-dom'

export default function Logo({ to = '/' }) {
    return (
        <Link className="flex items-center gap-2 cursor-pointer" to={to}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                E
            </div>
            <span className="font-semibold text-lg hidden sm:inline">EventHub</span>
        </Link>
    )
}
