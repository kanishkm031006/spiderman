import { motion } from 'framer-motion';

const ENTRIES = [
  {
    tag: 'FILE 01 — PETER PARKER',
    title: 'Just Peter Parker',
    text: "Before the mask, Peter Parker was a quiet high-school student from Forest Hills, Queens. Raised by his loving Uncle Ben and Aunt May, Peter was a brilliant science prodigy who was often overlooked and bullied by his peers.",
  },
  {
    tag: 'FILE 02 — THE RADIOACTIVE SPIDER',
    title: 'The Radioactive Bite',
    text: "During a public science demonstration on radioactive safety, a stray spider wandered into a high-energy particle accelerator beam. Absorbing immense radiation, the dying arachnid landed on Peter's hand and bit him, altering his DNA forever.",
  },
  {
    tag: 'FILE 03 — SPIDEY SENSE & POWER',
    title: 'What Changed',
    text: "Peter woke up to find his reflexes heightened, his strength magnified, and his fingers capable of clinging to solid walls. Most shocking of all was a static prickling in his mind: a danger-detecting 'Spider-Sense' that warned him of threats before they happened.",
  },
  {
    tag: 'FILE 04 — THE CRITICAL TRAGEDY',
    title: 'Uncle Ben\'s Legacy',
    text: "Seeking easy cash, Peter entered a wrestling match and let a thief escape. That same burglar later killed his Uncle Ben. Peter realized that his inaction had led to tragedy, cementing his moral compass: 'With great power there must also come great responsibility.'",
  },
  {
    tag: 'FILE 05 — THE RED & BLUE SUIT',
    title: 'Web-Shooters & Mask',
    text: "Peter designed a custom red and blue suit to hide his identity. Using his genius intellect, he created fluid chemical cartridges and mechanical wrist-worn web-shooters to swing effortlessly through the concrete canyons of Manhattan.",
  },
  {
    tag: 'FILE 06 — AMAZING LEGACY',
    title: 'The Friendly Neighbor',
    text: "Facing classic villains like the Green Goblin, Doctor Octopus, and Venom, Spider-Man has protected New York City for decades. Through every hardship, Peter honors Uncle Ben's memory by remaining our friendly neighborhood hero.",
  },
];

export default function StorySection() {
  return (
    <section id="story" className="relative py-28 px-6 bg-[var(--obsidian)]">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-xs tracking-[0.4em] text-[var(--crimson)] mb-3">ORIGIN</p>
        <h2 className="font-display text-4xl sm:text-5xl mb-16">HOW THE WEB BEGAN</h2>

        <div className="space-y-16">
          {ENTRIES.map((e, i) => (
            <motion.div
              key={e.tag}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className={`grid sm:grid-cols-[120px_1fr] gap-6 ${i % 2 === 1 ? 'sm:text-right sm:grid-cols-[1fr_120px] sm:[&>*:first-child]:order-2' : ''}`}
            >
              <div className="font-mono text-[10px] text-[var(--ash)] tracking-widest pt-1">{e.tag}</div>
              <div>
                <h3 className="font-display text-2xl text-[var(--silk)] mb-2">{e.title}</h3>
                <p className="text-[var(--ash)] leading-relaxed">{e.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
