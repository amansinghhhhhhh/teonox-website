import React from 'react';
import { BATCH_SCHEDULE, includesBatchSchedule } from '../data/batchSchedule';

/**
 * Unified Batch Schedule section — one source of truth.
 * Fixes: row dividers, column alignment, column widths, empty cell styling,
 * pill consistency, row height, and mobile layout.
 * Zero icons — clean text and subtle badge pills only.
 */

export function BatchScheduleSection({ rows }: { rows: BatchRow[] }) {
  /** Render a single time slot — subtle pill for active times, muted centered text for empty slots. */
  function slotContent(time: string) {
    if (time === '—') return <span className="text-center text-slate-400 font-normal">—</span>;
    return (
      <span className="inline-block bg-slate-100 text-slate-800 rounded-xl text-sm font-medium px-3.5 py-1.5 border border-slate-200/80">
        {time}
      </span>
    );
  }

  // Determine layout based on viewport
  const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;

  if (isDesktop) {
    /** ==== DESKTOP: Fixed-width table in a card ==== */
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-lg p-6 sm:p-10 lg:p-12">
          <h2 className="font-sora text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
            Batch Schedule
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0 border border-slate-200 rounded-2xl overflow-hidden table-fixed">
              <colgroup>
                <col className="w-24 sm:w-32" />
                <col className="w-32 sm:w-40" />
                <col className="w-32 sm:w-40" />
                <col className="w-32 sm:w-40" />
              </colgroup>
              <thead>
                <tr className="bg-slate-50">
                  <th className="py-4 px-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Month</th>
                  <th className="py-4 px-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Morning Batch</th>
                  <th className="py-4 px-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Afternoon Batch</th>
                  <th className="py-4 px-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Evening Batch</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {rows.map((row, mIdx) => (
                  <tr key={mIdx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 px-4 text-center whitespace-nowrap text-sm font-bold text-slate-900"> {row.month}</td>
                    <td className="py-5 px-4 whitespace-nowrap text-center"> {slotContent(row.morning.time)}</td>
                    <td className="py-5 px-4 whitespace-nowrap text-center"> {slotContent(row.afternoon.time)}</td>
                    <td className="py-5 px-4 whitespace-nowrap text-center"> {slotContent(row.evening.time)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  } else {
    /** === MOBILE: Stack'd cards === */
    return (
      <section className="space-y-6 my-12 px-4">
        <h2 className="font-sora text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
          Batch Schedule
        </h2>
        {rows.map((row, mIdx) => (
          <div key={mIdx} className="bg-white rounded-[32px] border border-slate-200 shadow-lg p-6 sm:p-10">
            <h3 className="font-sora font-extrabold text-slate-900 text-2xl sm:text-3xl mb-4 tracking-tight">
              {row.month}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Morning</span>
                <span className="text-sm font-medium text-slate-900">{slotContent(row.morning.time)}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Afternoon</span>
                <span className="text-sm font-medium text-slate-900">{slotContent(row.afternoon.time)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Evening</span>
                <span className="text-sm font-medium text-slate-900">{slotContent(row.evening.time)}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }
}

/* --------------------------------------------------------------------------
 * Exported for ProgramV2Layout.tsx and OnlineBatchScheduleTable.tsx use
 * -------------------------------------------------------------------------*/
export { BATCH_SCHEDULE, includesBatchSchedule };