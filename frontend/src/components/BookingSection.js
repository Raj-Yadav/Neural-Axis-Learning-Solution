import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// REPLACE THIS URL with your actual Google Calendar Appointment Scheduling URL
const GOOGLE_CALENDAR_URL = null; // e.g., "https://calendar.google.com/calendar/appointments/schedules/..."

export default function BookingSection() {
  return (
    <section id="booking" className="py-20 lg:py-24 bg-na-blue-bg/50" data-testid="booking-section">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">
            Book a Consultation
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text mb-4">
            Schedule a 15-Minute Call
          </h2>
          <p className="text-base leading-relaxed text-na-text-sec max-w-xl mx-auto mb-10">
            Pick a time that works for you. Our partnerships team will discuss your institution's 
            needs and recommend the right program.
          </p>
        </motion.div>

        {GOOGLE_CALENDAR_URL ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl overflow-hidden border border-[rgba(15,23,42,0.08)] bg-white shadow-sm"
          >
            <iframe
              src={GOOGLE_CALENDAR_URL}
              title="Book a consultation"
              className="w-full h-[600px] border-0"
              loading="lazy"
              data-testid="calendar-embed"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-10 text-center shadow-sm"
            data-testid="booking-card"
          >
            <div className="w-16 h-16 rounded-2xl bg-na-mint-bg flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-na-navy" />
            </div>
            <h3 className="font-heading text-xl font-medium text-na-text mb-3">
              Free 15-Minute Consultation
            </h3>
            <p className="text-sm text-na-text-sec mb-6 max-w-md mx-auto">
              Discuss your institution's AI training needs with our partnerships team. 
              No obligation — just a focused conversation about what's possible.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-na-text-sec">
                <Clock className="w-4 h-4 text-na-mint" /> 15 min
              </div>
              <div className="flex items-center gap-2 text-sm text-na-text-sec">
                <Calendar className="w-4 h-4 text-na-mint" /> Google Meet / Phone
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="https://wa.me/919265802045?text=Hi%20Neural%20Axis%2C%20I%27d%20like%20to%20schedule%20a%2015-minute%20consultation%20about%20AI%20training%20for%20our%20institution." target="_blank" rel="noopener noreferrer">
                <Button className="bg-na-navy text-white hover:bg-na-navy/90 rounded-full px-8 py-5 text-sm font-medium" data-testid="booking-whatsapp-cta">
                  Book via WhatsApp <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <a href="tel:+919265802045">
                <Button variant="outline" className="rounded-full px-8 py-5 text-sm font-medium border-[rgba(15,23,42,0.15)]" data-testid="booking-call-cta">
                  Call Now
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
