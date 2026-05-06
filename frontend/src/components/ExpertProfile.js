import { motion } from "framer-motion";
import { Briefcase, MapPin, Award, Building2 } from "lucide-react";

const experience = [
  { company: "Synergistic Compusoft Pvt. Ltd.", role: "Data Science & AI Trainer", desc: "Advanced training in AI, Generative AI, RAG, and Machine Learning. Curriculum design aligned with AWS ML Engineer certification." },
  { company: "TalentSprint, Hyderabad", role: "Delivery Consultant", desc: "Mentored learners on industry-grade AI/ML projects. Guided project architecture and best practices." },
  { company: "TOPS Technologies, Surat", role: "Senior Technical Trainer", desc: "Led Data Science & AI training across batches. Managed AI/DS trainers and designed curricula." },
  { company: "CapitaWorld, Ahmedabad", role: "Machine Learning Engineer", desc: "Built ML models using Caffe and TensorFlow. Implemented audio analysis with PyAudioAnalysis." },
];

export default function ExpertProfile() {
  return (
    <section id="expert" className="py-24 lg:py-32 bg-[#FAFAFA]" data-testid="expert-profile">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left - Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">
              Meet the Expert
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text mb-6">
              Raj Yadav
            </h2>
            <p className="text-sm text-na-text-sec mb-1 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Data Science & AI Expert
            </p>
            <p className="text-sm text-na-text-sec mb-6 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Gujarat, India
            </p>
            <p className="text-base leading-relaxed text-na-text-sec mb-6">
              With 8+ years of hands-on experience spanning Machine Learning Engineering, 
              AI Architecture, and corporate training delivery, Raj brings a rare combination 
              of industry practice and teaching expertise to every program.
            </p>
            <p className="text-base leading-relaxed text-na-text-sec mb-8">
              From building production ML models at CapitaWorld to delivering enterprise 
              AI training for IBM and TCS, his programs are designed by someone who 
              understands both sides &mdash; the boardroom and the codebase.
            </p>

            {/* Key Highlights */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-na-text">
                <Award className="w-4 h-4 text-na-mint flex-shrink-0" />
                <span>Microsoft & Columbia University certified</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-na-text">
                <Award className="w-4 h-4 text-na-mint flex-shrink-0" />
                <span>deeplearning.ai Deep Learning Specialization</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-na-text">
                <Building2 className="w-4 h-4 text-na-mint flex-shrink-0" />
                <span>Trained teams at IBM, TCS, Wipro, Capgemini</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <h3 className="font-heading text-lg font-medium text-na-text mb-6">Professional Journey</h3>
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <div
                  key={exp.company}
                  className="p-6 rounded-xl border border-[rgba(15,23,42,0.08)] bg-white hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300"
                  data-testid={`exp-card-${i}`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h4 className="font-heading text-base font-medium text-na-text">{exp.role}</h4>
                      <p className="text-sm text-na-text-sec">{exp.company}</p>
                    </div>
                    <Building2 className="w-5 h-5 text-na-text-sec/30 flex-shrink-0" />
                  </div>
                  <p className="text-sm leading-relaxed text-na-text-sec">{exp.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
