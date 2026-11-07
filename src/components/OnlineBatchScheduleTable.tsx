import React from 'react';
import { BATCH_SCHEDULE } from '../data/batchSchedule';

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
      <span className="inline-block bg-slate-900 text-white px-3.5 py-1.5 rounded-xl text-sm font-medium shadow-sm">
        {time}
      </span>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="bg-white rounded-3xl border border-slate-300 shadow-xl p-8">
        <h2 className="font-sora text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
          Batch Schedule
        </h2>

        <table className="w-full border border-slate-200 divide-y divide-slate-200">
          <colgroup>
            <col className="w-24" />
            <col className="w-48" />
            <col className="w-48" />
            <col className="w-48" />
          </colgroup>
          <thead>
            <tr className="bg-slate-100">
              <th className="text-xs font-bold text-slate-500 uppercase tracking-wider p-4 text-left">
                Month
              </th>
              <th className="text-xs font-bold text-slate-500 uppercase tracking-wider p-4">
                Morning Batch
              </th>
              <th className="text-xs font-bold text-slate-500 uppercase tracking-wider p-4">
                Afternoon Batch
              </th>
              <th className="text-xs font-bold text-slate-500 uppercase tracking-wider p-4">
                Evening Batch
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, mIdx) => (
              <tr className="border-r border-slate-100">
                <td className="p-4 font-medium text-slate-900">
                  {row.month}
                </td>
                <td className="p-4">
                  {slotContent(row.morning.time)}
                </td>
                <td className="p-4">
                  {slotContent(row.afternoon.time)}
                </td>
                <td className="p-4">
                  {slotContent(row.evening.time)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
 * Exported data for online page use
 * -------------------------------------------------------------------------*/
export { BATCH_SCHEDULE };