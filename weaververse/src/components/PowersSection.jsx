import { motion } from 'framer-motion';
import { GiSpiderWeb, GiSonicShoes, GiMuscleUp, GiJumpAcross, GiBrain, GiWebSpit } from 'react-icons/gi';
import { FaRegLightbulb, FaBolt } from 'react-icons/fa';

const POWERS = [
  { icon: GiWebSpit, name: 'Wall-Crawling', text: 'Ability to mentally control the electrostatic force between his body and surfaces, sticking to walls at any angle.' },
  { icon: GiSpiderWeb, name: 'Spider-Sense', text: 'An omnidirectional, premonition-like warning sense that alerts him to immediate danger before it happens.' },
  { icon: GiMuscleUp, name: 'Superhuman Strength', text: 'Possesses the proportional strength of a spider, enabling him to lift over 10 tons, stop trains, and throw cars.' },
  { icon: GiSonicShoes, name: 'Superhuman Agility', text: 'His tendons and connective tissues are ultra-flexible, giving him agility, balance, and flexibility far beyond human limits.' },
  { icon: FaBolt, name: 'Web-Shooters', text: 'Wrist-mounted mechanical shooters of his own design that launch high-tensile, sticky fluid that dissolves after an hour.' },
  { icon: FaRegLightbulb, name: 'Genius Intellect', text: 'A brilliant mind in biochemistry, physics, and engineering. He synthesized his own web fluid and built all his gadgets.' },
  { icon: GiJumpAcross, name: 'Superhuman Acrobatics', text: 'Capable of jumps clearing multiple stories, easily flipping between skyscrapers and performing complex air rolls.' },
  { icon: GiBrain, name: 'Spidey Way of Fighting', text: 'Combines superhuman reflexes, spider-sense, and parkour into a unique, unpredictable combat and evasion style.' },
];

export default function PowersSection() {
  return (
    <section id="powers" className="relative py-28 px-6 bg-[#0e0e12]">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-[0.4em] text-[var(--cyan)] mb-3">ABILITIES</p>
        <h2 className="font-display text-4xl sm:text-5xl mb-16">SPIDEY POWERS</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POWERS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
                whileHover={{ y: -4 }}
                className="group relative bg-[var(--carbon)] border border-white/10 rounded-xl p-6 hover:border-[var(--crimson)]/60 transition-colors"
              >
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(230,57,70,0.15),transparent_60%)]" />
                <Icon className="text-3xl text-[var(--crimson)] mb-4 relative z-10" />
                <h3 className="font-display text-lg mb-2 relative z-10">{p.name}</h3>
                <p className="text-[var(--ash)] text-sm relative z-10">{p.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
