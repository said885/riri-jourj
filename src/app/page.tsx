"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Instagram, Phone, MessageCircle, Menu, X, Check, ChevronDown, MapPin, Calendar, User, Phone as PhoneIcon } from "lucide-react";

const fleet = [
  { id: 1, name: "Porsche Cayenne S", category: "SUV Prestige", price: "350€", badge: "-200€", image: "/images/cayenne-ext.jpg", features: ["Cuir Nappa", "Climatisation", "Chauffeur"] },
  { id: 2, name: "Porsche Cayenne Int.", category: "Interior", price: "Inclus", badge: null, image: "/images/cayenne-int.jpg", features: ["Finitions luxe", "Confort max", "Bar"] },
];

const instagramPosts = [
  { id: 1, image: "/images/inasta-1.jpg", alt: "Mariage elegant" },
  { id: 2, image: "/images/inasta-2.jpg", alt: "BMW Serie 7" },
  { id: 3, image: "/images/inasta-3.jpg", alt: "Mercedes" },
  { id: 4, image: "/images/inasta-4.jpg", alt: "Porsche" },
  { id: 5, image: "/images/inasta-5.jpg", alt: "Anniversaire" },
  { id: 6, image: "/images/inasta-6.jpg", alt: "VIP" },
];

const navLinks = [
  { name: "Accueil", href: "#home" },
  { name: "Flotte", href: "#flotte" },
  { name: "Contact", href: "#contact" },
];

function SkeletonCard() {
  return (
    <div className="relative h-48 rounded-xl overflow-hidden bg-white/5">
      <div className="absolute inset-0 border border-gold/20 rounded-xl animate-pulse" />
      <div className="absolute inset-0 border-[2px] border-transparent hover:border-gold/40 rounded-xl transition-colors duration-500" />
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ nom: "", tel: "", date: "", lieu: "", type: "Mariage" });

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
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

  return (
    <>
      {/* NAV */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-md py-3" : "py-6"}`}>
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

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="md:hidden bg-black/95 backdrop-blur-md mx-4 mt-4 rounded-xl overflow-hidden">
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
      </nav>

      {/* HERO WITH PARALLAX */}
      <section ref={heroRef} id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, scale, opacity }} className="absolute inset-0 -z-10">
          <Image src="https://images.unsplash.com/photo-1504215680853-026ed2a45def?q=80&w=2000" alt="Porsche" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />
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

      {/* FLOTTE - LOCAL IMAGES */}
      <section id="flotte" className="py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-gold text-xs tracking-[0.25em] uppercase mb-2">Notre Flotte</p>
            <h2 className="font-cormorant text-3xl font-semibold">Véhicules d&apos;Exception</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {fleet.map((car, i) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden"
              >
                {/* Gold border animation */}
                <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/40 rounded-2xl transition-colors duration-500" />
                
                <div className="relative h-52">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {car.badge && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-gold text-black text-xs font-semibold rounded-full">
                      {car.badge}
                    </div>
                  )}
                </div>

                <div className="p-4 bg-white/5">
                  <p className="text-gold text-xs tracking-widest mb-1">{car.category}</p>
                  <h3 className="font-cormorant text-xl font-semibold mb-2">{car.name}</h3>
                  <div className="flex gap-4 text-white/50 text-sm mb-3">
                    {car.features.map((f, j) => <span key={j}>✓ {f}</span>)}
                  </div>
                  <p className="text-gold font-cormorant text-2xl">{car.price}<span className="text-white/30 text-sm">/jour</span></p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIE INSTAGRAM */}
      <section className="py-20 px-5 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
            <Instagram className="w-8 h-8 text-gold mx-auto mb-3" />
            <p className="text-gold text-xs tracking-[0.25em] uppercase mb-2">Instagram</p>
            <h2 className="font-cormorant text-2xl">@ririjourj57</h2>
          </motion.div>

          <div className="grid grid-cols-3 gap-2">
            {instagramPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative aspect-square group"
              >
                {/* Skeleton / Loading state */}
                <div className="absolute inset-0 border border-white/10 group-hover:border-gold/30 rounded-lg transition-colors duration-300" />
                
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-400 rounded-lg"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-6">
            <a href="https://instagram.com/ririjourj57" target="_blank" className="text-gold text-sm hover:underline">
              Voir plus sur Instagram →
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-5">
        <div className="max-w-md mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
            <p className="text-gold text-xs tracking-[0.25em] uppercase mb-2">Contact</p>
            <h2 className="font-cormorant text-3xl font-semibold">Nous contacter</h2>
            <p className="text-white/40 text-sm mt-2">Envoyez-nous un message sur WhatsApp</p>
          </motion.div>

          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
              <input type="text" placeholder="Votre nom" required value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/30 focus:border-gold focus:outline-none" />
            </div>
            <div className="relative">
              <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
              <input type="tel" placeholder="Votre téléphone" required value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/30 focus:border-gold focus:outline-none" />
            </div>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
              <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:border-gold focus:outline-none" />
            </div>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
              <input type="text" placeholder="Lieu de rendez-vous" required value={form.lieu} onChange={(e) => setForm({ ...form, lieu: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/30 focus:border-gold focus:outline-none" />
            </div>
            
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

      {/* FOOTER */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-cormorant text-lg text-gold">RIRI JOUR J</p>
            <p className="text-white/25 text-xs">Véhicules de prestige à Metz</p>
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <Phone className="w-4 h-4" />
            <a href="tel:0762912640">07.62.91.26.40</a>
          </div>
        </div>
        <p className="text-center text-white/15 text-[10px] mt-4">© 2024 Riri Jour J • Ne pas jeter sur la voie publique</p>
      </footer>

      {/* WHATSAPP FLOAT */}
      <motion.a href="https://wa.me/33762912640" target="_blank" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }} whileHover={{ scale: 1.1 }} className="fixed bottom-5 right-5 w-12 h-12 bg-gold rounded-full flex items-center justify-center z-50 shadow-lg">
        <MessageCircle className="w-6 h-6 text-black" />
      </motion.a>
    </>
  );
}