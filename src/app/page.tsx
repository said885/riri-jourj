"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Instagram, Phone, MessageCircle, Menu, X, ChevronRight, 
  Calendar, Heart, Briefcase, Plane, MapPin, User, Phone as PhoneIcon,
  Sparkles, ArrowRight, Check
} from "lucide-react";

const fleet = [
  { id: 1, name: "Porsche Cayenne S", category: "SUV Prestige", price: "350€", badge: "-200€", image: "/images/cayenne-ext.jpg", features: ["Cuir Nappa", "Climatisation", "Chauffeur"] },
  { id: 2, name: "Porsche Cayenne Int.", category: "Interior", price: "Inclus", badge: null, image: "/images/cayenne-int.jpg", features: ["Finitions luxe", "Confort max", "Bar"] },
];

const services = [
  { icon: Heart, name: "Mariage", desc: "Pour votre jour inoubliable" },
  { icon: Briefcase, name: "VIP", desc: "Transport exclusivity" },
  { icon: Plane, name: "Aéroport", desc: "Transfert Metz-Nancy" },
];

const instagramPosts = [
  { id: 1, image: "/images/inasta-1.jpg" }, { id: 2, image: "/images/inasta-2.jpg" },
  { id: 3, image: "/images/inasta-3.jpg" }, { id: 4, image: "/images/inasta-4.jpg" },
  { id: 5, image: "/images/inasta-5.jpg" }, { id: 6, image: "/images/inasta-6.jpg" },
];

const navLinks = ["Accueil", "Flotte", "Services", "Contact"];

