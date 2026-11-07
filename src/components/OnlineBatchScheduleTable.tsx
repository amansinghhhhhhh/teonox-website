import React from 'react';
import { BATCH_SCHEDULE, BatchRow } from '../data/batchSchedule';

/**
 * Online Batch Schedule Table — dedicated component for the React online program page.
 * Shares the exact same schedule data as the offline component but with its own
 * card wrapper and table styling so it never breaks or collides with parent page styles.
 * Zero icons — clean text and subtle badge pills only.
 */

export function OnlineBatchScheduleTable({ rows }: { rows: BatchRow[] }) {
  /** Render a single time slot — subtle solid pill for active times,
   * muted text for empty slots.
   */
  function slotContent(time: string) {
    if (time === '—') return <span className="text-slate-400 font-normal">—</span>;
    return (
      <span className="inline-block bg-slate-100 text-slate-800 px-3.5 py-1.5 rounded-xl text-sm font-medium border border-slate-200/80">
        {time}
      </span>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-lg p-6 sm:p-10 lg:p-12">
        <h2 className="font-sora text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
          Batch Schedule
        </h2>

        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-6 sm:px-0">
            <table className="min-w-full border-separate border-spacing-0 border border-slate-200 rounded-2xl overflow-hidden table-fixed">
              <colgroup>
                <col className="w-24 sm:w-32" />
                <col className="w-32 sm:w-40" />
                <col className="w-32 sm:w-40" />
                <col className="w-32 sm:w-40" />
              </colgroup>
              <thead>
                <tr className="bg-slate-50">
                  <th className="py-4 px-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    Month
                  </th>
                  <th className="py-4 px-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    Morning Batch
                  </th>
                  <th className="py-4 px-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    Afternoon Batch
                  </th>
                  <th className="py-4 px-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    Evening Batch
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {rows.map((row, mIdx) => (
                  <tr key={mIdx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 px-4 text-center whitespace-nowrap text-sm font-bold text-slate-900">
                      {row.month}
                    </td>
                    <td className="py-5 px-4 whitespace-nowrap text-center">
                      {slotContent(row.morning.time)}
                    </td>
                    <td className="py-5 px-4 whitespace-nowrap text-center">
                      {slotContent(row.afternoon.time)}
                    </td>
                    <td className="py-5 px-4 whitespace-nowrap text-center">
                      {slotContent(row.evening.time)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
 * Exported data for online page use
 * -------------------------------------------------------------------------*/
export { BATCH_SCHEDULE };