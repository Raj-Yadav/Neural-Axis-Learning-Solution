import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Send, Loader2, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "", role: "", institution: "", email: "", phone: "", message: "",
  });
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.institution || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/leads`, {
        ...formData,
        preferred_date: date ? format(date, "yyyy-MM-dd") : null,
      });
      setSubmitted(true);
      toast.success("Thank you! We'll be in touch shortly.");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="py-24 lg:py-32 bg-white" data-testid="contact-section">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <CheckCircle2 className="w-16 h-16 text-na-mint mx-auto mb-6" />
            <h2 className="font-heading text-2xl sm:text-3xl tracking-tight font-medium text-na-text mb-4">
              Thank You!
            </h2>
            <p className="text-base text-na-text-sec mb-6">
              Your consultation request has been received. A member of our partnerships team will reach out within 24 hours.
            </p>
            <Button
              onClick={() => { setSubmitted(false); setFormData({ name: "", role: "", institution: "", email: "", phone: "", message: "" }); setDate(null); }}
              variant="outline"
              className="rounded-full"
              data-testid="submit-another"
            >
              Submit Another Request
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white relative gradient-spot-sand" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Context */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">
              Get Started
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text mb-6">
              Schedule a<br />Consultation
            </h2>
            <p className="text-base leading-relaxed text-na-text-sec mb-8">
              For TPOs, Deans, and academic decision-makers. Book a free 15-minute consultation
              to discuss how Neural Axis can transform your institution's AI education offerings.
            </p>
            <div className="space-y-4 text-sm text-na-text-sec">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-na-mint mt-2 flex-shrink-0" />
                <span>No obligation &mdash; explore partnership options at your pace</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-na-mint mt-2 flex-shrink-0" />
                <span>Custom proposals tailored to your department's needs</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-na-mint mt-2 flex-shrink-0" />
                <span>Receive a detailed curriculum outline within 48 hours</span>
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl border border-[rgba(15,23,42,0.08)] p-8 shadow-sm relative z-10"
              data-testid="contact-form"
            >
              <div className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-na-text mb-1.5 block">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Dr. Rajesh Kumar"
                    required
                    className="h-11"
                    data-testid="contact-name"
                  />
                </div>

                <div>
                  <Label htmlFor="role" className="text-sm font-medium text-na-text mb-1.5 block">Your Role *</Label>
                  <Select value={formData.role} onValueChange={(v) => handleChange("role", v)}>
                    <SelectTrigger className="h-11" data-testid="contact-role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dean">Dean</SelectItem>
                      <SelectItem value="HOD">Head of Department</SelectItem>
                      <SelectItem value="TPO">Training & Placement Officer</SelectItem>
                      <SelectItem value="Professor">Professor / Faculty</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="institution" className="text-sm font-medium text-na-text mb-1.5 block">Institution *</Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => handleChange("institution", e.target.value)}
                    placeholder="University / College name"
                    required
                    className="h-11"
                    data-testid="contact-institution"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-na-text mb-1.5 block">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="dean@university.edu"
                      required
                      className="h-11"
                      data-testid="contact-email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-na-text mb-1.5 block">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                      className="h-11"
                      data-testid="contact-phone"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-na-text mb-1.5 block">Preferred Consultation Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full h-11 justify-start text-left font-normal ${!date ? "text-muted-foreground" : ""}`}
                        data-testid="contact-date-picker"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(d) => d < new Date()}
                        data-testid="contact-calendar"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-na-text mb-1.5 block">Message / Requirements</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Tell us about your institution's needs, student strength, or specific areas of interest..."
                    rows={4}
                    data-testid="contact-message"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-na-navy text-white hover:bg-na-navy/90 h-12 rounded-lg text-sm font-medium"
                  data-testid="contact-form-submit"
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Submitting...</>
                  ) : (
                    <><Send className="w-4 h-4 mr-2" /> Schedule Consultation</>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
