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
    /** ==== DESKTOP: Fixed-width table ==== */
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <h2 className="font-sora text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
          Batch Schedule
        </h2>
        <table className="table-fixed w-full divide-y divide-slate-200">
          <colgroup>
            <col className="w-24" />
            <col className="w-20" />
            <col className="w-20" />
            <col className="w-20" />
          </colgroup>
          <thead>
            <tr className="bg-slate-100">
              <th className="text-xs font-bold text-slate-500 uppercase tracking-wider p-4 text-center">Month</th>
              <th className="text-xs font-bold text-slate-500 uppercase tracking-wider py-4 px-6 text-center">Morning Batch</th>
              <th className="text-xs font-bold text-slate-500 uppercase tracking-wider py-4 px-6 text-center">Afternoon Batch</th>
              <th className="text-xs font-bold text-slate-500 uppercase tracking-wider py-4 px-6 text-center">Evening Batch</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, mIdx) => (
              <tr key={mIdx} className="border-b border-slate-200/50 hover:bg-slate-50/50">
                <td className="p-4 align-middle text-center font-medium text-slate-900"> {row.month}</td>
                <td className="p-4 align-middle text-center"> {slotContent(row.morning.time)}</td>
                <td className="p-4 align-middle text-center"> {slotContent(row.afternoon.time)}</td>
                <td className="p-4 align-middle text-center"> {slotContent(row.evening.time)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  } else {
    /** === MOBILE: Stack'd cards (simplest approach) === */
    return (
      <section className="space-y-6">
        <h2 className="font-sora text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
          Batch Schedule
        </h2>
        {rows.map((row, mIdx) => (
          <div key={mIdx} className="bg-white rounded-3xl border border-slate-300 shadow-xl p-6 sm:p-10">
            <h3 className="font-sora font-extrabold text-slate-900 text-2xl sm:text-3xl mb-2 tracking-tight">
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
      </section>
    );
  }
}

/* --------------------------------------------------------------------------
 * Exported for ProgramV2Layout.tsx and OnlineBatchScheduleTable.tsx use
 * -------------------------------------------------------------------------*/
export { BATCH_SCHEDULE, includesBatchSchedule };