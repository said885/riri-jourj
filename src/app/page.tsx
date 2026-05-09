"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { Instagram, Phone, MessageCircle, Menu, X, Check, ChevronDown, ArrowRight, Mail, MapPin, Calendar, User } from "lucide-react";

const navLinks = [
  { name: "Accueil", href: "#home" },
  { name: "Flotte", href: "#flotte" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", date: "", eventType: "", place: "" });
  const [mounted, setMounted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.15]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Bonjour Riri Jour J,%0A%0AJ'aimerais réserver un véhicule.%0A%0A*Nom:* ${formData.name}%0A*Téléphone:* ${formData.phone}%0A*Date:* ${formData.date}%0A*Événement:* ${formData.eventType}%0A*Lieu:* ${formData.place}`;
    window.open(`https://wa.me/33762912640?text=${msg}`, "_blank");
  };

  if (!mounted) return null;

  return (
    <>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass py-3" : "py-6"}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <button onClick={() => scrollToSection("home")} className="font-cormorant text-2xl text-gold font-semibold tracking-widest">
              RIRI JOUR J
            </button>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href.slice(1))}
                  className="text-white/60 hover:text-gold transition-colors text-sm font-light tracking-wide"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="px-6 py-2.5 bg-gold text-black text-sm font-medium rounded-full hover:bg-white transition-colors"
              >
                Réserver
              </button>
            </div>

            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass mt-4 mx-4 rounded-2xl overflow-hidden"
            >
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href.slice(1))}
                  className="block w-full text-left px-6 py-4 text-white/70 border-b border-white/5"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full text-left px-6 py-4 text-gold font-medium"
              >
                Réserver
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1504215680853-026ed2a45def?q=80&w=2000&auto=format&fit=crop"
            alt="Porsche Cayenne"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gold uppercase tracking-[0.35em] text-xs mb-6 font-light"
          >
            Location de Véhicules de Prestige
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-cormorant text-5xl sm:text-7xl font-semibold mb-6"
          >
            L&apos;Élégance à votre <span className="text-gold">service</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-white/50 text-lg mb-10 font-light max-w-xl mx-auto"
          >
            Location de Porsche Cayenne avec chauffeur pour vos événements exceptionnels en Lorraine.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onClick={() => scrollToSection("contact")}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-black font-medium rounded-full hover:bg-white transition-colors"
          >
            Réserver maintenant <ArrowRight size={18} />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2 text-white/30">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </section>

      {/* Flotte - Porsche Only */}
      <section id="flotte" className="py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-gold uppercase tracking-[0.3em] text-xs mb-3 font-light">Notre Flotte</p>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-semibold">Porsche Cayenne S</h2>
          </motion.div>

          <motion.div {...fadeUp} className="relative">
            <div className="relative h-[300px] sm:h-[450px] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1603583153606-aec318f6d7b7?q=80&w=1400&auto=format&fit=crop"
                alt="Porsche Cayenne S"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
              
              <div className="absolute top-6 right-6 px-4 py-2 bg-gold text-black font-semibold text-sm rounded-full">
                -200€ OFFERT
              </div>
            </div>

            <div className="absolute -bottom-12 left-0 right-0 flex justify-center">
              <div className="glass rounded-2xl px-8 py-6 flex flex-wrap items-center justify-center gap-8 sm:gap-16">
                <div className="text-center">
                  <Check className="w-5 h-5 text-gold mx-auto mb-2" />
                  <p className="text-white/60 text-sm">Cuir Nappa</p>
                </div>
                <div className="text-center">
                  <Check className="w-5 h-5 text-gold mx-auto mb-2" />
                  <p className="text-white/60 text-sm">Climatisation</p>
                </div>
                <div className="text-center">
                  <Check className="w-5 h-5 text-gold mx-auto mb-2" />
                  <p className="text-white/60 text-sm">Chauffeur Privé</p>
                </div>
                <div className="text-center">
                  <p className="text-gold font-cormorant text-3xl">350€</p>
                  <p className="text-white/30 text-xs">/jour</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 sm:py-32 bg-black/30">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-gold uppercase tracking-[0.3em] text-xs mb-3 font-light">Services</p>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-semibold">Pour Chaque Événement</h2>
          </motion.div>

          <motion.div variants={stagger} initial="animate" whileInView="animate" viewport={{ once: true }} className="flex flex-wrap justify-center gap-4">
            {[
              { title: "Mariage", desc: "Entrée remarqué" },
              { title: "VIP", desc: "Transport exclusif" },
              { title: "Célébration", desc: "Moment unique" },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="px-8 py-6 bg-white/5 rounded-2xl border border-white/5 hover:border-gold/20 transition-colors text-center min-w-[160px]"
              >
                <p className="font-cormorant text-xl font-semibold mb-1">{s.title}</p>
                <p className="text-white/40 text-sm font-light">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 sm:py-32">
        <div className="max-w-xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-gold uppercase tracking-[0.3em] text-xs mb-3 font-light">Contact</p>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-semibold">Réservation</h2>
            <p className="text-white/40 mt-3 font-light">Contactez-nous directement sur WhatsApp</p>
          </motion.div>

          <motion.form ref={formRef} {...fadeUp} onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border-0 border-b border-white/10 py-4 pl-14 pr-4 text-white placeholder-white/30 focus:border-gold focus:outline-none focus:bg-white/[0.07] transition-all rounded-lg"
                  placeholder="Votre nom complet"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/5 border-0 border-b border-white/10 py-4 pl-14 pr-4 text-white placeholder-white/30 focus:border-gold focus:outline-none focus:bg-white/[0.07] transition-all rounded-lg"
                  placeholder="Votre téléphone"
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-white/5 border-0 border-b border-white/10 py-4 pl-14 pr-4 text-white focus:border-gold focus:outline-none focus:bg-white/[0.07] transition-all rounded-lg [&::-webkit-calendar-picker-icon]:invert [&::-webkit-calendar-picker-icon]:opacity-50"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                <input
                  type="text"
                  required
                  value={formData.place}
                  onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                  className="w-full bg-white/5 border-0 border-b border-white/10 py-4 pl-14 pr-4 text-white placeholder-white/30 focus:border-gold focus:outline-none focus:bg-white/[0.07] transition-all rounded-lg"
                  placeholder="Lieu de rendez-vous"
                />
              </div>
            </div>

            <div>
              <p className="text-white/40 text-sm mb-3">Type d&apos;événement</p>
              <div className="flex flex-wrap gap-2">
                {["Mariage", "VIP", "Anniversaire", "Autre"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, eventType: type })}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      formData.eventType === type
                        ? "bg-gold text-black"
                        : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-gold text-black font-medium rounded-full hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              Envoyer sur WhatsApp
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Instagram */}
      <section className="py-16 border-t border-white/5">
        <div className="text-center">
          <Instagram className="w-8 h-8 text-gold mx-auto mb-3" />
          <p className="text-white/40 text-sm mb-2">Suivez-nous</p>
          <a href="https://instagram.com/ririjourj57" target="_blank" rel="noopener" className="text-gold font-cormorant text-xl">
            @ririjourj57
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gold/10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-cormorant text-xl text-gold">RIRI JOUR J</p>
            <p className="text-white/25 text-xs">Location de véhicules de prestige</p>
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <Phone className="w-4 h-4 text-gold" />
            <a href="tel:0762912640" className="hover:text-gold">07.62.91.26.40</a>
          </div>
        </div>
        <p className="text-center text-white/15 text-xs mt-6">© 2024 Riri Jour J</p>
      </footer>

      {/* WhatsApp Float */}
      <motion.a
        href="https://wa.me/33762912640"
        target="_blank"
        rel="noopener"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-lg z-50"
      >
        <MessageCircle className="w-6 h-6 text-black" />
      </motion.a>
    </>
  );
}