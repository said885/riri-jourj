"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Instagram, Phone, MessageCircle, Menu, X, ChevronRight, 
  Calendar, Heart, Briefcase, Plane, Sparkles, ArrowRight, 
  Check, Car, Gauge, Gem
} from "lucide-react";

const sections = {
  hero: { title: "L'Exceptionnel pour votre", subtitle: "Jour J" },
};

const features = [
  { icon: Gem, title: "Un écrin de luxe", desc: "Profitez d'un intérieur raffiné et technologique" },
  { icon: Gauge, title: "Prestige & Puissance", desc: "435cv sous le capot" },
  { icon: Heart, title: "Pour vos événements", desc: "Mariage, VIP, celebration exclusive" },
];

const mariages = [
  { id: 1, title: " Mariage fleuri", image: "/images/mariage-fleurs.webp" },
  { id: 2, title: "Moment inoubliable", image: "/images/mariages.webp" },
];

const gallery = [
  "/images/cayenne-ext.webp", "/images/cayenne-int.webp",
  "/images/arrière.webp", "/images/profil.webp",
  "/images/jante.webp", "/images/mariage-fleurs.webp",
];

const steps = [
  { id: 1, title: "Date", options: ["Sam 24 Mai", "Dim 25 Mai", "Sam 31 Mai", "Dim 1er Juin"] },
  { id: 2, title: " Événement", options: ["Mariage", "VIP", "Anniversaire", "Célébration"] },
  { id: 3, title: "Véhicule", options: ["Porsche Cayenne S", "Porsche Cayenne +"] },
  { id: 4, title: "Contact", fields: ["Nom", "Téléphone", "Lieu"] },
];

const fadeIn = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7 },
};