const steps = [
  { id: 1, title: "Date", options: ["Sam 24 Mai", "Dim 25 Mai", "Sam 31 Mai", "Dim 1er Juin"] },
  { id: 2, title: "Événement", options: ["Mariage", "VIP", "Anniversaire", "Célébration"] },
  { id: 3, title: "Véhicule", options: ["Porsche Cayenne S", "Porsche Cayenne +"] },
  { id: 4, title: "Contact", fields: ["Nom", "Téléphone", "Lieu"] },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState(["", "", "", ""]);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const nextStep = () => {
    if (formStep < steps.length - 1) setFormStep(s => s + 1);
    else {
      const msg = `Réservation Riri Jour J:%0A${steps.map((st, i) => `${st.title}: ${formData[i]}`).join("%0A")}`;
      window.open(`https://wa.me/33762912640?text=${msg}`, "_blank");
      setFormStep(0);
      setFormData(["", "", "", ""]);
      setFormOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Grain Effect */}
      <div className="font-grain pointer-events-none fixed inset-0 z-50" />

      {/* NAV */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all ${scrolled ? "glass py-3" : "py-6"}`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="font-tenor text-xl text-[#C5A059] tracking-[0.2em]">
            RIRI JOUR J
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button key={link} onClick={() => scrollTo(link.toLowerCase())} className="text-sm text-white/50 hover:text-[#C5A059] transition-colors font-light">
                {link}
              </button>
            ))}
            <button onClick={() => setFormOpen(true)} className="px-6 py-2.5 bg-[#C5A059] text-[#050505] text-sm font-medium rounded-full hover:bg-white transition">
              Réserver
            </button>
          </div>

          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="lg:hidden glass mx-4 mt-4 rounded-xl overflow-hidden">
            {navLinks.map((link) => (
              <button key={link} onClick={() => scrollTo(link.toLowerCase())} className="block w-full px-6 py-4 text-left text-white/50 border-b border-white/5">
                {link}
              </button>
            ))}
          </motion.div>
        )}
      </motion.nav>

      {/* HERO - Asymmetric */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center">
        <motion.div style={{ y, opacity }} className="absolute inset-0 -z-10">
          <Image src="https://images.unsplash.com/photo-1504215680853-026ed2a45def?q=80&w=2000" alt="Porsche" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
        </motion.div>

        <div className="max-w-6xl mx-auto px-6 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-[#C5A059] text-xs tracking-[0.4em] uppercase mb-6 font-light">
                Conciergerie de Prestige
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="font-tenor text-5xl lg:text-7xl font-light mb-6 leading-tight">
                L&apos;Exceptionnel pour votre <span className="text-[#C5A059]">Jour J</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-white/40 text-lg mb-10 font-light max-w-md">
                Location de Porsche Cayenne avec chauffeur pour vos événements exceptionnels à Metz et en Lorraine.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex gap-4">
                <button onClick={() => setFormOpen(true)} className="px-8 py-4 bg-[#C5A059] text-[#050505] font-medium rounded-full hover:bg-white transition flex items-center gap-2">
                  Réserver <ArrowRight size={18} />
                </button>
                <button onClick={() => scrollTo("flotte")} className="px-8 py-4 border border-white/20 text-white/60 rounded-full hover:border-[#C5A059] hover:text-[#C5A059] transition">
                  Découvrir
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2 text-white/20">
            <span className="text-[10px] tracking-widest uppercase">Scroll</span>
            <ChevronRight size={16} className="rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* FLOTTE - Bento Grid */}
      <section id="flotte" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-[#C5A059] text-xs tracking-[0.3em] uppercase mb-3">Notre Flotte</p>
            <h2 className="font-tenor text-4xl lg:text-5xl font-light">Véhicules d&apos;Exception</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {fleet.map((car, i) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card rounded-2xl overflow-hidden hover-lift ${i === 0 ? "md:col-span-2" : ""}`}
              >
                <div className="relative h-64">
                  <Image src={car.image} alt={car.name} fill className="object-cover" />
                  {car.badge && <div className="absolute top-4 right-4 px-4 py-1 bg-[#C5A059] text-[#050505] text-sm font-medium rounded-full">{car.badge}</div>}
                </div>
                <div className="p-6">
                  <p className="text-[#C5A059] text-xs tracking-widest mb-2">{car.category}</p>
                  <h3 className="font-tenor text-2xl mb-4">{car.name}</h3>
                  <div className="flex flex-wrap gap-6 text-white/40 mb-4">
                    {car.features.map((f, j) => <span key={j} className="flex items-center gap-2"><Check size={14} className="text-[#C5A059]" />{f}</span>)}
                  </div>
                  <p className="font-tenor text-3xl text-[#C5A059]">{car.price}<span className="text-white/30 text-base">/jour</span></p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-[#C5A059] text-xs tracking-[0.3em] uppercase mb-3">Services</p>
            <h2 className="font-tenor text-4xl font-light">Conciergerie sur Mesure</h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-8 text-center hover-lift"
              >
                <s.icon className="w-10 h-10 text-[#C5A059] mx-auto mb-4" />
                <h3 className="font-tenor text-xl mb-2">{s.name}</h3>
                <p className="text-white/40 text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MOODBOARD INSTAGRAM */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <Instagram className="w-10 h-10 text-[#C5A059] mx-auto mb-4" />
            <p className="text-white/40 mb-2">Suivez-nous</p>
            <a href="https://instagram.com/ririjourj57" className="font-tenor text-2xl text-[#C5A059]">@ririjourj57</a>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {instagramPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative aspect-square group"
              >
                <Image src={post.image} alt="" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 rounded-lg" />
                <div className="absolute inset-0 border border-[#C5A059]/0 group-hover:border-[#C5A059]/30 rounded-lg transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-tenor text-xl text-[#C5A059]">RIRI JOUR J</p>
            <p className="text-white/30 text-sm">Conciergerie de prestige</p>
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <Phone size={16} />
            <a href="tel:0762912640">07.62.91.26.40</a>
          </div>
        </div>
        <p className="text-center text-white/15 text-xs mt-8">© 2024 Riri Jour J</p>
      </footer>

      {/* MULTI-STEP FORM FLOAT */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setFormOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-2xl p-8 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-tenor text-2xl">Réservation</h3>
                <button onClick={() => setFormOpen(false)}><X size={20} className="text-white/40" /></button>
              </div>

              {/* Progress */}
              <div className="flex gap-2 mb-8">
                {steps.map((_, i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= formStep ? "bg-[#C5A059]" : "bg-white/10"}`} />
                ))}
              </div>

              <p className="text-[#C5A059] text-xs tracking-widest uppercase mb-4">{steps[formStep].title}</p>

              {/* Step Content */}
              {steps[formStep].options ? (
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {steps[formStep].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setFormData({ ...formData, [formStep]: opt })}
                      className={`py-4 rounded-xl border transition-all ${formData[formStep] === opt ? "border-[#C5A059] bg-[#C5A059]/10 text-[#C5A059]" : "border-white/10 hover:border-white/30"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 mb-8">
                  {steps[formStep].fields.map((field, i) => (
                    <input
                      key={field}
                      type={field === "Téléphone" ? "tel" : "text"}
                      placeholder={field}
                      value={formData[i]}
                      onChange={(e) => setFormData({ ...formData, [formStep]: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:border-[#C5A059] focus:outline-none"
                    />
                  ))}
                </div>
              )}

              <button
                onClick={nextStep}
                disabled={!formData[formStep]}
                className="w-full py-4 bg-[#C5A059] text-[#050505] font-medium rounded-full hover:bg-white transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {formStep < steps.length - 1 ? "Continuer" : "Confirmer"} <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Float */}
      <motion.a
        href="https://wa.me/33762912640"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#C5A059] rounded-full flex items-center justify-center z-40 shadow-xl"
      >
        <MessageCircle className="w-6 h-6 text-[#050505]" />
      </motion.a>
    </div>
  );
}