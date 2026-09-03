import { Helmet } from 'react-helmet-async';
import { ORG, COURSE_DEFAULTS, courseUrl, BASE_URL } from '../../utils/schema';

interface CourseSchemaProps {
  name: string;
  description: string;
  slug: string;
  courseWorkload?: string;
}

export function CourseSchema({ name, description, slug, courseWorkload }: CourseSchemaProps) {
  const url = courseUrl(slug);
  const courseId = `${url}#course`;
  const instanceId = `${url}#course-instance`;
  const webpageId = `${url}#webpage`;
  const breadcrumbId = `${url}#breadcrumb`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': courseId,
        name,
        description,
        url,
        provider: {
          '@type': 'Organization',
          '@id': ORG['@id'],
          name: ORG.name,
          url: ORG.url,
        },
        educationalLevel: COURSE_DEFAULTS.educationalLevel,
        inLanguage: COURSE_DEFAULTS.inLanguage,
        hasCourseInstance: { '@id': instanceId },
      },
      {
        '@type': 'CourseInstance',
        '@id': instanceId,
        courseMode: COURSE_DEFAULTS.courseMode,
        courseWorkload: courseWorkload || COURSE_DEFAULTS.courseWorkload,
        inLanguage: COURSE_DEFAULTS.inLanguage,
      },
      {
        '@type': 'WebPage',
        '@id': webpageId,
        url,
        name: `${name} | TEONOX`,
        isPartOf: { '@id': `${BASE_URL}/#website` },
        mainEntity: { '@id': courseId },
        breadcrumb: { '@id': breadcrumbId },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Programs', item: `${BASE_URL}/programs/` },
          { '@type': 'ListItem', position: 3, name, item: url },
        ],
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
