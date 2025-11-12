import React from 'react'
import Header from '../componets/landing/Header'
import CTA from '../componets/landing/CTA'
import Hero from '../componets/landing/Hero'
import Footer from '../componets/landing/Footer'
import Features from '../componets/landing/Features'

export default function Home() {
    return (
        <div className='min-h-screen bg-background'>
            <Header />
            <Hero />
            <Features/>
            <CTA />
            <Footer />
        </div>
    )
}
