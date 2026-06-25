import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../../data';

export default function Contact() {
  return (
    <section className="min-h-screen flex flex-col justify-between py-32 px-6 md:px-12 bg-[#18181B] text-[#F2F0E9]">
      <div>
        <h2 className="text-[10vw] font-serif leading-none mb-12">
          Let's <span className="italic text-[#FF4F00]">Talk</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-end">
        <div className="space-y-8">
          <a 
            href={`mailto:${PERSONAL_INFO.email}`} 
            className="block text-3xl md:text-5xl font-serif hover:text-[#FF4F00] transition-colors"
          >
            {PERSONAL_INFO.email}
          </a>
          <p className="text-xl text-zinc-500">{PERSONAL_INFO.phone}</p>
        </div>

        <div className="flex flex-col md:items-end gap-8">
          <div className="flex flex-wrap gap-6">
            {PERSONAL_INFO.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="text-lg uppercase tracking-widest hover:text-[#FF4F00] transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>
          <p className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} Pavan Srinivas Mamidala.
          </p>
        </div>
      </div>
    </section>
  );
}
