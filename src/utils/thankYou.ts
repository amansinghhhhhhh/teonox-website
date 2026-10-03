export function redirectToThankYou(formType: string, sectionId: string = ''): void {
  const params = new URLSearchParams();
  params.set('source', window.location.pathname);
  params.set('form', formType);
  if (sectionId) params.set('section', sectionId);
  window.location.assign(`/thank-you?${params.toString()}`);
}
