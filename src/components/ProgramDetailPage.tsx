import React, { useEffect, useState } from 'react';
import { ArrowLeft, WifiOff } from 'lucide-react';
import { Program } from '../types';
import { ProgramDetailData } from '../data/programDetails';
import { fetchLiveProgramDetail, stripV2Prefixes } from '../services/programService';
import { ProgramV2Layout } from './programV2/ProgramV2Layout';
import { SEO } from './SEO';

interface ProgramDetailPageProps {
  program?: Program | null;
  onBack: () => void;
  onEnquire: (programTitle: string) => void;
}

/**
 * Extract the program slug directly from the browser URL as the reliable
 * source of truth. This avoids the race condition where `program` prop is
 * null during navigation transitions and the old fallback
 * ('business-digital-marketing-ai') would override the real slug.
 */
function extractSlugFromUrl(): string {
  try {
    const segments = window.location.pathname.split('/').filter(Boolean);
    // URL pattern: /program/<slug> — slug is the last segment
    return segments.length >= 2 && segments[0] === 'program' ? segments[1] : '';
  } catch {
    return '';
  }
}

export function ProgramDetailPage({ program, onBack, onEnquire }: ProgramDetailPageProps) {
  // Priority: URL slug > program.id from props > empty (shows error state)
  const urlSlug = extractSlugFromUrl();
  const identifier = urlSlug || program?.id || '';

  // Live CMS program detail (overrides static fallback once fetched)
  const [liveDetail, setLiveDetail] = useState<ProgramDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Fetch the live CMS detail via dynamic API matching (ID or slug).
  // Falls back to static data if the CMS is unreachable. Sets notFound=true
  // when the CMS is online but the identifier doesn't match any published program.
  useEffect(() => {
    if (!identifier) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    let cancelled = false;
    const requestedId = identifier;
    setLoading(true);
    setLiveDetail(null);
    setNotFound(false);
    fetchLiveProgramDetail(requestedId).then(
      (res) => {
        if (cancelled) return;
        if (res.notFound) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        if (requestedId === identifier && res.detail?.programTitle) {
          setLiveDetail(res.detail);
        }
        setLoading(false);
      },
      () => {
        if (!cancelled) setLoading(false);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [identifier]);

  // Empty identifier means the URL was invalid — show error state immediately
  if (!identifier || notFound) {
    return (
      <div className="bg-[#FAFAFA] min-h-screen pt-20 sm:pt-24 pb-20 font-['Sora',sans-serif]">
        <div className="w-[88%] max-w-7xl mx-auto pt-16 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#FFF0EB] flex items-center justify-center">
            <WifiOff className="w-7 h-7 text-[#F15A29]" />
          </div>
          <h1 className="font-sora text-[24px] font-[800] text-[#111111]">
            {!identifier ? 'Invalid program URL' : 'Program not found'}
          </h1>
          <p className="font-inter text-[14.5px] text-[#555555] max-w-md mx-auto">
            {!identifier
              ? 'The URL does not contain a valid program identifier.'
              : <>The program <code className="text-[#111111] font-mono">{identifier}</code> does not exist or is no longer available.</>}
          </p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111111] hover:bg-[#F15A29] text-white font-sora font-[700] text-[13px] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Programs
          </button>
        </div>
      </div>
    );
  }

  // Prefer live WordPress CMS content, fall back to static data while loading/unreachable.
  const displayDetail = liveDetail ? stripV2Prefixes(liveDetail) : null;

  // Skeleton while resolving a slug that has no static fallback yet.
  if (loading && !displayDetail) {
    return (
      <div className="bg-[#FAFAFA] min-h-screen pt-20 sm:pt-24 pb-20 font-['Sora',sans-serif]">
        <div className="w-[88%] max-w-7xl mx-auto space-y-8 pt-2">
          <div className="h-10 w-40 rounded-full bg-[#F3EDE6] animate-pulse" />
          <div className="h-14 sm:h-20 w-3/4 max-w-3xl rounded-2xl bg-[#F3EDE6] animate-pulse" />
          <div className="h-4 w-full max-w-2xl rounded-full bg-[#F3EDE6] animate-pulse" />
          <div className="h-4 w-5/6 max-w-xl rounded-full bg-[#F3EDE6] animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-48 rounded-[28px] bg-[#F3EDE6] animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // No live content and no static fallback for this slug (CMS unreachable).
  if (!displayDetail) {
    return (
      <div className="bg-[#FAFAFA] min-h-screen pt-20 sm:pt-24 pb-20 font-['Sora',sans-serif]">
        <div className="w-[88%] max-w-7xl mx-auto pt-16 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#FFF0EB] flex items-center justify-center">
            <WifiOff className="w-7 h-7 text-[#F15A29]" />
          </div>
          <h1 className="font-sora text-[24px] font-[800] text-[#111111]">Program content unavailable</h1>
          <p className="font-inter text-[14.5px] text-[#555555] max-w-md mx-auto">
            We could not load content for <code className="text-[#111111] font-mono">{identifier}</code>. The CMS may be temporarily unreachable. Please try again later.
          </p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111111] hover:bg-[#F15A29] text-white font-sora font-[700] text-[13px] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Programs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] text-[#111111] min-h-screen pt-20 sm:pt-24 pb-0 font-['Sora',sans-serif] relative overflow-hidden" data-source={liveDetail ? 'cms' : 'static'}>
      <SEO
        title={displayDetail?.programTitle || program?.title || 'Program'}
        description={displayDetail?.heroIntro || `Explore ${program?.title || 'this program'} at TEONOX — Gen AI School of Marketing & Business in Pune.`}
        canonical={`/programs/${identifier}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: displayDetail?.programTitle || program?.title,
          description: displayDetail?.heroIntro,
          provider: { '@type': 'EducationalOrganization', name: 'TEONOX' },
        }}
      />
      <div className="w-[88%] max-w-7xl mx-auto relative z-10">
        <ProgramV2Layout detail={displayDetail} heroLoading={loading} onEnquire={(label) => onEnquire(label)} />
      </div>
    </div>
  );
}