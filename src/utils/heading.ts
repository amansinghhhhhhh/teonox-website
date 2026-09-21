export function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function injectHeadingIds(html: string): string {
  const headingRegex = /<h([23])[^>]*>(.*?)<\/h\1>/gi;
  const seen = new Set<string>();

  return html.replace(headingRegex, (match, level, content) => {
    const plainText = content.replace(/<[^>]*>/g, '');
    const baseId = slugifyHeading(plainText);
    let id = baseId;
    let counter = 1;
    while (seen.has(id)) {
      counter++;
      id = `${baseId}-${counter}`;
    }
    seen.add(id);

    if (match.includes(`id="${baseId}"`) || match.includes(`id='${baseId}'`)) {
      return match;
    }

    const openTagEnd = match.indexOf('>');
    const openTag = match.slice(0, openTagEnd + 1);
    const rest = match.slice(openTagEnd + 1);
    if (!openTag.includes('id=')) {
      return `${openTag.slice(0, -1)} id="${id}">${rest}`;
    }
    return match;
  });
}
