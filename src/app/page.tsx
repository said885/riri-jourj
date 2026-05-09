"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Instagram, Phone, MessageCircle, Menu, X, Check, ChevronDown, Star, Sparkles, Crown, ArrowRight } from "lucide-react";

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
    badge: "-200€ OFFERT",
    features: ["Intérieur cuir nappa", "Climatisation automatique", "Chauffeur privé"],
  },
  {
    name: "Mercedes Classe S",
    category: "Berline Executive",
    image: "https://images.unsplash.com/photo-1616429445671-37f5ade8641f?q=80&w=1200&auto=format&fit=crop",
    price: "à partir de 280€",
    badge: null,
    features: ["Interior cuir premium", "Sièges massants", "Chauffeur VIP"],
  },
  {
    name: "BMW Série 7",
    category: "Limousine",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
    price: "à partir de 320€",
    badge: null,
    features: ["Maximal confort", "Espace XXL", "Bar à champagne"],
  },
];

const services = [
  { icon: Crown, name: "Mariage", desc: "Une entrée memorable" },
  { icon: Star, name: "VIP", desc: "Transfert événementiel" },
  { icon: Sparkles, name: "Célébration", desc: "Moments uniques" },
];

const eventTypes = ["Mariage", "VIP", "Anniversaire", "Célébration", "Autre"];

const fadeUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", date: "", eventType: "", place: "" });
  const [mounted, setMounted] = useState(false);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.1]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Bonjour, je souhaite réserver un véhicule.%0ANom: ${formData.name}%0ADate: ${formData.date}%0AType: ${formData.eventType}%0ALieu: ${formData.place}`;
    window.open(`https://wa.me/33762912640?text=${message}`, "_blank");
  };

  const scrollToFlotte = () => {
    document.getElementById("flotte")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!mounted) return null;

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass py-4" : "py-8"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            <motion.a
              href="#home"
              className="font-cormorant text-2xl lg:text-3xl text-gold font-semibold tracking-wider"
              whileHover={{ scale: 1.02 }}
            >
              RIRI JOUR J
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-white/70 hover:text-gold transition-colors text-sm font-light tracking-widest uppercase"
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-gold text-black font-medium text-sm tracking-wider hover:bg-white transition-colors rounded-full"
              >
                Réserver
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass mt-4 mx-4 rounded-2xl overflow-hidden"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block py-4 px-6 text-white/70 hover:text-gold transition-colors border-b border-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a href="#contact" className="block py-4 px-6 text-gold font-medium">
                Réserver
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1504215680853-026ed2a45def?q=80&w=1920&auto=format&fit=crop"
            alt="Luxury Car"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gold uppercase tracking-[0.4em] text-sm lg:text-base mb-8 font-light"
          >
            Location de Véhicules de Prestige
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-cormorant text-5xl sm:text-7xl lg:text-8xl font-semibold mb-8 leading-tight"
          >
            L&apos;Élégance à votre <span className="text-gold">service</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-white/60 text-lg lg:text-xl max-w-2xl mx-auto mb-12 font-light"
          >
            Location de véhicule avec chauffeur pour vos plus beaux événements en Lorraine.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.button
              onClick={scrollToFlotte}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-black font-medium tracking-wider rounded-full gold-glow"
            >
              Découvrir la flotte <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/40"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* Flotte Section */}
      <section id="flotte" className="py-32 lg:py-48">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-gold uppercase tracking-[0.4em] text-sm mb-4 font-light">Notre Flotte</p>
            <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-semibold">
              Véhicules d&apos;Exception
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {vehicles.map((vehicle, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-cover hover-zoom group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {vehicle.badge && (
                    <div className="absolute top-4 right-4 px-4 py-1.5 bg-gold text-black font-semibold text-sm rounded-full">
                      {vehicle.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gold text-xs uppercase tracking-widest mb-2 font-light">{vehicle.category}</p>
                  <h3 className="font-cormorant text-2xl font-semibold mb-2">{vehicle.name}</h3>

                  <div className="space-y-3 mb-6">
                    {vehicle.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-2 text-white/50 text-sm">
                        <Check className="text-gold w-4 h-4 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-gold font-cormorant text-3xl">{vehicle.price}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2 border border-gold/30 text-gold text-sm rounded-full hover:bg-gold hover:text-black transition-colors"
                    >
                      Réserver
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 lg:py-48 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-gold uppercase tracking-[0.4em] text-sm mb-4 font-light">Services</p>
            <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-semibold">
              Une Expérience Sur Mesure
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-10 bg-white/5 rounded-2xl border border-white/5 hover:border-gold/30 hover:bg-white/[0.07] transition-all duration-500 group text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 mx-auto mb-6 rounded-full border border-gold/20 flex items-center justify-center"
                >
                  <service.icon className="w-8 h-8 text-gold" />
                </motion.div>
                <h3 className="font-cormorant text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-white/40 font-light">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reservation Form */}
      <section id="contact" className="py-32 lg:py-48">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-gold uppercase tracking-[0.4em] text-sm mb-4 font-light">Réservation</p>
            <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-semibold">
             Contactez-nous
            </h2>
            <p className="text-white/40 mt-4 font-light">Remplissez le formulaire et nous vous contacterons</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="relative">
                <label className="block text-sm text-white/40 mb-3 uppercase tracking-wider font-light">Nom complet</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border-b border-white/10 py-4 text-white placeholder-white/30 focus:border-gold focus:outline-none transition-colors rounded-none"
                  placeholder="Votre nom"
                />
              </div>
              <div className="relative">
                <label className="block text-sm text-white/40 mb-3 uppercase tracking-wider font-light">Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-white/5 border-b border-white/10 py-4 text-white focus:border-gold focus:outline-none transition-colors rounded-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/40 mb-4 uppercase tracking-wider font-light">Type d&apos;événement</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, eventType: type })}
                    className={`py-3 border-b-2 transition-all ${
                      formData.eventType === type
                        ? "border-gold text-gold"
                        : "border-white/10 text-white/40 hover:border-gold/30"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm text-white/40 mb-3 uppercase tracking-wider font-light">Lieu</label>
              <input
                type="text"
                required
                value={formData.place}
                onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                className="w-full bg-white/5 border-b border-white/10 py-4 text-white placeholder-white/30 focus:border-gold focus:outline-none transition-colors rounded-none"
                placeholder="Ville ou lieu de rencontre"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-5 bg-gold text-black font-medium tracking-wider rounded-full hover:bg-white transition-colors"
            >
              Envoyer ma demande
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4"
          >
            <Instagram className="w-10 h-10 text-gold" />
            <p className="text-white/40 font-light">Suivez-nous sur Instagram</p>
            <a
              href="https://instagram.com/ririjourj57"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold text-xl hover:underline font-cormorant text-2xl"
            >
              @ririjourj57
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="font-cormorant text-2xl text-gold font-semibold">RIRI JOUR J</p>
              <p className="text-white/30 text-sm mt-1 font-light">Location de véhicules de prestige</p>
            </div>

            <div className="flex items-center gap-2 text-white/40">
              <Phone className="w-5 h-5 text-gold" />
              <a href="tel:0762912640" className="hover:text-gold transition-colors">
                07.62.91.26.40
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-white/20 text-xs font-light">
              © 2024 Riri Jour J. Tous droits réservés. | Ne pas jeter sur la voie publique.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/33762912640"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gold rounded-full flex items-center justify-center shadow-lg z-50"
      >
        <MessageCircle className="w-7 h-7 text-black" />
      </motion.a>
    </>
  );
}