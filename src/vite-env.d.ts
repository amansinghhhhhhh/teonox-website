/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEBHOOK_URL?: string;
  /** WordPress CMS origin (e.g. https://cms.teonox.com). Used by programService
   *  to build direct WP REST URLs when the same-origin Express proxy is absent. */
  readonly VITE_CMS_URL?: string;
  /** Force staging environment (shows staging-only programs). Set to 'true'
   *  when building the Hostinger staging deploy. */
  readonly VITE_IS_STAGING?: string;
  /** Absolute URL or path to the TEONOX program brochure PDF. When unset the
   *  brochure modal falls back to /brochure/teonox-brochure.pdf. */
  readonly VITE_BROCHURE_URL?: string;
  /** YouTube Data API v3 key (HTTP-referrer restricted). Used by youtubeService
   *  to pull the latest @teonoxofficial Shorts into MomentsSection. When unset
   *  the section falls back to its built-in static video cards. */
  readonly VITE_YT_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}
