import { motion } from "framer-motion";
import { useScrollAnimation } from "@/pages/Animation/useScrollAnimation";

const stats = [
  { value: "500+", label: "Enterprise Clients", delay: 0 },
  { value: "99.9%", label: "Automation Uptime", delay: 0.1 },
  { value: "10x", label: "Efficiency Increase", delay: 0.2 },
  { value: "24/7", label: "AI Support", delay: 0.3 },
];

export function StatsSection() {
  const sectionRef = useScrollAnimation();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 parallax-bg">
      <div className="max-w-7xl mx-auto">
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: stat.delay }}
              viewport={{ once: true }}
              className="animate-on-scroll"
            >
              <motion.div 
                className="text-5xl font-space font-bold gradient-text mb-2"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: stat.delay + 0.2 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>
              <p className="text-muted-foreground font-inter">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
