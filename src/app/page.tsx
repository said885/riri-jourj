"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Car, Calendar, MapPin, User, Phone, MessageCircle, Menu, X, Check, Sparkles, Crown, ArrowRight, Instagram } from "lucide-react";

const navLinks = [
  { name: "Accueil", href: "#home" },
  { name: "Flotte", href: "#flotte" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

const vehicles = [
  {
    name: "Porsche Cayenne S",
    category: "SUV Prestige",
    image: "https://images.unsplash.com/photo-1603583153606-aec318f6d7b7?q=80&w=1200&auto=format&fit=crop",
    price: "à partir de 350€",
    badge: "Lancement : -200€",
    features: ["Intérieur cuir nappa", "Climatisation automatique", "Chauffeur privé"],
    description: "L'incontournable pour vos événements exceptionnels",
  },
];

const services = [
  { icon: Crown, name: "Mariage", desc: "Faites une entrée remarqué" },
  { icon: Car, name: "VIP", desc: "Transport événementiel" },
  { icon: Sparkles, name: "Célébration", desc: "Moments exceptionnels" },
];

const eventTypes = ["Mariage", "VIP", "Anniversaire", "Célébration", "Autre"];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", date: "", eventType: "", place: "" });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Bonjour, je souhaite réserver un véhicule.%0ANom: ${formData.name}%0ADate: ${formData.date}%0AType: ${formData.eventType}%0ALieu: ${formData.place}`;
    window.open(`https://wa.me/33762912640?text=${message}`, "_blank");
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass py-3" : "py-6"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="#home" className="font-serif text-xl sm:text-2xl text-gold font-bold tracking-wider">
              RIRI JOUR J
            </a>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-white/80 hover:text-gold transition-colors text-sm uppercase tracking-widest">
                  {link.name}
                </a>
              ))}
              <a href="#contact" className="px-6 py-2 bg-gold text-dark font-semibold text-sm tracking-wider hover:bg-white transition-colors">
                RÉSERVER
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass mt-4 mx-4 rounded-xl p-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-3 text-white/80 hover:text-gold transition-colors text-lg border-b border-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" className="block mt-4 px-6 py-3 bg-gold text-dark font-semibold text-center tracking-wider">
              RÉSERVER
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1603583153606-aec318f6d7b7?q=80&w=1920&auto=format&fit=crop"
            alt="Porsche Cayenne S"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="text-gold uppercase tracking-[0.3em] text-sm sm:text-base mb-6 animate-fade-in">
            Location de Véhicules de Prestige
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            L&apos;Élégance à votre <span className="text-gold">service</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            Location de véhicule avec chauffeur pour vos plus beaux événements en Lorraine.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-dark font-semibold tracking-wider hover:bg-white transition-all animate-fade-in-up gold-glow" style={{ animationDelay: "0.6s" }}>
            Réserver maintenant <ArrowRight size={20} />
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gold rounded-full" />
          </div>
        </div>
      </section>

      {/* Flotte Section */}
      <section id="flotte" className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">Notre Flotte</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold">Véhicules d&apos;Exception</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Vehicle Image */}
            <div className="relative group">
              <div className="absolute -inset-4 border border-gold/30 rounded-2xl group-hover:border-gold/60 transition-all duration-500" />
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="https://images.unsplash.com/photo-1603583153606-aec318f6d7b7?q=80&w=800&auto=format&fit=crop"
                  alt="Porsche Cayenne S"
                  width={600}
                  height={400}
                  className="object-cover w-full h-[300px] sm:h-[400px] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 px-4 py-2 bg-gold text-dark font-bold text-sm">
                  {vehicles[0].badge}
                </div>
              </div>
            </div>

            {/* Vehicle Details */}
            <div>
              <p className="text-gold text-sm uppercase tracking-widest mb-2">{vehicles[0].category}</p>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-4">{vehicles[0].name}</h3>
              <p className="text-white/60 mb-6">{vehicles[0].description}</p>
              
              <div className="space-y-4 mb-8">
                {vehicles[0].features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="text-gold w-5 h-5" />
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="text-2xl sm:text-3xl font-serif text-gold mb-8">
                {vehicles[0].price}
              </div>

              <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 border border-gold text-gold font-semibold tracking-wider hover:bg-gold hover:text-dark transition-all">
                Réserver ce véhicule
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-dark relative">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/95 to-dark" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">Services</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold">Une Expérience Sur Mesure</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="p-8 border border-gold/20 hover:border-gold/50 transition-all group text-center">
                <service.icon className="w-12 h-12 text-gold mx-auto mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-white/60">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Form */}
      <section id="contact" className="py-24 bg-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">Réservation</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold">Contactez-nous</h2>
            <p className="text-white/60 mt-4">Remplissez le formulaire et nous vous contacterons</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-white/60 mb-2 uppercase tracking-wider">Nom complet</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-14 pr-4 text-white placeholder-white/30 focus:border-gold focus:outline-none transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2 uppercase tracking-wider">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-14 pr-4 text-white focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2 uppercase tracking-wider">Type d&apos;événement</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, eventType: type })}
                    className={`py-3 border rounded-lg transition-all ${
                      formData.eventType === type
                        ? "bg-gold text-dark border-gold font-semibold"
                        : "border-white/10 text-white/60 hover:border-gold/50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2 uppercase tracking-wider">Lieu</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                <input
                  type="text"
                  required
                  value={formData.place}
                  onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-14 pr-4 text-white placeholder-white/30 focus:border-gold focus:outline-none transition-colors"
                  placeholder="Ville ou lieu de rdV"
                />
              </div>
            </div>

            <button type="submit" className="w-full py-4 bg-gold text-dark font-semibold tracking-wider hover:bg-white transition-colors">
              Envoyer ma demande
            </button>
          </form>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Instagram className="w-10 h-10 text-gold mx-auto mb-4" />
          <p className="text-white/60 mb-2">Suivez-nous sur Instagram</p>
          <a
            href="https://instagram.com/ririjourj57"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold text-xl hover:underline"
          >
            @ririjourj57
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-dark border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="font-serif text-2xl text-gold font-bold">RIRI JOUR J</p>
              <p className="text-white/40 text-sm mt-1">Location de véhicules de prestige</p>
            </div>

            <div className="flex items-center gap-2 text-white/60">
              <Phone className="w-5 h-5 text-gold" />
              <a href="tel:0762912640" className="hover:text-gold transition-colors">
                07.62.91.26.40
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-white/30 text-xs">
              © 2024 Riri Jour J. Tous droits réservés. | Ne pas jeter sur la voie publique.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/33762912640"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </>
  );
}