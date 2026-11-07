import React from 'react';
import { BATCH_SCHEDULE, includesBatchSchedule } from '../data/batchSchedule';

/**
 * Unified Batch Schedule section — one source of truth for both
 * the offline program page (ProgramV2Layout) and the online page
 * (OnlineProgrammePage via rawHtml split). Scoped Tailwind classes
 * ensure the UI is identical everywhere and never conflicts with
 * parent page styles. Zero icons — plain text times only.
 */

export function BatchScheduleSection({ rows, slug }: { rows: BatchRow[]; slug: string }) {
  const scheduleIncludes = includesBatchSchedule(slug);

  if (!scheduleIncludes) return null;

  /**
   * Render a single time slot string (e.g. "11:00 AM – 1:00 PM" or "—").
   * Clean, plain text — no icons, no badges, no extra markup.
   */
  function slotContent(time: string) {
    return time === '—' ? '—' : time;
  }

  return (
    <section className="space-y-6">
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
              <tr className="bg-slate-50/50">
                <th className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6 align-middle">
                  Month
                </th>
                <th className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6 align-middle">
                  Morning Batch
                </th>
                <th className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6 align-middle">
                  Afternoon Batch
                </th>
                <th className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6 align-middle">
                  Evening Batch
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, mIdx) => {
                return (
                  <tr key={mIdx} className="bg-white hover:bg-slate-50">
                    <td className="p-6 px-6 align-middle font-medium text-slate-900">
                      {row.month}
                    </td>
                    <td className="p-6 px-6 align-middle">
                      {slotContent(row.morning.time)}
                    </td>
                    <td className="p-6 px-6 align-middle">
                      {slotContent(row.afternoon.time)}
                    </td>
                    <td className="p-6 px-6 align-middle">
                      {slotContent(row.evening.time)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* === MOBILE: one card per month, structured vertical layout === */
        <div className="grid max-w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row, mIdx) => (
            <div
              key={mIdx}
              className="
                bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10
                transition-colors hover:border-slate-200/80
              "
            >
              <h3 className="font-sora text-[15px] sm:text-[16px] font-medium text-slate-700 mb-2 tracking-wider">
                {row.month}
              </h3>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Morning</span>
                  <span className="text-sm font-medium text-slate-900">{slotContent(row.morning.time)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Afternoon</span>
                  <span className="text-sm font-medium text-slate-900">{slotContent(row.afternoon.time)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Evening</span>
                  <span className="text-sm font-medium text-slate-900">{slotContent(row.evening.time)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* --------------------------------------------------------------------------
 * Exported for ProgramV2Layout.tsx and OnlineProgrammePage.tsx use
 * -------------------------------------------------------------------------*/
export { includesBatchSchedule };