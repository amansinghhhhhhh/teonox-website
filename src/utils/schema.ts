export const BASE_URL = 'https://teonox.com';

export const ORG = {
  '@type': 'Organization' as const,
  '@id': `${BASE_URL}/#organization`,
  name: 'TEONOX',
  url: `${BASE_URL}/`,
  logo: {
    '@type': 'ImageObject' as const,
    url: `${BASE_URL}/assets/teonox_logo_header-B9pBbkhl.svg`,
  },
  description: 'TEONOX is a Gen AI School of Marketing & Business in Pune offering practical AI, digital marketing, business and automation training.',
  email: 'info@teonox.com',
  telephone: '+91-989-000-4828',
  address: {
    '@type': 'PostalAddress' as const,
    streetAddress: 'Office No. 13, 4th Floor, Revolution Mall',
    addressLocality: 'Kothrud',
    addressRegion: 'Maharashtra',
    postalCode: '411038',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.instagram.com/teonoxofficial',
    'https://www.facebook.com/teonoxofficial',
    'https://www.youtube.com/@teonoxofficial',
    'https://www.linkedin.com/company/teonox',
  ],
};

export const WEBSITE = {
  '@type': 'WebSite' as const,
  '@id': `${BASE_URL}/#website`,
  url: `${BASE_URL}/`,
  name: 'TEONOX',
  publisher: { '@id': `${BASE_URL}/#organization` },
  inLanguage: 'en-IN',
};

export const COURSE_DEFAULTS = {
  educationalLevel: 'Professional',
  inLanguage: 'en-IN',
  courseMode: 'onsite',
  courseWorkload: 'P6M',
};

export function courseUrl(slug: string): string {
  return `${BASE_URL}/programs/${slug}/`;
}

export function pageUrl(path: string): string {
  return `${BASE_URL}${path}`;
}
