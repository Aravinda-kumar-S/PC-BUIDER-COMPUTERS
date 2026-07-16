import React from 'react';

const SectionHeading = ({ children, className = '', style = {}, containerClassName = '' }) => {
  return (
    <div className={`section-heading-container ${containerClassName}`.trim()}>
      <div className="section-heading-line" aria-hidden="true"></div>
      <h2 className={`section-title ${className}`.trim()} style={style}>{children}</h2>
    </div>
  );
};

export default SectionHeading;
