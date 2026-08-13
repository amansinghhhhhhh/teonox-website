/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEBHOOK_URL?: string;
  /** WordPress CMS origin (e.g. https://cms.teonox.com). Used by programService
   *  to build direct WP REST URLs when the same-origin Express proxy is absent. */
  readonly VITE_CMS_URL?: string;
  /** Force staging environment (shows staging-only programs). Set to 'true'
   *  when building the Hostinger staging deploy. */
  readonly VITE_IS_STAGING?: string;
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
