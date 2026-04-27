import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is the minimum batch size for a training program?",
    a: "We work with batches as small as 30 students or faculty members. For large institutions, we can run parallel batches across departments simultaneously.",
  },
  {
    q: "How long are the typical programs?",
    a: "Faculty Development Programs (FDPs) run 5-10 days. Student bootcamps are typically 2-4 weeks. Curriculum integration is a semester-long engagement with phased delivery.",
  },
  {
    q: "Can the curriculum be customized for our department?",
    a: "Absolutely. Every program is tailored to your department's focus area, student level, and accreditation requirements. We design custom syllabi after a needs assessment call.",
  },
  {
    q: "Do you handle logistics, or does the institution need to arrange everything?",
    a: "We handle all training delivery — content, materials, lab setup guides, and assessment frameworks. The institution provides the venue and AV equipment. We can also deliver entirely online.",
  },
  {
    q: "How does this help with NAAC/NBA accreditation?",
    a: "Our programs are designed around Outcome-Based Education (OBE) frameworks. We provide mapped Course Outcomes (COs), Program Outcomes (POs), and assessment rubrics that directly feed into your accreditation documentation.",
  },
  {
    q: "What post-training support do you provide?",
    a: "All programs include 30 days of post-training support — doubt resolution, project guidance, and access to updated learning materials. For curriculum integration, we offer ongoing semester support.",
  },
  {
    q: "Do you provide certificates?",
    a: "Yes. All participants receive a Neural Axis Certificate of Completion. For select programs, we also facilitate industry-recognized certifications from partners like Microsoft and AWS.",
  },
  {
    q: "What makes Neural Axis different from other training providers?",
    a: "Our trainers are practitioners — ML engineers and AI architects with production deployment experience, not just academic instructors. We teach what companies like IBM, TCS, and Wipro actually expect from new hires.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-[#FAFAFA]" data-testid="faq-section">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">
            Common Questions
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text">
            Frequently Asked
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3" data-testid="faq-accordion">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-[rgba(15,23,42,0.08)] rounded-xl bg-white px-6 data-[state=open]:shadow-sm transition-shadow"
                data-testid={`faq-item-${i}`}
              >
                <AccordionTrigger className="text-sm font-medium text-na-text text-left hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-na-text-sec pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
