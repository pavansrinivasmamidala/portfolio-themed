import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../../data';

export default function About() {
  return (
    <section className="py-32 px-6 md:px-12 bg-[#18181B] text-[#F2F0E9]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="block text-[#FF4F00] font-serif italic text-2xl mb-8">The Manifesto</span>
          
          <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-12">
            "I believe that code is not just about function, but about <span className="italic text-[#FF4F00]">feeling</span>. It's the silent architecture of the modern world."
          </h2>

          <div className="grid md:grid-cols-2 gap-12 text-lg text-zinc-400 font-light leading-relaxed">
            <p>
              From computer enthusiast to a skilled web architect, I've embarked on a journey to craft captivating, visually stunning, and user-centric websites.
            </p>
            <p>
              My work bridges the gap between complex backend logic and intuitive frontend design. I don't just build websites; I build digital environments where users feel at home.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
