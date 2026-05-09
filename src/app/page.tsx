"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Instagram, Phone, MessageCircle, Menu, X, Check, ChevronDown, ArrowRight, Mail, MapPin, Calendar, User, Send } from "lucide-react";

const navLinks = [
  { name: "Accueil", href: "#home" },
  { name: "Flotte", href: "#flotte" },
  { name: "Contact", href: "#contact" },
];

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ nom: "", tel: "", date: "", lieu: "", type: "Mariage" });
  const [mounted, setMounted] = useState(false);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Bonjour,%0AJe souhaiterais réserver un véhicule.%0A%0A📛 Nom: ${form.nom}%0A📞 Téléphone: ${form.tel}%0A📅 Date: ${form.date}%0A📍 Lieu: ${form.lieu}%0A🎉 Événement: ${form.type}`;
    window.open(`https://wa.me/33762912640?text=${msg}`, "_blank");
  };

  if (!mounted) return null;

  return (
    <>
      {/* NAV */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-md py-3" : "bg-transparent py-6"}`}>
        <div className="max-w-5xl mx-auto px-5 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="font-cormorant text-xl text-gold font-bold tracking-widest">
            RIRI JOUR J
          </button>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button key={link.name} onClick={() => scrollTo(link.href.slice(1))} className="text-sm text-white/60 hover:text-gold transition-colors">
                {link.name}
              </button>
            ))}
            <button onClick={() => scrollTo("contact")} className="px-5 py-2 bg-gold text-black text-sm font-medium rounded-full hover:bg-white transition">
              Réserver
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-black/95 backdrop-blur-md mx-4 rounded-xl overflow-hidden">
              {navLinks.map((link) => (
                <button key={link.name} onClick={() => scrollTo(link.href.slice(1))} className="block w-full px-5 py-3 text-left text-white/70 border-b border-white/5">
                  {link.name}
                </button>
              ))}
              <button onClick={() => scrollTo("contact")} className="w-full px-5 py-3 text-left text-gold font-medium">
                Réserver
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 -z-10">
          <Image src="https://images.unsplash.com/photo-1504215680853-026ed2a45def?q=80&w=2000" alt="Porsche" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
        </motion.div>

        <div className="relative z-10 text-center px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gold text-xs tracking-[0.3em] uppercase mb-4">
            Location de Prestige
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="font-cormorant text-5xl sm:text-6xl font-semibold mb-4">
            L&apos;Élégance à votre <span className="text-gold">service</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-white/50 mb-8 text-sm">
            Porsche Cayenne avec chauffeur à Metz
          </motion.p>
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} onClick={() => scrollTo("contact")} className="px-8 py-3 bg-gold text-black font-medium rounded-full hover:bg-white transition">
            Réserver maintenant
          </motion.button>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="flex flex-col items-center gap-1 text-white/30">
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* FLOTTE */}
      <section id="flotte" className="py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-10">
            <p className="text-gold text-xs tracking-[0.25em] uppercase mb-2">Flotte</p>
            <h2 className="font-cormorant text-3xl font-semibold">Porsche Cayenne S</h2>
          </motion.div>

          <motion.div {...fadeIn} className="relative rounded-2xl overflow-hidden">
            <div className="relative h-[280px] sm:h-[380px]">
              <Image src="https://images.unsplash.com/photo-1603583153606-aec318f6d7b7?q=80&w=1200" alt="Porsche Cayenne" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-4 right-4 px-3 py-1 bg-gold text-black text-xs font-semibold rounded-full">
                -200€ OFFERT
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-wrap items-center justify-between gap-4 bg-black/60 backdrop-blur-sm">
              <div className="flex gap-6 text-sm text-white/60">
                <span>✓ Cuir</span>
                <span>✓ Clim</span>
                <span>✓ Chauffeur</span>
              </div>
              <div className="text-right">
                <span className="text-gold font-cormorant text-2xl">350€</span>
                <span className="text-white/40 text-xs"> /jour</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-5 bg-black/20">
        <motion.div {...fadeIn} className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {[{ t: "Mariage", d: "Entrée élégante" }, { t: "VIP", d: "Transport exclusif" }, { t: "Célébration", d: "Moment unique" }].map((s, i) => (
              <div key={i} className="px-6 py-4 bg-white/5 rounded-xl border border-white/5 text-center">
                <p className="font-cormorant text-lg">{s.t}</p>
                <p className="text-white/40 text-xs">{s.d}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-5">
        <div className="max-w-md mx-auto">
          <motion.div {...fadeIn} className="text-center mb-8">
            <p className="text-gold text-xs tracking-[0.25em] uppercase mb-2">Contact</p>
            <h2 className="font-cormorant text-3xl font-semibold">Nous contacter</h2>
            <p className="text-white/40 text-sm mt-2">Envoyez-nous un message sur WhatsApp</p>
          </motion.div>

          <motion.form {...fadeIn} onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Votre nom" required value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-white/30 focus:border-gold focus:outline-none transition" />
            <input type="tel" placeholder="Votre téléphone" required value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-white/30 focus:border-gold focus:outline-none transition" />
            <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-gold focus:outline-none transition" />
            <input type="text" placeholder="Lieu de rendez-vous" required value={form.lieu} onChange={(e) => setForm({ ...form, lieu: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-white/30 focus:border-gold focus:outline-none transition" />
            
            <div>
              <p className="text-white/40 text-xs mb-2">Type d&apos;événement</p>
              <div className="flex flex-wrap gap-2">
                {["Mariage", "VIP", "Anniversaire", "Autre"].map((t) => (
                  <button type="button" key={t} onClick={() => setForm({ ...form, type: t })} className={`px-4 py-2 rounded-lg text-sm transition ${form.type === t ? "bg-gold text-black" : "bg-white/5 text-white/50 hover:text-white"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-gold text-black font-medium rounded-lg hover:bg-white transition flex items-center justify-center gap-2">
              <MessageCircle size={18} />
              Envoyer sur WhatsApp
            </button>
          </motion.form>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="py-12 border-t border-white/5">
        <div className="text-center">
          <Instagram className="w-6 h-6 text-gold mx-auto mb-2" />
          <p className="text-white/40 text-xs">Suivez-nous</p>
          <a href="https://instagram.com/ririjourj57" className="text-gold text-lg">@ririjourj57</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-cormorant text-lg text-gold">RIRI JOUR J</p>
            <p className="text-white/25 text-xs">Véhicules de prestige</p>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <Phone className="w-4 h-4" />
            <a href="tel:0762912640">07.62.91.26.40</a>
          </div>
        </div>
        <p className="text-center text-white/15 text-[10px] mt-4">© 2024 Riri Jour J</p>
      </footer>

      {/* WHATSAPP FLOAT */}
      <motion.a href="https://wa.me/33762912640" target="_blank" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }} whileHover={{ scale: 1.1 }} className="fixed bottom-5 right-5 w-11 h-11 bg-gold rounded-full flex items-center justify-center z-50 shadow-lg">
        <MessageCircle className="w-5 h-5 text-black" />
      </motion.a>
    </>
  );
}