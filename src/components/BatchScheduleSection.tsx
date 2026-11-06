import React from 'react';
import { Sunrise, Sun, Moon, Wifi, Building2 } from 'lucide-react';
import { includesBatchSchedule, BATCH_SCHEDULE } from '../data/batchSchedule';

export { includesBatchSchedule };

/**
 * Responsive Batch Schedule section — rendered right above the final CTA
 * on both the offline flagship page (ProgramV2Layout) and the online page
 * (OnlineProgrammePage). Two layouts:
 *   • Desktop (sm+):       <table> with Month | Morning | Afternoon | Evening
 *   • Mobile (<sm):        one card per month, three labelled rows
 *
 * Props
 *  - rows:      BatchRow[]  (from src/data/batchSchedule)
 *  - slug:      string      (programme slug, used only for badge logic)
 */
export function BatchScheduleSection({ rows, slug }: { rows: BatchRow[]; slug: string }) {
  const scheduleIncludes = includesBatchSchedule(slug);

  if (!scheduleIncludes) return null;

  // Determine the mode badge class for a slot
  function slotClass(mode: SessionMode | null, time: string) {
    if (!mode) return 'bg-[#AAAAAA] text-white self-center';
    if (mode === 'Online') return 'bg-[#FFF1EB] text-[#F15A29] border-[#F8E3D8] self-center';
    return 'bg-[#111111] text-white self-center';
  }

  // Determines the overall section background/border per month mode mix
  function monthBgClass(modes: SessionMode | null[]): string {
    const hasOnline = modes.includes('Online');
    const hasOffline = modes.includes('Offline');
    if (hasOnline && hasOffline) return 'bg-[#FAF8F5] border-[#ECECEC]';
    if (hasOnline) return 'bg-[#FFF1EB] border-[#F8E3D8]';
    if (hasOffline) return 'bg-[#F8F6F2] border-[#E2E8F0]';
    return 'bg-white border-[#ECECEC]';
  }

  function modeIcon(mode: SessionMode | null) {
    if (!mode) return null;
    if (mode === 'Online') return <Sun className="w-4 h-4 mr-1" />;
    return <Moon className="w-4 h-4 mr-1" />;
  }

  function timeSlot(
    time: string,
    mode: SessionMode | null,
    icon: React.ReactNode | null,
  ) {
    return (
      <span
        className={slotClass(mode, time)}
        title={mode || 'Not available'}
      >
        {icon}
        {time === '—' ? '—' : time}
      </span>
    );
  }

  return (
    <section
      className="bg-white rounded-[28px] border border-[#ECECEC] p-6 sm:p-10 shadow-sm my-8"
      id="batch-schedule"
    >
      <h2
        className="font-sora text-[26px] sm:text-[34px] font-[800] text-[#111111] tracking-tight mb-6"
      >
        {/* Title comes from the caller's context; if empty, fall back to static */}
        Batch Schedule — Business Digital Marketing with AI (Online & Offline)
      </h2>

      {/* Desktop: table layout (sm+); Mobile: card grid below */}
      {typeof window !== 'undefined' && window.matchMedia('(min-width: 640px)').matches ? (
        /* === DESKTOP: Table layout === */
        <div className="overflow-x-auto min-w-[680px]">
          <table className="w-full caption-bottom">
            <colgroup>
              <col className="w-24" />
              <col className="w-48" />
              <col className="w-48" />
              <col className="w-48" />
            </colgroup>
            <thead>
              <tr className="bg-[#FAF8F5] text-[#666666] text-[13px] sm:text-[14px] font-semibold">
                <th className="p-4 sm:p-5">Month</th>
                <th className="p-4 sm:p-5">Morning Batch</th>
                <th className="p-4 sm:p-5">Afternoon Batch</th>
                <th className="p-4 sm:p-5">Evening Batch</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, mIdx) => {
                const modes = [row.morning.mode, row.afternoon.mode, row.evening.mode];
                const bg = monthBgClass(modes);
                return (
                  <tr key={mIdx} className={bg}>
                    <td className="p-4 sm:p-5 font-medium text-[#111111]">
                      {row.month}
                    </td>
                    <td className="p-4 sm:p-5">
                      {timeSlot(row.morning.time, row.morning.mode, modeIcon(row.morning.mode))}
                    </td>
                    <td className="p-4 sm:p-5">
                      {timeSlot(row.afternoon.time, row.afternoon.mode, modeIcon(row.afternoon.mode))}
                    </td>
                    <td className="p-4 sm:p-5">
                      {timeSlot(row.evening.time, row.evening.mode, modeIcon(row.evening.mode))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* === MOBILE: one card per month === */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row, mIdx) => {
            const modes = [row.morning.mode, row.afternoon.mode, row.evening.mode];
            const hasOnline = modes.includes('Online');
            const hasOffline = modes.includes('Offline');
            const bg = monthBgClass(modes);

            return (
              <div
                key={mIdx}
                className={`p-5 rounded-[20px] ${bg} border border-[#ECECEC] transition-colors hover:border-[#F15A29]`}
              >
                <h3
                  className="font-sora text-[15px] sm:text-[16px] font-[700] text-[#111111] mb-3"
                >
                  {row.month}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {modeIcon(row.morning.mode)}
                    <span className="font-inter text-[13px] text-[#666666]">
                      Morning:{' '}
                      {row.morning.time === '—' ? '—' : row.morning.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {modeIcon(row.afternoon.mode)}
                    <span className="font-inter text-[13px] text-[#666666]">
                      Afternoon:{' '}
                      {row.afternoon.time === '—' ? '—' : row.afternoon.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {modeIcon(row.evening.mode)}
                    <span className="font-inter text-[13px] text-[#666666]">
                      Evening:{' '}
                      {row.evening.time === '—' ? '—' : row.evening.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

/* --------------------------------------------------------------------------
 * Exported for ProgramV2Layout.tsx and OnlineProgrammePage.tsx use
 * -------------------------------------------------------------------------*/