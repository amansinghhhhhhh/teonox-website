import React, { useEffect, useMemo, useState } from 'react';

const FALLBACK = '/';

function getParams(): { source: string; form: string; section: string } {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('source') || '',
    form: params.get('form') || '',
    section: params.get('section') || '',
  };
}

function safeSource(source: string): string {
  if (source && source.startsWith('/') && !source.startsWith('//')) return source;
  return FALLBACK;
}

export function ThankYouPage() {
  const [seconds, setSeconds] = useState(5);
  const params = useMemo(getParams, []);
  const backTo = safeSource(params.source);

  useEffect(() => {
    const redirect = window.setTimeout(() => {
      window.location.replace(backTo);
    }, 5000);
    const tick = window.setInterval(() => {
      setSeconds((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => {
      window.clearTimeout(redirect);
      window.clearInterval(tick);
    };
  }, [backTo]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4 py-24 font-['Sora',sans-serif]">
      <div className="max-w-lg w-full text-center bg-white rounded-3xl border border-[#EFEFEF] shadow-xl p-10">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 text-3xl font-bold">
          ✓
        </div>
        <h1 className="mt-6 text-2xl sm:text-3xl font-[800] text-[#111111]">Thank You!</h1>
        <p className="mt-3 text-[15px] text-[#666666] leading-relaxed">
          Your submission{params.form ? ` for ${params.form}` : ''} was received successfully.
        </p>
        <p className="mt-2 text-[13px] text-[#999999]">
          You will be redirected back in {seconds} second{seconds === 1 ? '' : 's'}.
        </p>
        {params.source && (
          <p className="mt-1 text-[12px] text-[#BBBBBB] break-all">Source: {params.source}</p>
        )}
        <a
          href={backTo}
          className="inline-flex mt-8 items-center justify-center rounded-full bg-[#F15A29] hover:bg-[#D8420F] text-white px-8 py-3.5 text-[14px] font-[700] transition-colors"
        >
          Back to Website
        </a>
      </div>
    </div>
  );
}
