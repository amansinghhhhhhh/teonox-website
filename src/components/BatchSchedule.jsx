import React from "react";
import "./BatchSchedule.scss";

/* ------------------------------------------------------------------ */
/*  Icons (inline SVG, colour comes from CSS `currentColor`)           */
/* ------------------------------------------------------------------ */
const Icon = ({ children, className = "" }) => (
  <svg
    className={`batch-schedule__icon ${className}`.trim()}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

const SunriseIcon = () => (
  <Icon>
    <path d="M2 19h20" />
    <path d="M6 19a6 6 0 0 1 12 0" />
    <path d="M12 6V3" />
    <path d="M4.9 10.2 3.5 8.8" />
    <path d="m19.1 10.2 1.4-1.4" />
  </Icon>
);

const SunIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </Icon>
);

const MoonIcon = () => (
  <Icon>
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
  </Icon>
);

const PinIcon = () => (
  <Icon>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
);

const MonitorIcon = () => (
  <Icon>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8" />
    <path d="M12 16v4" />
  </Icon>
);

/* ------------------------------------------------------------------ */
/*  Config + default data                                              */
/* ------------------------------------------------------------------ */
const COLUMNS = [
  { key: "morning", label: "Morning batch", Icon: SunriseIcon },
  { key: "afternoon", label: "Afternoon batch", Icon: SunIcon },
  { key: "evening", label: "Evening batch", Icon: MoonIcon },
];

const MODES = {
  offline: { label: "Offline", Icon: PinIcon },
  online: { label: "Online", Icon: MonitorIcon },
};

/*
  Slot shape: { time: string, mode: "offline" | "online" }
  `null` = no batch that month (renders an empty placeholder).
  Month format: "<Month> <Year>", split at the first space for display.
*/
export const DEFAULT_SCHEDULE = [
  {
    month: "December 2026",
    morning: { time: "11:00 AM \u2013 1:00 PM", mode: "offline" },
    afternoon: null,
    evening: { time: "8:00 PM \u2013 10:00 PM", mode: "online" },
  },
  {
    month: "January 2027",
    morning: null,
    afternoon: { time: "2:00 PM \u2013 4:00 PM", mode: "offline" },
    evening: { time: "5:00 PM \u2013 7:00 PM", mode: "online" },
  },
  {
    month: "February 2027",
    morning: { time: "8:00 AM \u2013 10:00 AM", mode: "online" },
    afternoon: { time: "12:00 PM \u2013 2:00 PM", mode: "offline" },
    evening: null,
  },
  {
    month: "March 2027",
    morning: { time: "9:00 AM \u2013 11:00 AM", mode: "offline" },
    afternoon: null,
    evening: { time: "8:00 PM \u2013 10:00 PM", mode: "online" },
  },
];

/* ------------------------------------------------------------------ */
/*  Cell                                                               */
/* ------------------------------------------------------------------ */
const Slot = ({ slot, label }) => {
  if (!slot) {
    return (
      <div
        role="cell"
        className="batch-schedule__cell batch-schedule__cell--empty"
        data-label={label}
      >
        <div className="batch-schedule__slot batch-schedule__slot--empty">
          <span className="batch-schedule__dash" aria-hidden="true" />
          <span className="batch-schedule__sr">No batch</span>
        </div>
      </div>
    );
  }

  const modeKey = slot.mode === "online" ? "online" : "offline";
  const { label: modeLabel, Icon: ModeIcon } = MODES[modeKey];

  return (
    <div role="cell" className="batch-schedule__cell" data-label={label}>
      <div className={`batch-schedule__slot batch-schedule__slot--${modeKey}`}>
        <span className="batch-schedule__time">{slot.time}</span>
        <span className="batch-schedule__pill">
          <ModeIcon />
          {modeLabel}
        </span>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Table                                                              */
/* ------------------------------------------------------------------ */
const BatchSchedule = ({ schedule = DEFAULT_SCHEDULE, className = "" }) => (
  <div
    className={`batch-schedule ${className}`.trim()}
    role="table"
    aria-label="Batch schedule"
  >
    <div role="rowgroup" className="batch-schedule__head">
      <div role="row" className="batch-schedule__row">
        <div role="columnheader" className="batch-schedule__head-cell">
          Month
        </div>
        {COLUMNS.map(({ key, label, Icon: HeadIcon }) => (
          <div key={key} role="columnheader" className="batch-schedule__head-cell">
            <span className="batch-schedule__chip">
              <HeadIcon />
            </span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>

    <div role="rowgroup" className="batch-schedule__body">
      {schedule.map((row) => {
        const [monthName, ...rest] = row.month.split(" ");
        return (
          <div role="row" className="batch-schedule__row" key={row.month}>
            <div role="rowheader" className="batch-schedule__month">
              <span className="batch-schedule__month-name">{monthName}</span>
              {rest.length > 0 && (
                <span className="batch-schedule__month-year">{rest.join(" ")}</span>
              )}
            </div>
            {COLUMNS.map(({ key, label }) => (
              <Slot key={key} slot={row[key]} label={label} />
            ))}
          </div>
        );
      })}
    </div>
  </div>
);

export default BatchSchedule;
