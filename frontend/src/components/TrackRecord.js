import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

const partners = [
  "IBM", "Bhilai University", "TCS", "Infosys", "NIT Raipur", "IIT Bhilai",
  "Wipro", "CSVTU", "GGU", "Tech Mahindra", "AICTE", "NPTEL",
];

const stats = [
  { value: "8+", label: "Years of Experience" },
  { value: "50+", label: "Institutions Trained" },
  { value: "10K+", label: "Students Impacted" },
  { value: "200+", label: "FDPs Delivered" },
];

export default function TrackRecord() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-[#FAFAFA] relative overflow-hidden" data-testid="track-record">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">
            Proven Track Record
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text">
            Trusted by Industry &<br />Academia Alike
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-xl border border-[rgba(15,23,42,0.08)] bg-white"
              data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <p className="font-heading text-4xl sm:text-5xl font-medium tracking-tighter text-na-navy mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-na-text-sec">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Content + Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-16"
        >
          <div>
            <p className="text-base leading-relaxed text-na-text-sec mb-6">
              With over <strong className="text-na-text font-medium">8 years of specialized industry experience</strong>, 
              Neural Axis has successfully delivered training programs for corporate leaders 
              like <strong className="text-na-text font-medium">IBM</strong> and premier academic institutions 
              including <strong className="text-na-text font-medium">Bhilai University</strong>.
            </p>
            <p className="text-base leading-relaxed text-na-text-sec">
              Our programs are designed by industry practitioners who understand both the academic 
              framework and the demands of real-world AI deployment. We don't just teach theory 
              &mdash; we build production-ready skills.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden border border-[rgba(15,23,42,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1775933802859-27889463db79?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwY2FtcHVzJTIwZ2xhc3MlMjBidWlsZGluZ3xlbnwwfHx8fDE3NzcyNzUxOTN8MA&ixlib=rb-4.1.0&q=85"
              alt="Modern university campus"
              className="w-full h-64 lg:h-80 object-cover"
              data-testid="campus-image"
            />
          </div>
        </motion.div>

        {/* Partner Marquee */}
        <div className="py-8 border-t border-b border-[rgba(15,23,42,0.08)]">
          <Marquee speed={30} gradient={true} gradientColor="#FAFAFA" gradientWidth={80}>
            {partners.map((partner) => (
              <span
                key={partner}
                className="mx-12 text-lg font-heading font-medium text-na-text-sec/40 tracking-tight whitespace-nowrap"
              >
                {partner}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