const slideIn = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
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
  const { scrollYProgress } = useScroll({ target: heroRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

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
      {/* Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.025] z-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbk9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIi8+PC9zdmc+')]" />

      {/* NAV */}
      <motion.nav className={`fixed top-0 left-0 right-0 z-40 transition-all ${scrolled ? "glass py-3" : "py-6"}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="font-tenor text-xl text-gold tracking-[0.2em]">
            RIRI JOUR J
          </button>
          <div className="hidden lg:flex items-center gap-8">
            {["Accueil", "Confort", "Événements", "Contact"].map((l) => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())} className="text-sm text-white/40 hover:text-gold transition">{l}</button>
            ))}
            <button onClick={() => setFormOpen(true)} className="px-6 py-2.5 bg-gold text-[#050505] rounded-full hover:bg-white text-sm font-medium">
              Réserver
            </button>
          </div>
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="lg:hidden glass mx-4 mt-4 rounded-xl">
            {["Accueil", "Confort", "Événements", "Contact"].map((l) => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())} className="block w-full px-6 py-4 text-left text-white/40">{l}</button>
            ))}
          </motion.div>
        )}
      </motion.nav>

      {/* HERO - Place d'Armes Metz */}
      <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center">
        <motion.div style={{ y, opacity }} className="absolute inset-0 -z-10">
          <Image src="https://images.unsplash.com/photo-1616423664045-60dd7c01f3b7?q=80&w=2000" alt="Porsche Cayenne Metz" fill className="object-cover brightness-[0.6]" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
        </motion.div>
        <div className="max-w-6xl mx-auto px-6 py-32 w-full">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gold text-xs tracking-[0.4em] uppercase mb-6">
            Metz • Lorraine
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="font-tenor text-5xl lg:text-7xl font-light mb-6">
            {sections.hero.title}<br /><span className="text-gold">{sections.hero.subtitle}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-white/40 max-w-md mb-10 font-light">
            Location de Porsche Cayenne S avec chauffeur pour vos événements exceptionnels.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <button onClick={() => setFormOpen(true)} className="px-8 py-4 bg-gold text-[#050505] rounded-full hover:bg-white flex items-center gap-2">
              Réserver <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-white/20 flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-widest">Scroll</span>
            <ChevronRight size={16} className="rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* CONFORT INTÉRIEUR - LEDs Violettes */}
      <section id="confort" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn} className="order-2 lg:order-1">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=800" alt="Intérieur Porsche LEDs" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60" />
              </div>
            </motion.div>
            <motion.div {...slideIn} className="order-1 lg:order-2">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Confort</p>
              <h2 className="font-tenor text-4xl lg:text-5xl mb-6">Un écrin de luxe</h2>
              <p className="text-white/40 mb-8 font-light">
                Profitez d'un intérieur raffiné et technologique pour vos déplacements. 
                LEDs ambient violettes, cuir nappa, système audio premium.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  "Cuir Nappa", "LEDs violettes", "Sièges massants", "Climatisation"
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check size={16} className="text-gold" />
                    <span className="text-white/60">{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setFormOpen(true)} className="px-8 py-4 border border-gold text-gold rounded-full hover:bg-gold hover:text-[#050505] transition">
                Réserver ce véhicule
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MARIAGE & ÉVÉNEMENTS - Polaroid Layout */}
      <section id="événements" className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Événements</p>
            <h2 className="font-tenor text-4xl lg:text-5xl">Vos moments exceptionnels</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {mariages.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, rotateX: -10 }}
                whileInView={{ opacity: 1, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-white/10 rounded-2xl transform rotate-1 transition-transform group-hover:rotate-2" />
                <div className="relative bg-white/5 rounded-xl overflow-hidden border border-white/10">
                  <Image src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800" alt={m.title} fill className="aspect-[4/3] object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="font-tenor text-xl text-white">{m.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DÉTAILS - Jante Porsche */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <div className="relative w-48 h-48 mx-auto mb-8 rounded-full border border-gold/20 flex items-center justify-center">
              <Image src="https://images.unsplash.com/photo-1617821472122-6fbdbfa055cc?q=80&w=400" alt="Jante Porsche" fill className="rounded-full object-cover" />
            </div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Prestige & Excellence</p>
            <h2 className="font-tenor text-3xl lg:text-4xl mb-4">435cv de pur plaisir</h2>
            <p className="text-white/40 font-light">
              Étriers rouges, jantes 21 pouces, moteur V6 biturbo. Chaque détail reflète l'excellence Porsche.
            </p>
          </motion.div>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {gallery.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative aspect-square group"
              >
                <Image src={img} alt={`Vue ${i + 1}`} fill className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/40 rounded-lg transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="py-20 border-t border-white/5">
        <div className="text-center">
          <Instagram className="w-8 h-8 text-gold mx-auto mb-3" />
          <p className="text-white/30 mb-2">Suivez-nous</p>
          <a href="https://instagram.com/ririjourj57" className="font-tenor text-2xl text-gold">@ririjourj57</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="font-tenor text-lg text-gold">RIRI JOUR J</p>
            <p className="text-white/20 text-sm">Metz • Lorraine</p>
          </div>
          <div className="flex items-center gap-2 text-white/30">
            <Phone size={14} />
            <a href="tel:0762912640">07.62.91.26.40</a>
          </div>
        </div>
      </footer>

      {/* FORMULAIRE FLOTTANT */}
      <AnimatePresence>
        {formOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setFormOpen(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="glass-card rounded-2xl p-8 w-full max-w-md">
              <div className="flex justify-between mb-6">
                <h3 className="font-tenor text-2xl">Réservation</h3>
                <button onClick={() => setFormOpen(false)}><X size={20} className="text-white/40" /></button>
              </div>
              <div className="flex gap-2 mb-6">
                {steps.map((_, i) => <div key={i} className={`h-1 flex-1 rounded-full ${i <= formStep ? "bg-gold" : "bg-white/10"}`} />)}
              </div>
              <p className="text-gold text-xs uppercase tracking-widest mb-4">{steps[formStep].title}</p>
              {steps[formStep].options ? (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {steps[formStep].options.map((opt) => (
                    <button key={opt} onClick={() => setFormData({ ...formData, [formStep]: opt })} className={`py-4 rounded-xl border transition ${formData[formStep] === opt ? "border-gold bg-gold/10 text-gold" : "border-white/10 hover:border-white/30"}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 mb-6">
                  {steps[formStep].fields.map((field, i) => (
                    <input key={field} type={field === "Téléphone" ? "tel" : "text"} placeholder={field} value={formData[i]} onChange={(e) => setFormData({ ...formData, [formStep]: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:border-gold focus:outline-none" />
                  ))}
                </div>
              )}
              <button onClick={nextStep} disabled={!formData[formStep]} className="w-full py-4 bg-gold text-[#050505] rounded-full hover:bg-white disabled:opacity-50 flex items-center justify-center gap-2">
                {formStep < steps.length - 1 ? "Continuer" : "Confirmer"} <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WHATSAPP */}
      <motion.a href="https://wa.me/33762912640" initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.1 }} className="fixed bottom-6 right-6 w-12 h-12 bg-gold rounded-full flex items-center justify-center z-40">
        <MessageCircle className="w-6 h-6 text-[#050505]" />
      </motion.a>
    </div>
  );
}