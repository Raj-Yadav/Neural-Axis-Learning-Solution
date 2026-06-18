import { useEffect, useState } from "react";

function diff(target) {
  const now = Date.now();
  const ms = Math.max(0, target - now);
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  return { days, hours, mins, secs, done: ms === 0 };
}

function Cell({ value, label }) {
  const padded = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center min-w-[58px] sm:min-w-[68px]" data-testid={`countdown-${label.toLowerCase()}`}>
      <span className="font-heading font-medium text-2xl sm:text-3xl tabular-nums leading-none text-na-text">
        {padded}
      </span>
      <span className="text-[10px] uppercase tracking-[0.18em] text-na-text-sec mt-1.5">{label}</span>
    </div>
  );
}

export default function CountdownTimer({ targetDate }) {
  const target = new Date(targetDate).getTime();
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div
      className="inline-flex items-center gap-3 sm:gap-5 px-5 sm:px-6 py-3.5 rounded-2xl bg-white border border-[rgba(15,23,42,0.08)] shadow-sm"
      data-testid="countdown-timer"
      aria-label="Time until next cohort starts"
    >
      <Cell value={t.days} label="Days" />
      <span className="text-na-text-sec/30 text-xl">:</span>
      <Cell value={t.hours} label="Hrs" />
      <span className="text-na-text-sec/30 text-xl">:</span>
      <Cell value={t.mins} label="Mins" />
      <span className="text-na-text-sec/30 text-xl hidden sm:inline">:</span>
      <span className="hidden sm:flex">
        <Cell value={t.secs} label="Secs" />
      </span>
    </div>
  );
}
