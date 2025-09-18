'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Wrench, Settings, Star, MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react"
import { useState, useRef } from "react"
import emailjs from '@emailjs/browser'
import Image from 'next/image'

export default function HomePage() {
  const form = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      if (form.current) {
        // Para teste, vou criar um template simples
        // Você precisará configurar estes valores no EmailJS
        const result = await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_test',
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_test', 
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key_test'
        )
        
        console.log('SUCCESS!', result.text)
        setSubmitMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.')
        form.current.reset()
      }
    } catch (error) {
      console.log('FAILED...', error)
      setSubmitMessage('Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.')
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-black">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Crosshair Solutions"
              width={120}
              height={40}
              className="h-30 w-auto"
            />
          </div>
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-12">
            <a href="#home" className="text-white hover:text-orange-400 transition-colors font-normal text-base tracking-wide">
              Home
            </a>
            <a href="#services" className="text-white hover:text-orange-400 transition-colors font-normal text-base tracking-wide">
              Services
            </a>
            <a href="#about" className="text-white hover:text-orange-400 transition-colors font-normal text-base tracking-wide">
              About
            </a>
            <a href="#reviews" className="text-white hover:text-orange-400 transition-colors font-normal text-base tracking-wide">
              Reviews
            </a>
            <a href="#contact" className="text-white hover:text-orange-400 transition-colors font-normal text-base tracking-wide">
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white hover:text-orange-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black border-t border-gray-800 z-50">
            <nav className="px-6 py-4 space-y-4">
              <a 
                href="#home" 
                className="block text-white hover:text-orange-400 transition-colors font-normal text-base tracking-wide py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#services" 
                className="block text-white hover:text-orange-400 transition-colors font-normal text-base tracking-wide py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="#about" 
                className="block text-white hover:text-orange-400 transition-colors font-normal text-base tracking-wide py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#reviews" 
                className="block text-white hover:text-orange-400 transition-colors font-normal text-base tracking-wide py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reviews
              </a>
              <a 
                href="#contact" 
                className="block text-white hover:text-orange-400 transition-colors font-normal text-base tracking-wide py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image 
            src="/hero-bg.png" 
            alt="Construction site background" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">
            Protect your home. Guaranteed.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 text-pretty">
            Home Coating and Woodpecker Protection you can trust.
          </p>
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
          >
            Get a Free Estimate
          </Button>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-6 border-2 border-orange-200 hover:border-orange-300 transition-colors">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Home Coating</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Professional exterior coating services that protect your home from weather damage and enhance its
                  appearance.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 border-orange-200 hover:border-orange-300 transition-colors">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Stucco & Repair </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Durable, professional stucco repair for a lasting finish. 
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 border-orange-200 hover:border-orange-300 transition-colors">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Exterior Maintenance</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Complete maintenance to keep your home looking new. Restore your home's exterior with high quality power washing
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <Image
                src="/workers.jpg"
                alt="Our professional team"
                width={600}
                height={320}
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About Us</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are a trusted home exterior company with over 25 years of experience protecting homes from weather
                damage and woodpecker issues. Our team of certified professionals uses only the highest quality
                materials and proven techniques.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                From initial consultation to project completion, we&apos;re committed to delivering exceptional results that
                exceed your expectations. Every job comes with our comprehensive warranty and satisfaction guarantee.
              </p>
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg"
              >
                Request a Free Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Customers Say Section */}
      <section id="reviews" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="mb-6">
                <Image
                  src="/man-smiling.jpg"
                  alt="John M."
                  width={112}
                  height={112}
                  className="w-28 h-28 rounded-full mx-auto object-cover object-center"
                />
              </div>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic leading-relaxed">
                &quot;Outstanding service from start to finish. The team was professional, punctual, and the results exceeded
                our expectations. Our home looks fantastic!&quot;
              </p>
              <p className="font-semibold text-gray-900">John M.</p>
              <p className="text-gray-500 text-sm">Homeowner</p>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <Image
                  src="/woman-smiling.jpg"
                  alt="Sarah K."
                  width={112}
                  height={112}
                  className="w-28 h-28 rounded-full mx-auto object-cover object-top"
                />
              </div>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic leading-relaxed">
                &quot;The woodpecker problem that plagued our home for years is completely solved. The coating looks great
                and has held up perfectly through all weather conditions.&quot;
              </p>
              <p className="font-semibold text-gray-900">Sarah K.</p>
              <p className="text-gray-500 text-sm">Homeowner</p>
            </div>
          </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="space-y-6">
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors placeholder-gray-800 text-gray-900"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors placeholder-gray-800 text-gray-900"
                  />
                </div>
                
                <div>
                  <input
                    type="tel"
                    name="user_phone"
                    placeholder="Phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors placeholder-gray-800 text-gray-900"
                  />
                </div>
                
                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors resize-none placeholder-gray-800 text-gray-900"
                  ></textarea>
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Request a Free Quote'}
                </Button>
                
                {submitMessage && (
                  <div className={`p-4 rounded-lg text-sm ${submitMessage.includes('sucesso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info and Map */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Phone:</p>
                  <p className="text-gray-900 font-medium">(573) 692-1943</p>
                </div>
                
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Email:</p>
                  <p className="text-gray-900 font-medium">solutionscrosshair@gmail.com</p>
                </div>
                
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Address:</p>
                  <p className="text-gray-900 font-medium">Sacramento, CA</p>
                  <p className="text-gray-900 font-medium">United States</p>
                </div>
              </div>

              {/* Interactive Map */}
              <div className="w-full h-64 rounded-lg shadow-lg overflow-hidden border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199666.5651251294!2d-121.58334177520186!3d38.56165006739519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ac672b28397f9%3A0x921f6aaa74197fdb!2sSacramento%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1639445729076!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Company Info */}
            <div>
              <div className="mb-8">
                <Image
                  src="/logo.png"
                  alt="Crosshair Solutions"
                  width={120}
                  height={64}
                  className="h-16 w-auto mb-6"
                />
              </div>
              
              <div className="space-y-6 ml-8">
                <div className="flex items-start">
                  <MapPin className="text-orange-400 w-5 h-5 mt-1 mr-2" />
                  <div>
                    <p className="font-semibold text-white mb-2">Address</p>
                    <p className="text-gray-300">Sacramento, CA</p>
                    <p className="text-gray-300">United States</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="text-orange-400 w-5 h-5 mr-3" />
                  <p className="text-gray-300">(573) 692-1343</p>
                </div>
                
                <div className="flex items-center">
                  <Mail className="text-orange-400 w-5 h-5 mr-3" />
                  <p className="text-gray-300">solutionscrosshair@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold text-white text-lg mb-8">Navigation</h4>
              <div className="space-y-4">
                <a href="#home" className="block text-gray-400 hover:text-orange-400 transition-colors text-sm uppercase tracking-wider">
                  HOME
                </a>
                <a href="#services" className="block text-gray-400 hover:text-orange-400 transition-colors text-sm uppercase tracking-wider">
                  SERVICES
                </a>
                <a href="#about" className="block text-gray-400 hover:text-orange-400 transition-colors text-sm uppercase tracking-wider">
                  ABOUT
                </a>
                <a href="#reviews" className="block text-gray-400 hover:text-orange-400 transition-colors text-sm uppercase tracking-wider">
                  REVIEWS
                </a>
                <a href="#contact" className="block text-gray-400 hover:text-orange-400 transition-colors text-sm uppercase tracking-wider">
                  CONTACT
                </a>
              </div>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="font-semibold text-white text-lg mb-8">Follow us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-400 transition-all duration-300 group">
                  <Facebook className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-400 transition-all duration-300 group">
                  <Instagram className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2025 Crosshair Solutions. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
