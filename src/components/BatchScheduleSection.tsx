import React from 'react';
import { Sun, Moon, Wifi, Building } from 'lucide-react';
import { BATCH_SCHEDULE, includesBatchSchedule } from '../data/batchSchedule';

/**
 * Unified Batch Schedule section — one source of truth for both
 * the offline program page (ProgramV2Layout) and the online page
 * (OnlineProgrammePage via rawHtml split). Scoped Tailwind classes
 * ensure the UI is identical everywhere and never conflicts with
 * parent page styles.
 */

export function BatchScheduleSection({ rows, slug }: { rows: BatchRow[]; slug: string }) {
  const scheduleIncludes = includesBatchSchedule(slug);

  if (!scheduleIncludes) return null;

  /**
   * Mode badge: returns a string of Tailwind classes for the pill.
   * Offline = solid dark, Online = soft orange with border, Empty = transparent.
   */
  function badgeClass(mode: SessionMode | null): string {
    if (!mode) return 'bg-transparent text-slate-400';
    if (mode === 'Online') return 'bg-orange-50 text-orange-600 border border-orange-200 rounded-full';
    return 'bg-slate-900 text-white';
  }

  /**
   * Mode icon: returns the appropriate Lucide icon + Tailwind classes.
   * Offline = Building, Online = Sun, Empty = nothing.
   */
  function modeIcon(mode: SessionMode | null) {
    if (!mode) return null;
    if (mode === 'Online') return <Sun className="size-4 text-orange-500" />;
    return <Building className="size-4 text-white" />;
  }

  /**
   * Render a single slot (time + icon + badge) within a table cell.
   * The structure is: flex column → icon on top → time below, so they
   * never collapse into vertical lines and always have proper vertical centering.
   */
  function slotContent(
    time: string,
    mode: SessionMode | null,
    icon: React.ReactNode | null,
  ) {
    return (
      <div className="flex flex-col items-center gap-1 py-1">
        {icon}
        <span className="text-xs font-medium leading-none capitalize">
          {time === '—' ? '—' : time}
        </span>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <h2 className="font-sora text-[26px] sm:text-[34px] font-[800] text-slate-800 tracking-tight">
        Batch Schedule
      </h2>

      {/* Desktop: responsive table (sm+) */}
      {typeof window !== 'undefined' && window.matchMedia('(min-width: 640px)').matches ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <colgroup>
              <col className="w-24" />
              <col className="w-48" />
              <col className="w-48" />
              <col className="w-48" />
            </colgroup>
            <thead>
              <tr className="bg-slate-50">
                <th className="text-slate-700 font-medium uppercase text-sm py-3 px-4 align-middle">
                  Month
                </th>
                <th className="text-slate-700 font-medium uppercase text-sm py-3 px-4 align-middle">
                  Morning Batch
                </th>
                <th className="text-slate-700 font-medium uppercase text-sm py-3 px-4 align-middle">
                  Afternoon Batch
                </th>
                <th className="text-slate-700 font-medium uppercase text-sm py-3 px-4 align-middle">
                  Evening Batch
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, mIdx) => {
                const modes = [row.morning.mode, row.afternoon.mode, row.evening.mode];
                const hasOnline = modes.includes('Online');
                const hasOffline = modes.includes('Offline');

                // Determine the background variant for this row
                let rowBg: string;
                if (hasOnline && hasOffline) rowBg = 'bg-white';
                else if (hasOnline) rowBg = 'bg-orange-50';
                else if (hasOffline) rowBg = 'bg-slate-900';
                else rowBg = 'bg-white';

                return (
                  <tr key={mIdx} className={rowBg}>
                    <td className="p-4 align-middle font-medium text-slate-700">
                      {row.month}
                    </td>
                    <td className="p-4 align-middle">
                      {slotContent(row.morning.time, row.morning.mode, modeIcon(row.morning.mode))}
                    </td>
                    <td className="p-4 align-middle">
                      {slotContent(row.afternoon.time, row.afternoon.mode, modeIcon(row.afternoon.mode))}
                    </td>
                    <td className="p-4 align-middle">
                      {slotContent(row.evening.time, row.evening.mode, modeIcon(row.evening.mode))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* === MOBILE: one card per month, no table === */
        <div className="grid max-w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row, mIdx) => {
            const modes = [row.morning.mode, row.afternoon.mode, row.evening.mode];
            const hasOnline = modes.includes('Online');
            const hasOffline = modes.includes('Offline');

            // Determine the card background variant
            let cardBg: string;
            if (hasOnline && hasOffline) cardBg = 'bg-white';
            else if (hasOnline) cardBg = 'bg-orange-50';
            else if (hasOffline) cardBg = 'bg-slate-900';
            else cardBg = 'bg-white';

            return (
              <div
                key={mIdx}
                className={`
                  bg-${cardBg} border border-slate-100/50 rounded-3xl p-6 transition-colors hover:border-slate-100/80
                `}
              >
                <h3
                  className="font-sora text-[15px] sm:text-[16px] font-[700] text-slate-700 mb-3 tracking-wider"
                >
                  {row.month}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {modeIcon(row.morning.mode)}
                    <span className="text-sm text-slate-500">
                      Morning:{' '}
                      {row.morning.time === '—' ? '—' : row.morning.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {modeIcon(row.afternoon.mode)}
                    <span className="text-sm text-slate-500">
                      Afternoon:{' '}
                      {row.afternoon.time === '—' ? '—' : row.afternoon.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {modeIcon(row.evening.mode)}
                    <span className="text-sm text-slate-500">
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
export { includesBatchSchedule };