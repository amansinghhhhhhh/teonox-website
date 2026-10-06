import React, { useEffect, useState } from 'react';
import { SEO } from '../../components/SEO';
import { initMetaPixel } from '../../utils/metaPixel';

export function CareerUnlockedThankYouPage() {
  const [seconds, setSeconds] = useState(6);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromTagMango = /tagmango|learn\.teonox\.com/i.test(document.referrer || '');
    const status = (params.get('status') || params.get('payment_status') || '').toLowerCase();
    const allowedFromParams = status === 'success' || status === 'paid' || status === 'registered';

    if (!fromTagMango && !allowedFromParams) {
      window.location.replace('/career-unlocked');
      return;
    }

    setAllowed(true);
    initMetaPixel();

    const countdown = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          window.clearInterval(countdown);
          window.location.replace('/career-unlocked');
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => window.clearInterval(countdown);
  }, []);

  if (!allowed) return null;

  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#1E1611] flex items-center justify-center px-4 py-24">
      <SEO
        title="Registration Successful | Career Unlocked"
        description="You have successfully registered for the Career Unlocked webinar."
        canonical="/career-unlocked/thank-you"
      />
      <div className="max-w-xl w-full text-center bg-white rounded-3xl border border-[#EADFD0] p-8 sm:p-12">
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1E1611]">
          Successfully Registered for the Webinar!
        </h1>
        <p className="mt-4 text-base text-[#6B5E53]">
          Returning to the main page in {seconds} seconds.
        </p>
        <div className="mt-8">
          <a
            href="/career-unlocked"
            className="inline-flex items-center justify-center rounded-2xl bg-[#FF6B1A] hover:bg-[#E24A0B] text-white font-bold min-h-[52px] px-6 py-3.5 transition-colors"
          >
            Return to Main Page
          </a>
        </div>
      </div>
    </div>
  );
}
