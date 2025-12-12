'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Wrench, Settings, Star, MapPin, Phone, Mail, Facebook, Instagram, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useRef } from "react"
import emailjs from '@emailjs/browser'
import * as gtag from '../lib/gtag'

export default function HomePage() {
  const form = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Array de imagens para o carrossel
  const workImages = [
    { src: '/work1.png', alt: 'Project 1' },
    { src: '/work2.png', alt: 'Project 2' },
    { src: '/work3.png', alt: 'Project 3' },
    { src: '/work6.png', alt: 'Project 6' },
    { src: '/work8.png', alt: 'Project 8' },
    { src: '/work9.png', alt: 'Project 9' },
    { src: '/work10.png', alt: 'Project 10' },
    { src: '/work11.png', alt: 'Project 11' },
    { src: '/work12.png', alt: 'Project 12' },
    { src: '/work13.jpeg', alt: 'Project 13' },
    { src: '/work14.jpeg', alt: 'Project 14' },
    { src: '/work15.jpeg', alt: 'Project 15' },
    { src: '/work16.jpeg', alt: 'Project 16' },
    { src: '/work17.jpeg', alt: 'Project 17' },
  ]

  const nextImage = () => {
    // Track carousel navigation
    gtag.event({
      action: 'click',
      category: 'Gallery',
      label: 'Next Image'
    })
    setCurrentImageIndex((prev) => (prev + 1) % workImages.length)
  }

  const prevImage = () => {
    // Track carousel navigation
    gtag.event({
      action: 'click',
      category: 'Gallery',
      label: 'Previous Image'
    })
    setCurrentImageIndex((prev) => (prev - 1 + workImages.length) % workImages.length)
  }

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    // Track form submission
    gtag.event({
      action: 'form_submit',
      category: 'Contact',
      label: 'Contact Form'
    })

    try {
      if (form.current) {
        // Envia o e-mail para você (original)
        const result = await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_test',
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_test', 
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key_test'
        )
        console.log('SUCCESS!', result.text)
        setSubmitMessage('Message sent successfully! We will get in touch soon.')
        // Track successful form submission
        gtag.event({
          action: 'form_success',
          category: 'Contact',
          label: 'Contact Form Success'
        })

        // Envia o e-mail de confirmação para o cliente
        const formData = new FormData(form.current)
        const userEmail = formData.get('user_email') as string
        const userName = formData.get('user_name') as string

            await emailjs.send(
              process.env.NEXT_PUBLIC_EMAILJS_CONFIRM_SERVICE_ID || 'service_test',
              process.env.NEXT_PUBLIC_EMAILJS_CONFIRM_TEMPLATE_ID || 'template_confirm',
              {
                to_email: userEmail,
                to_name: userName,
                message: 'Obrigado por entrar em contato! Recebemos sua mensagem e retornaremos em breve.'
              },
              process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key_test'
            )

        form.current.reset()
      }
    } catch (error) {
      console.log('FAILED...', error)
      setSubmitMessage('Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.')
      // Track form error
      gtag.event({
        action: 'form_error',
        category: 'Contact',
        label: 'Contact Form Error'
      })
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
            <img
              src="/logo.png"
              alt="Crosshair Solutions"
              className="h-10 md:h-12 w-auto cursor-pointer"
              onClick={() => {
                gtag.event({
                  action: 'click',
                  category: 'Navigation',
                  label: 'Logo Click'
                })
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
              }}
            />
          </div>
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-12">
            <a href="#home" className="text-white hover:text-orange-400 transition-colors font-normal text-base tracking-wide"
               onClick={() => gtag.event({ action: 'click', category: 'Navigation', label: 'Home' })}>
              Home
            </a>
            <a href="#services" className="text-white hover:text-orange-400 transition-colors font-normal text-base tracking-wide"
               onClick={() => gtag.event({ action: 'click', category: 'Navigation', label: 'Services' })}>
              Services
            </a>
            <a href="#about" className="text-white hover:text-orange-400 transition-colors font-normal text-base tracking-wide"
               onClick={() => gtag.event({ action: 'click', category: 'Navigation', label: 'About' })}>
              About
            </a>
             <a href="#work" className="text-white hover:text-orange-400 transition-colors font-normal text-base tracking-wide"
                onClick={() => gtag.event({ action: 'click', category: 'Navigation', label: 'Our Work' })}>
              Our Work
            </a>
            <a href="#reviews" className="text-white hover:text-orange-400 transition-colors font-normal text-base tracking-wide"
               onClick={() => gtag.event({ action: 'click', category: 'Navigation', label: 'Reviews' })}>
              Reviews
            </a>
            <a href="#contact" className="text-white hover:text-orange-400 transition-colors font-normal text-base tracking-wide"
               onClick={() => gtag.event({ action: 'click', category: 'Navigation', label: 'Contact' })}>
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white hover:text-orange-400 transition-colors"
            onClick={() => {
              gtag.event({
                action: 'click',
                category: 'Navigation',
                label: 'Mobile Menu Toggle'
              })
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }}
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
                onClick={() => {
                  gtag.event({ action: 'click', category: 'Navigation', label: 'Mobile Home' })
                  setIsMobileMenuOpen(false)
                }}
              >
                Home
              </a>
              <a 
                href="#services" 
                className="block text-white hover:text-orange-400 transition-colors font-normal text-base tracking-wide py-2"
                onClick={() => {
                  gtag.event({ action: 'click', category: 'Navigation', label: 'Mobile Services' })
                  setIsMobileMenuOpen(false)
                }}
              >
                Services
              </a>
              <a 
                href="#work" 
                className="block text-white hover:text-orange-400 transition-colors font-normal text-base tracking-wide py-2"
                onClick={() => {
                  gtag.event({ action: 'click', category: 'Navigation', label: 'Mobile Our Work' })
                  setIsMobileMenuOpen(false)
                }}
              >
                Our Work
              </a>
              <a 
                href="#about" 
                className="block text-white hover:text-orange-400 transition-colors font-normal text-base tracking-wide py-2"
                onClick={() => {
                  gtag.event({ action: 'click', category: 'Navigation', label: 'Mobile About' })
                  setIsMobileMenuOpen(false)
                }}
              >
                About
              </a>
              <a 
                href="#reviews" 
                className="block text-white hover:text-orange-400 transition-colors font-normal text-base tracking-wide py-2"
                onClick={() => {
                  gtag.event({ action: 'click', category: 'Navigation', label: 'Mobile Reviews' })
                  setIsMobileMenuOpen(false)
                }}
              >
                Reviews
              </a>
              <a 
                href="#contact" 
                className="block text-white hover:text-orange-400 transition-colors font-normal text-base tracking-wide py-2"
                onClick={() => {
                  gtag.event({ action: 'click', category: 'Navigation', label: 'Mobile Contact' })
                  setIsMobileMenuOpen(false)
                }}
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
          <img 
            src="/hero-bg.png" 
            alt="Construction site background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/15"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Protect your home from <span className="text-orange-500">woodpeckers</span>.
          </h1>
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-4">
            Guaranteed.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 text-pretty">
            Home Coating you can trust.
          </p>
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
           onClick={() => {
              gtag.event({
                action: 'click',
                category: 'CTA',
                label: 'Get Free Estimate - Hero'
              })
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Get a Free Estimate
          </Button>
        </div>
      </section>

      {/* Orange Banner Section */}
      <section className="bg-orange-500 py-4">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-white font-semibold text-sm md:text-base uppercase tracking-wider">
              NO VOC • 100% GREEN • GERM AND VIRUS KILLER ON CONTACT • INTERIOR & EXTERIOR
            </p>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-6 border-2 border-orange-200 hover:border-orange-300 transition-colors relative">
              {/* Selo no canto superior direito */}
              <div className="absolute -top-4 -right-4 z-10">
                <a href="https://www.biobond.com" target="_blank" rel="noopener noreferrer" className="block hover:scale-110 transition-transform duration-300"
                   onClick={() => gtag.event({ action: 'click', category: 'External Link', label: 'BioBond Seal' })}>
                  <img
                    src="/selo.png"
                    alt="Quality Seal"
                    className="w-28 h-28 object-contain drop-shadow-lg cursor-pointer"
                    style={{ 
                      imageRendering: 'crisp-edges'
                    }}
                  />
                </a>
              </div>
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Home Coating</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Protect your home from weather with advanced coating. Long-term protection. Ideal for stucco, walls, wood, doors, and more.
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
                  New construction and professional stucco repair for a lasting finish.
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
                  Complete maintenance to keep your home looking like new. Restore your home's exterior with high-quality power washing, concrete, slabs and docks.
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
              <img
                src="/troy.png"
                alt="Our professional team"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About Us</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
               For nearly three decades, Crosshair Stucco and Repair has been a trusted name in the Lake of the Ozarks area. Founded by Troy Wiethop 27 years ago, we built our reputation specializing in stucco and repair. Today, as we expand our expertise to better serve homeowners, we've evolved into Crosshair Solutions. Along with stucco, we now proudly offer protective home coatings and a broader range of services designed to keep your home safe, beautiful, and durable. Our mission remains the same: protecting and enhancing your home for years to come.
              </p>
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg"
                onClick={() => {
                  gtag.event({
                    action: 'click',
                    category: 'CTA',
                    label: 'Request Quote - About'
                  })
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Request a Free Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section id="work" className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Work</h2>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="relative px-12 md:px-20">
              {/* Carrossel de Imagens - 3 imagens do mesmo tamanho */}
              <div className="flex items-center justify-center gap-4 md:gap-6">
                {/* Mostra 3 imagens com o mesmo tamanho */}
                {[-1, 0, 1].map((offset) => {
                  const index = (currentImageIndex + offset + workImages.length) % workImages.length;
                  
                  return (
                    <div
                      key={offset}
                      className="flex-1"
                    >
                      <div className="aspect-[3/4] bg-gray-900 rounded-lg overflow-hidden">
                        <img
                          src={workImages[index].src}
                          alt={workImages[index].alt}
                          className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => {
                            gtag.event({
                              action: 'click',
                              category: 'Gallery',
                              label: `Image ${index + 1} Click`
                            })
                            setCurrentImageIndex(index)
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Botões de Navegação */}
              <button
                onClick={prevImage}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-400 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" strokeWidth={3} />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-400 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-10 h-10 md:w-12 md:h-12" strokeWidth={3} />
              </button>
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
                <img
                  src="/customer-man.jpeg"
                  alt="John M."
                  className="w-28 h-28 rounded-full mx-auto object-cover object-center"
                />
              </div>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic leading-relaxed">
                &quot;We want to thank Crosshair Solutions for coming to our home and doing a great job. They applied their new product Bio Bond on our house. We couldn't be happier with the results. Not only does it protect the exterior of the house it also keeps spiders away and woodpeckers off of the house for 3 to 5 years. If you don't want spiders, mud dobbers and insects on your house Call CrossHair Solutions&quot;
              </p>
              <p className="font-semibold text-gray-900">John M.</p>
              <p className="text-gray-500 text-sm">Homeowner</p>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <img
                  src="/woman-smiling.jpg"
                  alt="Sarah K."
                  className="w-28 h-28 rounded-full mx-auto object-cover object-top"
                />
              </div>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic leading-relaxed">
                &quot;Great experience! The team did an awesome job fixing and repairing the outside of my house where birds had caused damage. They were quick, professional, and super friendly. Everything looks perfect now - I'm really happy with the results and definitely recommend them!&quot;
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-colors placeholder-gray-800 text-gray-900"
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
                  <a href="tel:+15736921343" 
                     className="text-gray-900 font-medium hover:text-orange-500 transition-colors"
                     onClick={() => gtag.event({ action: 'click', category: 'Contact', label: 'Phone Call' })}>
                    (573) 692-1343
                  </a>
                </div>
                
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Email:</p>
                  <a href="mailto:solutionscrosshair@gmail.com" 
                     className="text-gray-900 font-medium hover:text-orange-500 transition-colors"
                     onClick={() => gtag.event({ action: 'click', category: 'Contact', label: 'Email Click' })}>
                    solutionscrosshair@gmail.com
                  </a>
                </div>
                
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Address:</p>
                  <p className="text-gray-900 font-medium">288 Destiny Ridge, Roach Missouri, 65787</p>
                  <p className="text-gray-900 font-medium">United States</p>
                </div>
              </div>

              {/* Interactive Map */}
              <div className="w-full h-80 rounded-lg shadow-lg overflow-hidden border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12555.91325535918!2d-92.9046333346985!3d38.117438921790715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c4ef81a0e8d6d7%3A0x2bcf78e0ca1fe2e7!2s288%20Destiny%20Ln%2C%20Roach%2C%20MO%2065787%2C%20USA!5e0!3m2!1sen!2sus!4v1758571666371!5m2!1sen!2sus"
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
                <img
                  src="/logo.png"
                  alt="Crosshair Solutions"
                  className="h-12 md:h-16 w-auto mb-6"
                />
              </div>
              
              <div className="space-y-6 ml-8">
                <div className="flex items-start">
                  <MapPin className="text-orange-400 w-5 h-5 mt-1 mr-2" />
                  <div>
                    <p className="font-semibold text-white mb-2">Address</p>
                    <p className="text-gray-300">Roach, MO</p>
                    <p className="text-gray-300">United States</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="text-orange-400 w-5 h-5 mr-3" />
                  <a href="tel:+15736921343" 
                     className="text-gray-300 hover:text-orange-400 transition-colors"
                     onClick={() => gtag.event({ action: 'click', category: 'Contact', label: 'Footer Phone' })}>
                    (573) 692-1343
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Mail className="text-orange-400 w-5 h-5 mr-3" />
                  <a href="mailto:solutionscrosshair@gmail.com" 
                     className="text-gray-300 hover:text-orange-400 transition-colors"
                     onClick={() => gtag.event({ action: 'click', category: 'Contact', label: 'Footer Email' })}>
                    solutionscrosshair@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold text-white text-lg mb-8">Navigation</h4>
              <div className="space-y-4">
                <a href="#home" className="block text-gray-400 hover:text-orange-400 transition-colors text-sm uppercase tracking-wider"
                   onClick={() => gtag.event({ action: 'click', category: 'Navigation', label: 'Footer Home' })}>
                  HOME
                </a>
                <a href="#services" className="block text-gray-400 hover:text-orange-400 transition-colors text-sm uppercase tracking-wider"
                   onClick={() => gtag.event({ action: 'click', category: 'Navigation', label: 'Footer Services' })}>
                  SERVICES
                </a>
                <a href="#work" className="block text-gray-400 hover:text-orange-400 transition-colors text-sm uppercase tracking-wider"
                   onClick={() => gtag.event({ action: 'click', category: 'Navigation', label: 'Footer Our Work' })}>
                  OUR WORK
                </a>
                <a href="#about" className="block text-gray-400 hover:text-orange-400 transition-colors text-sm uppercase tracking-wider"
                   onClick={() => gtag.event({ action: 'click', category: 'Navigation', label: 'Footer About' })}>
                  ABOUT
                </a>
                <a href="#reviews" className="block text-gray-400 hover:text-orange-400 transition-colors text-sm uppercase tracking-wider"
                   onClick={() => gtag.event({ action: 'click', category: 'Navigation', label: 'Footer Reviews' })}>
                  REVIEWS
                </a>
                <a href="#contact" className="block text-gray-400 hover:text-orange-400 transition-colors text-sm uppercase tracking-wider"
                   onClick={() => gtag.event({ action: 'click', category: 'Navigation', label: 'Footer Contact' })}>
                  CONTACT
                </a>
              </div>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="font-semibold text-white text-lg mb-8">Follow us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-400 transition-all duration-300 group"
                   onClick={() => gtag.event({ action: 'click', category: 'Social Media', label: 'Facebook' })}>
                  <Facebook className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-400 transition-all duration-300 group"
                   onClick={() => gtag.event({ action: 'click', category: 'Social Media', label: 'Instagram' })}>
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