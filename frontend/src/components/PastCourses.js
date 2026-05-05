import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const pastCourses = [
  {
    title: "Data Science & AI at IBM",
    date: "April 2026",
    audience: "AI Graduates",
    image: "https://images.unsplash.com/photo-1722573783625-eceb04251036?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2OTV8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB0cmFpbmluZyUyMHNlbWluYXIlMjBjbGFzc3Jvb20lMjBJbmRpYXxlbnwwfHx8fDE3Nzc5NjgzMzV8MA&ixlib=rb-4.1.0&q=85",
  },
  {
    title: "Generative AI & LLMs with RAG",
    date: "October 2025",
    audience: "IBM AI Engineers",
    image: "https://images.unsplash.com/photo-1655337690962-01ff848c057a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjB3b3Jrc2hvcCUyMHByZXNlbnRhdGlvbiUyMGF1ZGllbmNlJTIwdGVjaHxlbnwwfHx8fDE3Nzc5NjgzNDR8MA&ixlib=rb-4.1.0&q=85",
  },
  {
    title: "Applied ML using Python",
    date: "September 2025",
    audience: "Wipro IT Professionals",
    image: "https://images.unsplash.com/photo-1560439514-0fc9d2cd5e1b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3Jrc2hvcCUyMHByZXNlbnRhdGlvbiUyMGF1ZGllbmNlJTIwdGVjaHxlbnwwfHx8fDE3Nzc5NjgzNDR8MA&ixlib=rb-4.1.0&q=85",
  },
  {
    title: "Deep Learning & NLP with Python",
    date: "July 2025",
    audience: "Capgemini PG Students",
    image: "https://images.unsplash.com/photo-1627931539006-d5c4677e05ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjB3b3Jrc2hvcCUyMHByZXNlbnRhdGlvbiUyMGF1ZGllbmNlJTIwdGVjaHxlbnwwfHx8fDE3Nzc5NjgzNDR8MA&ixlib=rb-4.1.0&q=85",
  },
  {
    title: "Big Data & Data Warehouse FDP",
    date: "February 2026",
    audience: "NASSCOM Faculty",
    image: "https://images.unsplash.com/photo-1719159381916-062fa9f435a6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2OTV8MHwxfHNlYXJjaHw0fHxjb3Jwb3JhdGUlMjB0cmFpbmluZyUyMHNlbWluYXIlMjBjbGFzc3Jvb20lMjBJbmRpYXxlbnwwfHx8fDE3Nzc5NjgzMzV8MA&ixlib=rb-4.1.0&q=85",
  },
  {
    title: "AI for Interview Readiness",
    date: "May 2025",
    audience: "TCS Professionals",
    image: "https://images.unsplash.com/photo-1575029644286-efb9039cac46?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjB3b3Jrc2hvcCUyMHByZXNlbnRhdGlvbiUyMGF1ZGllbmNlJTIwdGVjaHxlbnwwfHx8fDE3Nzc5NjgzNDR8MA&ixlib=rb-4.1.0&q=85",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PastCourses() {
  return (
    <section id="gallery" className="py-24 lg:py-32 bg-white" data-testid="past-courses">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">
            Training Gallery
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text mb-4">
            Past Training Sessions
          </h2>
          <p className="text-base leading-relaxed text-na-text-sec max-w-2xl">
            A glimpse into our recent training deliveries across corporate and academic institutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {pastCourses.map((course) => (
            <motion.div
              key={course.title}
              variants={itemVariants}
              className="group rounded-xl overflow-hidden border border-[rgba(15,23,42,0.08)] hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              data-testid={`gallery-card-${course.date.replace(/\s+/g, "-").toLowerCase()}`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={`${course.title} training session`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="w-4 h-4 text-white/80" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-base font-medium text-na-text mb-1">{course.title}</h3>
                <p className="text-xs text-na-text-sec">{course.audience} — {course.date}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
