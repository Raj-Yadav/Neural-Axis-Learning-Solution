import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Copy,
  CheckCircle2,
  Smartphone,
  IndianRupee,
  Loader2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/**
 * PaymentModal — 3-step UPI payment flow
 * Step 1: Show UPI details, QR code, deep link "Pay via UPI App", copy VPA
 * Step 2: Post-payment form (name, email, phone, UPI Txn Ref)
 * Step 3: Success confirmation
 *
 * Props:
 *  - open (bool)
 *  - onOpenChange (fn)
 *  - course (string)  e.g. "Agentic AI Engineer Bootcamp"
 *  - amount (number)  e.g. 24999
 */
export default function PaymentModal({ open, onOpenChange, course, amount }) {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState(null);
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    upi_txn_ref: "",
    payer_upi: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [enrollment, setEnrollment] = useState(null);

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      // small delay so users don't see reset flash during close animation
      const t = setTimeout(() => {
        setStep(1);
        setForm({ name: "", email: "", phone: "", upi_txn_ref: "", payer_upi: "" });
        setEnrollment(null);
        setCopied(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Fetch UPI config
  useEffect(() => {
    if (!open || config) return;
    setLoadingConfig(true);
    axios
      .get(`${API}/payment/config`)
      .then((res) => setConfig(res.data))
      .catch(() => toast.error("Unable to load payment details. Please try again."))
      .finally(() => setLoadingConfig(false));
  }, [open, config]);

  const upiLink = useMemo(() => {
    if (!config?.upi_id) return "";
    const params = new URLSearchParams({
      pa: config.upi_id,
      pn: config.payee_name || "Payee",
      am: String(amount),
      cu: config.currency || "INR",
      tn: `Enrollment: ${course}`,
    });
    return `upi://pay?${params.toString()}`;
  }, [config, amount, course]);

  const handleCopy = async () => {
    if (!config?.upi_id) return;
    try {
      await navigator.clipboard.writeText(config.upi_id);
      setCopied(true);
      toast.success("UPI ID copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy. Please copy manually.");
    }
  };

  const validForm = () => {
    if (!form.name.trim()) return "Please enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email";
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, "").slice(-10)))
      return "Please enter a valid 10-digit phone";
    if (form.upi_txn_ref.trim().length < 6)
      return "Please enter the UPI transaction / reference number (min 6 chars)";
    return null;
  };

  const handleSubmit = async () => {
    const err = validForm();
    if (err) {
      toast.error(err);
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await axios.post(`${API}/enrollments`, {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        course,
        amount: Number(amount),
        upi_txn_ref: form.upi_txn_ref.trim(),
        payer_upi: form.payer_upi.trim() || undefined,
      });
      setEnrollment(data);
      setStep(3);
      toast.success("Enrollment submitted");
    } catch (e) {
      toast.error(e?.response?.data?.detail || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md sm:max-w-lg p-0 gap-0 overflow-hidden"
        data-testid="payment-modal"
      >
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-3 border-b border-[rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-na-navy" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-na-text-sec">
              Secure UPI Payment
            </p>
          </div>
          <DialogTitle className="font-heading text-xl tracking-tight text-na-text">
            {step === 3 ? "Enrollment received" : course}
          </DialogTitle>
          <DialogDescription className="text-sm text-na-text-sec flex items-center gap-1">
            {step === 3 ? (
              <>We&apos;ll be in touch shortly with joining details.</>
            ) : (
              <>
                Amount:{" "}
                <span className="inline-flex items-center font-medium text-na-navy">
                  <IndianRupee className="w-3.5 h-3.5" />
                  {Number(amount).toLocaleString("en-IN")}
                </span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Step indicator */}
        {step !== 3 && (
          <div className="flex items-center gap-2 px-6 pt-3">
            <StepDot active={step === 1} done={step > 1} label="1" />
            <div className="h-px flex-1 bg-[rgba(15,23,42,0.1)]" />
            <StepDot active={step === 2} done={step > 2} label="2" />
          </div>
        )}

        {/* STEP 1: UPI Payment */}
        {step === 1 && (
          <div className="px-6 py-5" data-testid="payment-step-1">
            {loadingConfig || !config ? (
              <div className="py-16 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-na-navy" />
              </div>
            ) : (
              <>
                {/* QR code */}
                <div className="flex flex-col items-center mb-5">
                  <div className="p-3 bg-white border border-[rgba(15,23,42,0.08)] rounded-2xl shadow-sm">
                    <QRCodeSVG
                      value={upiLink}
                      size={168}
                      level="M"
                      includeMargin={false}
                      data-testid="upi-qr-code"
                    />
                  </div>
                  <p className="text-xs text-na-text-sec mt-3 text-center">
                    Scan with any UPI app — GPay, PhonePe, Paytm, BHIM
                  </p>
                </div>

                {/* UPI ID */}
                <div className="rounded-xl bg-[#F8FAFC] border border-[rgba(15,23,42,0.08)] p-3 mb-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-na-text-sec mb-1">
                    UPI ID
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono text-sm text-na-text truncate" data-testid="upi-id-display">
                      {config.upi_id}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className="h-8 px-2 text-xs"
                      data-testid="upi-copy-btn"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-green-600" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1" /> Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-[11px] text-na-text-sec mt-1">
                    Payee: <span className="text-na-text">{config.payee_name}</span>
                  </p>
                </div>

                {/* Pay via UPI App (mobile deep link) */}
                <a href={upiLink} data-testid="upi-pay-app-btn">
                  <Button className="w-full bg-na-navy text-white hover:bg-na-navy/90 rounded-full py-6 text-sm font-medium mb-3">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Pay via UPI App — ₹{Number(amount).toLocaleString("en-IN")}
                  </Button>
                </a>

                <p className="text-[11px] text-na-text-sec text-center mb-4">
                  Mobile only. On desktop, please scan the QR above.
                </p>

                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="w-full rounded-full py-6 text-sm font-medium border-[rgba(15,23,42,0.15)]"
                  data-testid="payment-next-step-btn"
                >
                  I&apos;ve completed payment <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            )}
          </div>
        )}

        {/* STEP 2: Student details form */}
        {step === 2 && (
          <div className="px-6 py-5" data-testid="payment-step-2">
            <div className="space-y-3">
              <div>
                <Label htmlFor="pm-name" className="text-xs font-medium text-na-text">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="pm-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="mt-1"
                  data-testid="pm-input-name"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="pm-email" className="text-xs font-medium text-na-text">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="pm-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="mt-1"
                    data-testid="pm-input-email"
                  />
                </div>
                <div>
                  <Label htmlFor="pm-phone" className="text-xs font-medium text-na-text">
                    Phone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="pm-phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="10-digit mobile"
                    className="mt-1"
                    data-testid="pm-input-phone"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="pm-txn" className="text-xs font-medium text-na-text">
                  UPI Transaction / Reference No. <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="pm-txn"
                  value={form.upi_txn_ref}
                  onChange={(e) => setForm({ ...form, upi_txn_ref: e.target.value })}
                  placeholder="e.g. 4XXXXXXXXXXX"
                  className="mt-1 font-mono"
                  data-testid="pm-input-txn"
                />
                <p className="text-[11px] text-na-text-sec mt-1">
                  You&apos;ll find this in your UPI app under the payment&apos;s details.
                </p>
              </div>
              <div>
                <Label htmlFor="pm-payer-upi" className="text-xs font-medium text-na-text">
                  Your UPI ID (optional)
                </Label>
                <Input
                  id="pm-payer-upi"
                  value={form.payer_upi}
                  onChange={(e) => setForm({ ...form, payer_upi: e.target.value })}
                  placeholder="e.g. yourname@okhdfcbank"
                  className="mt-1 font-mono"
                  data-testid="pm-input-payer-upi"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-5">
              <Button
                variant="ghost"
                onClick={() => setStep(1)}
                className="rounded-full text-sm text-na-text-sec"
                data-testid="payment-back-btn"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 bg-na-navy text-white hover:bg-na-navy/90 rounded-full py-6 text-sm font-medium"
                data-testid="payment-submit-btn"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting…
                  </>
                ) : (
                  <>Confirm Enrollment</>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Success */}
        {step === 3 && enrollment && (
          <div className="px-6 py-8 text-center" data-testid="payment-step-3">
            <div className="w-14 h-14 rounded-full bg-na-mint-bg flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-green-700" />
            </div>
            <h3 className="font-heading text-xl text-na-text mb-2">
              Thank you, {enrollment.name.split(" ")[0]}!
            </h3>
            <p className="text-sm text-na-text-sec mb-5">
              We&apos;ve received your enrollment for
              <br />
              <span className="text-na-text font-medium">{course}</span>.
            </p>
            <div className="rounded-xl bg-[#F8FAFC] border border-[rgba(15,23,42,0.08)] p-3 text-left mb-5">
              <div className="flex justify-between text-xs py-1">
                <span className="text-na-text-sec">Enrollment ID</span>
                <span className="font-mono text-na-text">{enrollment.id.slice(0, 8)}</span>
              </div>
              <div className="flex justify-between text-xs py-1">
                <span className="text-na-text-sec">UPI Txn Ref</span>
                <span className="font-mono text-na-text">{enrollment.upi_txn_ref}</span>
              </div>
              <div className="flex justify-between text-xs py-1">
                <span className="text-na-text-sec">Amount</span>
                <span className="text-na-text font-medium">
                  ₹{Number(enrollment.amount).toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-xs py-1">
                <span className="text-na-text-sec">Status</span>
                <span className="text-amber-700 font-medium capitalize">
                  {enrollment.status.replace(/_/g, " ")}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-na-text-sec mb-4">
              Our team will verify your payment and email you the joining details within 24 hours.
            </p>
            <Button
              onClick={() => onOpenChange(false)}
              className="w-full bg-na-navy text-white hover:bg-na-navy/90 rounded-full py-6 text-sm font-medium"
              data-testid="payment-close-btn"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function StepDot({ active, done, label }) {
  return (
    <div
      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold border ${
        done
          ? "bg-na-mint-bg text-green-800 border-green-200"
          : active
          ? "bg-na-navy text-white border-na-navy"
          : "bg-white text-na-text-sec border-[rgba(15,23,42,0.15)]"
      }`}
    >
      {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : label}
    </div>
  );
}
