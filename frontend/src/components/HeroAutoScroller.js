import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

// Top 6 course images sourced from bytebyteai.com (public assets, hot-linked).
// Native size 260x282; we set explicit width/height to avoid layout shift.
const COURSE_IMAGES = [
  { src: "https://bytebyteai.com/assets/ai-course-1.Do98dAdD_DAXt1.png", alt: "AI course visual 1" },
  { src: "https://bytebyteai.com/assets/ai-course-2.DTQbULvG_1643Aj.png", alt: "AI course visual 2" },
  { src: "https://bytebyteai.com/assets/ai-course-3.rJayvh3s_14NfiG.png", alt: "AI course visual 3" },
  { src: "https://bytebyteai.com/assets/ai-course-4.dLMHDYJG_Z1fpUo.png", alt: "AI course visual 4" },
  { src: "https://bytebyteai.com/assets/ai-course-5.DLQ08axD_1GxheK.png", alt: "AI course visual 5" },
  { src: "https://bytebyteai.com/assets/ai-course-6.BxACXkAK_1lGtBn.png", alt: "AI course visual 6" },
];

function ImageCard({ src, alt, eager }) {
  return (
    <div className="mx-2 shrink-0 w-[180px] h-[195px] rounded-xl overflow-hidden bg-white shadow-sm border border-white/60">
      <img
        src={src}
        alt={alt}
        width={180}
        height={195}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="w-full h-full object-cover"
        draggable={false}
      />
    </div>
  );
}

export default function HeroAutoScroller() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return (
    <div
      className="relative rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 shadow-lg p-5 overflow-hidden"
      data-testid="hero-auto-scroller"
      aria-label="Showcase of AI engineering course visuals"
    >
      {/* Soft gradient overlays on left/right edges for fade-in effect */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white/80 to-transparent rounded-l-2xl" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white/80 to-transparent rounded-r-2xl" />

      <div className="space-y-4">
        <Marquee gradient={false} speed={40} pauseOnHover autoFill play={!reducedMotion}>
          {COURSE_IMAGES.map((img, i) => (
            <ImageCard key={`row1-${i}`} src={img.src} alt={img.alt} eager={i < 3} />
          ))}
        </Marquee>

        <Marquee gradient={false} speed={30} direction="right" pauseOnHover autoFill play={!reducedMotion}>
          {COURSE_IMAGES.slice().reverse().map((img, i) => (
            <ImageCard key={`row2-${i}`} src={img.src} alt={img.alt} eager={false} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
