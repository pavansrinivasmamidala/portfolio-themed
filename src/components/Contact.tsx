import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 bg-zinc-950 border-t border-white/5">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tight">
            Let's build something <br />
            <span className="text-zinc-600">extraordinary.</span>
          </h2>
          
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            I'm currently available for freelance projects and full-time opportunities.
            If you have a project that needs some creative touch, let's chat.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 pt-12">
            <a 
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-zinc-900 border border-white/5 hover:border-emerald-500/50 hover:bg-zinc-900/80 transition-all group"
            >
              <div className="p-2 rounded-lg bg-zinc-800 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                <Mail size={20} />
              </div>
              <span className="text-zinc-300 group-hover:text-white">{PERSONAL_INFO.email}</span>
            </a>

            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-zinc-900 border border-white/5">
              <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400">
                <Phone size={20} />
              </div>
              <span className="text-zinc-300">{PERSONAL_INFO.phone}</span>
            </div>

            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-zinc-900 border border-white/5">
              <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400">
                <MapPin size={20} />
              </div>
              <span className="text-zinc-300">{PERSONAL_INFO.location}</span>
            </div>
          </div>

          <div className="flex justify-center gap-6 pt-16">
            {PERSONAL_INFO.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="text-zinc-500 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon size={24} />
                <span className="sr-only">{social.name}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
      
      <footer className="max-w-7xl mx-auto mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-600">
        <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>
        <p>Crafted with React & Tailwind CSS</p>
      </footer>
    </section>
  );
}
