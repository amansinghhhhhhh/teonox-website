import React from 'react';
import { rawHtmlBody } from './rawHtml';
import '../../pages/programmes/online-programme.css';

export function OnlineProgrammePage() {
  return (
    <div className="tl-landing-page">
      <div dangerouslySetInnerHTML={{ __html: rawHtmlBody }} />
    </div>
  );
}
